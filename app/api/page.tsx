import React from "react";

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          API Documentation
        </h1>

        {/* Frame API */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Frame API
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <h3>Creating Frames</h3>
            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`use vstp::{Frame, FrameType, Flags};

// Create a new frame
let frame = Frame::new(FrameType::Data)
    .with_header("content-type", "text/plain")
    .with_payload(b"Hello, World!".to_vec())
    .with_flag(Flags::REQ_ACK);`}</code>
            </pre>

            <h3>Frame Types</h3>
            <ul>
              <li>
                <code>FrameType::Hello</code> - Initial connection frame
              </li>
              <li>
                <code>FrameType::Welcome</code> - Server response to Hello
              </li>
              <li>
                <code>FrameType::Data</code> - Application data frame
              </li>
              <li>
                <code>FrameType::Ping</code> - Keepalive request
              </li>
              <li>
                <code>FrameType::Pong</code> - Keepalive response
              </li>
              <li>
                <code>FrameType::Bye</code> - Graceful connection close
              </li>
              <li>
                <code>FrameType::Ack</code> - Acknowledgment frame
              </li>
              <li>
                <code>FrameType::Error</code> - Error notification
              </li>
            </ul>

            <h3>Frame Flags</h3>
            <ul>
              <li>
                <code>Flags::REQ_ACK</code> - Request acknowledgment
              </li>
              <li>
                <code>Flags::CRC</code> - Enable CRC32 checksum
              </li>
              <li>
                <code>Flags::FRAG</code> - Frame is fragmented
              </li>
              <li>
                <code>Flags::COMP</code> - Payload is compressed
              </li>
            </ul>
          </div>
        </section>

        {/* TCP API */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            TCP API
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <h3>TCP Server</h3>
            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`use vstp::VstpTcpServer;
use tokio;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpTcpServer::bind("127.0.0.1:8080").await?;
    
    while let Ok((mut connection, addr)) = server.accept().await {
        tokio::spawn(async move {
            println!("New client connected: {}", addr);
            while let Ok(frame) = connection.read_frame().await {
                println!("Received frame: {:?}", frame);
            }
        });
    }
    Ok(())
}`}</code>
            </pre>

            <h3>TCP Client</h3>
            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`use vstp::VstpTcpClient;
use tokio;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut client = VstpTcpClient::connect("127.0.0.1:8080").await?;
    
    // Send a data frame
    let frame = Frame::new(FrameType::Data)
        .with_payload(b"Hello, Server!".to_vec());
    client.send_frame(&frame).await?;
    
    // Read response
    let response = client.read_frame().await?;
    println!("Server response: {:?}", response);
    
    Ok(())
}`}</code>
            </pre>
          </div>
        </section>

        {/* UDP API */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            UDP API
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <h3>UDP Server</h3>
            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`use vstp::VstpUdpServer;
use tokio;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpUdpServer::bind("127.0.0.1:8080").await?;
    
    while let Ok((frame, addr)) = server.recv_frame().await {
        println!("Received frame from {}: {:?}", addr, frame);
        server.send_frame(&frame, addr).await?;
    }
    Ok(())
}`}</code>
            </pre>

            <h3>UDP Client</h3>
            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`use vstp::VstpUdpClient;
use tokio;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = VstpUdpClient::bind("0.0.0.0:0").await?;
    
    // Send a data frame
    let frame = Frame::new(FrameType::Data)
        .with_payload(b"Hello, UDP Server!".to_vec());
    client.send_frame(&frame, "127.0.0.1:8080").await?;
    
    // Receive response
    let (response, _) = client.recv_frame().await?;
    println!("Server response: {:?}", response);
    
    Ok(())
}`}</code>
            </pre>
          </div>
        </section>

        {/* Error Handling */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Error Handling
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              VSTP provides a comprehensive error type <code>VstpError</code>{" "}
              that covers all possible error cases:
            </p>

            <pre className="bg-gray-900 p-4 rounded-lg">
              <code>{`// Error handling example
use vstp::VstpError;

fn handle_vstp_error(err: VstpError) {
    match err {
        VstpError::IoError(e) => println!("IO error: {}", e),
        VstpError::InvalidFrame => println!("Invalid frame format"),
        VstpError::InvalidMagic => println!("Invalid magic number"),
        VstpError::InvalidVersion => println!("Unsupported protocol version"),
        VstpError::PayloadTooLarge => println!("Payload exceeds max size"),
        VstpError::ChecksumMismatch => println!("CRC32 checksum verification failed"),
        _ => println!("Other error: {:?}", err),
    }
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
