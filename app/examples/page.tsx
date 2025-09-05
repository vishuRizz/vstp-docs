import React from "react";

export default function Examples() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Examples & Tutorials
        </h1>

        {/* Basic Chat Application */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Building a Chat Application
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              Let's build a simple chat application using VSTP's TCP transport.
            </p>

            <h3>Chat Server</h3>
            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`use vstp::{Frame, FrameType, VstpTcpServer};
use tokio::sync::broadcast;
use std::sync::Arc;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpTcpServer::bind("127.0.0.1:8080").await?;
    let (tx, _) = broadcast::channel(100);
    let tx = Arc::new(tx);
    
    println!("Chat server running on 127.0.0.1:8080");
    
    while let Ok((mut connection, addr)) = server.accept().await {
        let tx = tx.clone();
        let mut rx = tx.subscribe();
        
        tokio::spawn(async move {
            println!("New client connected: {}", addr);
            
            // Handle incoming messages
            loop {
                tokio::select! {
                    result = connection.read_frame() => {
                        match result {
                            Ok(frame) => {
                                if frame.frame_type() == FrameType::Data {
                                    // Broadcast message to all clients
                                    let _ = tx.send((addr, frame));
                                }
                            }
                            Err(_) => break
                        }
                    }
                    result = rx.recv() => {
                        match result {
                            Ok((sender_addr, frame)) => {
                                if sender_addr != addr {
                                    let _ = connection.send_frame(&frame).await;
                                }
                            }
                            Err(_) => break
                        }
                    }
                }
            }
            
            println!("Client disconnected: {}", addr);
        });
    }
    Ok(())
}`}</code>
            </pre>

            <h3>Chat Client</h3>
            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`use vstp::{Frame, FrameType, VstpTcpClient};
use tokio::io::{self, AsyncBufReadExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut client = VstpTcpClient::connect("127.0.0.1:8080").await?;
    
    // Split terminal input and message handling
    let (mut read_half, mut write_half) = client.split();
    
    // Handle incoming messages
    tokio::spawn(async move {
        while let Ok(frame) = read_half.read_frame().await {
            if frame.frame_type() == FrameType::Data {
                if let Ok(msg) = String::from_utf8(frame.payload().to_vec()) {
                    println!("Received: {}", msg);
                }
            }
        }
    });
    
    // Handle user input
    let mut stdin = io::BufReader::new(io::stdin()).lines();
    while let Some(Ok(line)) = stdin.next_line().await {
        let frame = Frame::new(FrameType::Data)
            .with_payload(line.as_bytes().to_vec());
        write_half.send_frame(&frame).await?;
    }
    
    Ok(())
}`}</code>
            </pre>
          </div>
        </section>

        {/* File Transfer Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Secure File Transfer
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              This example demonstrates how to implement secure file transfer
              using VSTP's TCP transport with TLS.
            </p>

            <h3>File Server</h3>
            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`use vstp::{Frame, FrameType, VstpTcpServer};
use tokio::fs::File;
use tokio::io::AsyncReadExt;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpTcpServer::bind("127.0.0.1:8080").await?;
    
    while let Ok((mut connection, addr)) = server.accept().await {
        tokio::spawn(async move {
            println!("Client connected: {}", addr);
            
            while let Ok(frame) = connection.read_frame().await {
                if frame.frame_type() == FrameType::Data {
                    // Get requested filename from headers
                    if let Some(filename) = frame.get_header("filename") {
                        match File::open(filename).await {
                            Ok(mut file) => {
                                let mut buffer = Vec::new();
                                if file.read_to_end(&mut buffer).await.is_ok() {
                                    let response = Frame::new(FrameType::Data)
                                        .with_header("filename", filename)
                                        .with_payload(buffer);
                                    let _ = connection.send_frame(&response).await;
                                }
                            }
                            Err(e) => {
                                let error = Frame::new(FrameType::Error)
                                    .with_payload(e.to_string().as_bytes().to_vec());
                                let _ = connection.send_frame(&error).await;
                            }
                        }
                    }
                }
            }
        });
    }
    Ok(())
}`}</code>
            </pre>

            <h3>File Client</h3>
            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`use vstp::{Frame, FrameType, VstpTcpClient};
use tokio::fs::File;
use tokio::io::AsyncWriteExt;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut client = VstpTcpClient::connect("127.0.0.1:8080").await?;
    
    // Request a file
    let request = Frame::new(FrameType::Data)
        .with_header("filename", "example.txt");
    client.send_frame(&request).await?;
    
    // Receive and save the file
    if let Ok(frame) = client.read_frame().await {
        match frame.frame_type() {
            FrameType::Data => {
                if let Some(filename) = frame.get_header("filename") {
                    let mut file = File::create(format!("downloaded_{}", filename)).await?;
                    file.write_all(frame.payload()).await?;
                    println!("File downloaded successfully!");
                }
            }
            FrameType::Error => {
                if let Ok(error) = String::from_utf8(frame.payload().to_vec()) {
                    println!("Error: {}", error);
                }
            }
            _ => println!("Unexpected frame type")
        }
    }
    
    Ok(())
}`}</code>
            </pre>
          </div>
        </section>

        {/* Real-time Data Streaming */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Real-time Data Streaming
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              This example shows how to use VSTP's UDP transport for real-time
              data streaming with automatic packet reassembly.
            </p>

            <h3>Data Producer</h3>
            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`use vstp::{Frame, FrameType, Flags, VstpUdpClient};
use tokio::time::{interval, Duration};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = VstpUdpClient::bind("0.0.0.0:0").await?;
    let mut interval = interval(Duration::from_millis(100));
    
    let mut sequence = 0u32;
    loop {
        interval.tick().await;
        
        // Create sample data
        let data = format!("Sensor reading #{}: {}", sequence, rand::random::<f64>());
        
        let frame = Frame::new(FrameType::Data)
            .with_header("sequence", &sequence.to_string())
            .with_header("timestamp", &chrono::Utc::now().timestamp().to_string())
            .with_payload(data.as_bytes().to_vec())
            .with_flag(Flags::REQ_ACK);
            
        client.send_frame(&frame, "127.0.0.1:8080").await?;
        sequence += 1;
    }
}`}</code>
            </pre>

            <h3>Data Consumer</h3>
            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`use vstp::{Frame, FrameType, VstpUdpServer};
use std::collections::HashMap;
use tokio::time::{Duration, Instant};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpUdpServer::bind("127.0.0.1:8080").await?;
    let mut last_sequences = HashMap::new();
    
    while let Ok((frame, addr)) = server.recv_frame().await {
        if frame.frame_type() == FrameType::Data {
            // Track sequence numbers per client
            if let Some(seq) = frame.get_header("sequence") {
                if let Ok(sequence) = seq.parse::<u32>() {
                    let entry = last_sequences.entry(addr).or_insert((sequence, Instant::now()));
                    
                    if sequence > entry.0 {
                        // Process new data
                        if let Ok(data) = String::from_utf8(frame.payload().to_vec()) {
                            println!("From {}: {}", addr, data);
                            
                            // Send acknowledgment
                            let ack = Frame::new(FrameType::Ack)
                                .with_header("sequence", &sequence.to_string());
                            server.send_frame(&ack, addr).await?;
                        }
                        
                        entry.0 = sequence;
                        entry.1 = Instant::now();
                    }
                }
            }
        }
        
        // Clean up inactive clients
        last_sequences.retain(|_, (_, last_seen)| {
            last_seen.elapsed() < Duration::from_secs(10)
        });
    }
    Ok(())
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
