import React from "react";
import Link from "next/link";

export default function GettingStarted() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Getting Started
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#installation"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Installation
                  </a>
                </li>
                <li>
                  <a
                    href="#first-frame"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Your First Frame
                  </a>
                </li>
                <li>
                  <a
                    href="#tcp-example"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    TCP Example
                  </a>
                </li>
                <li>
                  <a
                    href="#udp-example"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    UDP Example
                  </a>
                </li>
                <li>
                  <a
                    href="#next-steps"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Next Steps
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Getting Started with VSTP
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                This guide will help you get up and running with VSTP quickly.
                We'll cover installation, basic usage, and your first working
                examples.
              </p>

              <section id="installation">
                <h2>Installation</h2>
                <p>
                  VSTP is a Rust library that you can add to your project using
                  Cargo. Add the following to your <code>Cargo.toml</code>:
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`[dependencies]
vstp = "0.1.0"
tokio = { version = "1.0", features = ["full"] }
bytes = "1.0"`}</code>
                </pre>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
                  <h4 className="text-blue-900 dark:text-blue-100 font-semibold mb-2">
                    💡 Note
                  </h4>
                  <p className="text-blue-700 dark:text-blue-200">
                    VSTP is built on top of Tokio for async I/O operations. Make
                    sure you have the <code>tokio</code> runtime available in
                    your project.
                  </p>
                </div>
              </section>

              <section id="first-frame">
                <h2>Your First Frame</h2>
                <p>
                  Let's start by creating and working with VSTP frames. A frame
                  is the basic unit of communication in VSTP.
                </p>

                <h3>Creating a Simple Frame</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::{Frame, FrameType, Flags};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create a new data frame
    let frame = Frame::new(FrameType::Data)
        .with_header("content-type", "text/plain")
        .with_header("user-id", "12345")
        .with_payload(b"Hello, VSTP!".to_vec())
        .with_flag(Flags::REQ_ACK);

    println!("Created frame: {:?}", frame);
    Ok(())
}`}</code>
                </pre>

                <h3>Encoding and Decoding</h3>
                <p>
                  Frames can be encoded to bytes for transmission and decoded
                  back to frames:
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::{Frame, FrameType, frame};
use bytes::BytesMut;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create a frame
    let original_frame = Frame::new(FrameType::Data)
        .with_payload(b"Hello, World!".to_vec());

    // Encode to bytes
    let encoded = frame::encode_frame(&original_frame)?;
    println!("Encoded {} bytes", encoded.len());

    // Decode back to frame
    let mut buf = BytesMut::from(&encoded[..]);
    let decoded_frame = frame::try_decode_frame(&mut buf, 1024)?.unwrap();

    // Verify they're the same
    assert_eq!(original_frame, decoded_frame);
    println!("Frame round-trip successful!");
    
    Ok(())
}`}</code>
                </pre>
              </section>

              <section id="tcp-example">
                <h2>TCP Example: Echo Server</h2>
                <p>
                  Let's build a simple echo server that receives messages and
                  sends them back. This demonstrates the basic TCP client-server
                  pattern with VSTP.
                </p>

                <h3>TCP Server</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::{Frame, FrameType, VstpTcpServer};
use tokio;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Bind to localhost:8080
    let server = VstpTcpServer::bind("127.0.0.1:8080").await?;
    println!("Echo server listening on 127.0.0.1:8080");

    while let Ok((mut connection, addr)) = server.accept().await {
        println!("New client connected: {}", addr);
        
        // Handle each connection in a separate task
        tokio::spawn(async move {
            while let Ok(frame) = connection.read_frame().await {
                match frame.frame_type() {
                    FrameType::Data => {
                        println!("Echoing: {:?}", frame);
                        // Echo the frame back to the client
                        if let Err(e) = connection.send_frame(&frame).await {
                            println!("Error sending frame: {}", e);
                            break;
                        }
                    }
                    FrameType::Bye => {
                        println!("Client {} said goodbye", addr);
                        break;
                    }
                    _ => {
                        println!("Received frame type: {:?}", frame.frame_type());
                    }
                }
            }
            println!("Client {} disconnected", addr);
        });
    }
    
    Ok(())
}`}</code>
                </pre>

                <h3>TCP Client</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::{Frame, FrameType, VstpTcpClient};
use tokio::io::{self, AsyncBufReadExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Connect to the server
    let mut client = VstpTcpClient::connect("127.0.0.1:8080").await?;
    println!("Connected to echo server");

    // Send a test message
    let test_frame = Frame::new(FrameType::Data)
        .with_header("content-type", "text/plain")
        .with_payload(b"Hello from client!".to_vec());
    
    client.send_frame(&test_frame).await?;
    println!("Sent: {:?}", test_frame);

    // Read the echo response
    let response = client.read_frame().await?;
    println!("Received echo: {:?}", response);

    // Send goodbye
    let bye_frame = Frame::new(FrameType::Bye);
    client.send_frame(&bye_frame).await?;
    println!("Sent goodbye");

    Ok(())
}`}</code>
                </pre>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
                  <h4 className="text-green-900 dark:text-green-100 font-semibold mb-2">
                    🚀 Try It Out
                  </h4>
                  <p className="text-green-700 dark:text-green-200">
                    Save the server code as <code>echo_server.rs</code> and the
                    client code as <code>echo_client.rs</code>. Run the server
                    first, then the client to see the echo in action!
                  </p>
                </div>
              </section>

              <section id="udp-example">
                <h2>UDP Example: Simple Message Exchange</h2>
                <p>
                  UDP provides a connectionless, fast transport option. Here's a
                  simple example of UDP communication with VSTP.
                </p>

                <h3>UDP Server</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::{Frame, FrameType, VstpUdpServer};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Bind to localhost:8080
    let server = VstpUdpServer::bind("127.0.0.1:8080").await?;
    println!("UDP server listening on 127.0.0.1:8080");

    while let Ok((frame, addr)) = server.recv_frame().await {
        println!("Received from {}: {:?}", addr, frame);
        
        // Send a response back
        let response = Frame::new(FrameType::Data)
            .with_header("response", "ack")
            .with_payload(b"Message received!".to_vec());
        
        server.send_frame(&response, addr).await?;
        println!("Sent response to {}", addr);
    }
    
    Ok(())
}`}</code>
                </pre>

                <h3>UDP Client</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::{Frame, FrameType, VstpUdpClient};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Bind to any available port
    let client = VstpUdpClient::bind("0.0.0.0:0").await?;
    println!("UDP client ready");

    // Send a message to the server
    let message = Frame::new(FrameType::Data)
        .with_header("client-id", "udp-client-1")
        .with_payload(b"Hello UDP server!".to_vec());
    
    client.send_frame(&message, "127.0.0.1:8080").await?;
    println!("Sent: {:?}", message);

    // Wait for response
    let (response, server_addr) = client.recv_frame().await?;
    println!("Received from {}: {:?}", server_addr, response);

    Ok(())
}`}</code>
                </pre>
              </section>

              <section id="next-steps">
                <h2>Next Steps</h2>
                <p>
                  Congratulations! You've successfully created your first VSTP
                  applications. Here's what you can explore next:
                </p>

                <ul>
                  <li>
                    <Link
                      href="/docs/protocol"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Protocol Specification
                    </Link>{" "}
                    - Learn about the wire format and protocol details
                  </li>
                  <li>
                    <Link
                      href="/docs/api"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      API Reference
                    </Link>{" "}
                    - Complete documentation of all VSTP APIs
                  </li>
                  <li>
                    <Link
                      href="/docs/tutorials"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Tutorials
                    </Link>{" "}
                    - Step-by-step guides for common use cases
                  </li>
                  <li>
                    <Link
                      href="/docs/examples"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Examples
                    </Link>{" "}
                    - More complex examples and real-world applications
                  </li>
                </ul>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-6">
                  <h4 className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">
                    💡 Pro Tip
                  </h4>
                  <p className="text-yellow-700 dark:text-yellow-200">
                    Start with the TCP examples for reliable communication, then
                    explore UDP for high-performance scenarios where some packet
                    loss is acceptable.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
