import React from "react";
import Link from "next/link";

export default function MigrationGuide() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Migration Guide
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#overview"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#breaking-changes"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Breaking Changes
                  </a>
                </li>
                <li>
                  <a
                    href="#new-features"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    New Features
                  </a>
                </li>
                <li>
                  <a
                    href="#migration-steps"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Migration Steps
                  </a>
                </li>
                <li>
                  <a
                    href="#examples"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#troubleshooting"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Troubleshooting
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Migration Guide: v0.1 → v0.2
              </h1>
              <div className="flex space-x-2">
                <span className="px-3 py-1 text-sm font-medium text-red-800 bg-red-100 dark:text-red-100 dark:bg-red-800 rounded-full">
                  v0.1
                </span>
                <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 dark:text-green-100 dark:bg-green-800 rounded-full">
                  v0.2
                </span>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <section id="overview">
                <h2>Migration Overview</h2>
                <p>
                  VSTP v0.2 introduces a new simplified API that makes it much
                  easier to build networked applications. This guide will help
                  you migrate your existing v0.1 code to take advantage of the
                  new features.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-6">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                    🎯 Migration Benefits
                  </h3>
                  <ul className="text-blue-700 dark:text-blue-200 space-y-2">
                    <li>
                      • <strong>Simplified API:</strong> Less boilerplate code
                    </li>
                    <li>
                      • <strong>Automatic Serialization:</strong> No manual
                      frame handling
                    </li>
                    <li>
                      • <strong>Better Error Handling:</strong> More descriptive
                      error messages
                    </li>
                    <li>
                      • <strong>Unified Interface:</strong> Same API for TCP and
                      UDP
                    </li>
                    <li>
                      • <strong>Built-in Timeouts:</strong> Automatic timeout
                      handling
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-6">
                  <h4 className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">
                    ⚠️ Important Notes
                  </h4>
                  <ul className="text-yellow-700 dark:text-yellow-200 list-disc list-inside">
                    <li>v0.2 is not backward compatible with v0.1</li>
                    <li>
                      The low-level API is still available for advanced use
                      cases
                    </li>
                    <li>All existing functionality is preserved</li>
                    <li>
                      Migration should be straightforward for most applications
                    </li>
                  </ul>
                </div>
              </section>

              <section id="breaking-changes">
                <h2>Breaking Changes</h2>
                <p>
                  Here are the main breaking changes you need to be aware of
                  when migrating from v0.1 to v0.2:
                </p>

                <h3>1. New Simplified API</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="text-red-900 dark:text-red-100 font-semibold mb-2">
                      v0.1 (Old)
                    </h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`// Manual frame creation
let frame = Frame::new(FrameType::Data)
    .with_payload(data);

// Manual serialization
let payload = serde_json::to_vec(&message)?;
frame.set_payload(payload);

// Manual client management
let client = VstpTcpClient::connect("127.0.0.1:8080").await?;
client.send(frame).await?;
let response = client.recv().await?;`}</code>
                    </pre>
                  </div>

                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="text-green-900 dark:text-green-100 font-semibold mb-2">
                      v0.2 (New)
                    </h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`// Automatic serialization
let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
client.send(message).await?;
let response: MyMessage = client.receive().await?;`}</code>
                    </pre>
                  </div>
                </div>

                <h3>2. Error Type Changes</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// v0.1
VstpError::Timeout("ACK timeout".to_string())

// v0.2
VstpError::Timeout`}</code>
                </pre>

                <h3>3. Method Name Changes</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 dark:border-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          v0.1
                        </th>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          v0.2
                        </th>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-2 font-mono">client.send()</td>
                        <td className="px-4 py-2 font-mono">
                          client.send_frame()
                        </td>
                        <td className="px-4 py-2">Low-level API only</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">client.recv()</td>
                        <td className="px-4 py-2 font-mono">
                          client.read_frame()
                        </td>
                        <td className="px-4 py-2">Low-level API only</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">server.accept()</td>
                        <td className="px-4 py-2 font-mono">server.run()</td>
                        <td className="px-4 py-2">
                          New handler-based approach
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="new-features">
                <h2>New Features in v0.2</h2>
                <p>
                  v0.2 introduces several new features that make VSTP easier to
                  use:
                </p>

                <h3>1. Simplified Client API</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// New easy-to-use client
use vstp::easy::VstpClient;

// TCP client
let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;

// UDP client
let client = VstpClient::connect_udp("127.0.0.1:8080").await?;

// Send any serializable type
client.send(MyMessage { data: "hello" }).await?;

// Receive with automatic deserialization
let response: MyMessage = client.receive().await?;`}</code>
                </pre>

                <h3>2. Simplified Server API</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// New handler-based server
use vstp::easy::VstpServer;

let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;

server.serve(|msg: MyMessage| async move {
    println!("Received: {:?}", msg);
    Ok(msg) // Echo back
}).await?;`}</code>
                </pre>

                <h3>3. Automatic Timeout Handling</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Set custom timeout
let mut client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
client.set_timeout(Duration::from_secs(5));

// All operations now respect the timeout
client.send(message).await?; // Will timeout after 5 seconds`}</code>
                </pre>

                <h3>4. Improved Error Types</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// New error types
pub enum VstpError {
    // ... existing errors
    SerializationError(serde_json::Error),
    DeserializationError(serde_json::Error),
    InvalidAddress,
    UnexpectedFrameType,
}`}</code>
                </pre>
              </section>

              <section id="migration-steps">
                <h2>Step-by-Step Migration</h2>
                <p>
                  Follow these steps to migrate your application from v0.1 to
                  v0.2:
                </p>

                <h3>Step 1: Update Dependencies</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`# Cargo.toml
[dependencies]
vstp = "0.2.1"  # Update version
serde = { version = "1.0", features = ["derive"] }  # Add if not present`}</code>
                </pre>

                <h3>Step 2: Update Imports</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Old imports
use vstp::{VstpTcpClient, VstpTcpServer, Frame, FrameType};

// New imports
use vstp::easy::{VstpClient, VstpServer};
use serde::{Serialize, Deserialize};`}</code>
                </pre>

                <h3>Step 3: Update Message Types</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Add serialization derives
#[derive(Serialize, Deserialize)]
struct MyMessage {
    data: String,
    timestamp: u64,
}`}</code>
                </pre>

                <h3>Step 4: Update Client Code</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="text-red-900 dark:text-red-100 font-semibold mb-2">
                      Before (v0.1)
                    </h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`let client = VstpTcpClient::connect("127.0.0.1:8080").await?;

let payload = serde_json::to_vec(&message)?;
let frame = Frame::new(FrameType::Data)
    .with_payload(payload);

client.send(frame).await?;
let response_frame = client.recv().await?;
let response: MyMessage = serde_json::from_slice(
    response_frame.payload()
)?;`}</code>
                    </pre>
                  </div>

                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="text-green-900 dark:text-green-100 font-semibold mb-2">
                      After (v0.2)
                    </h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;

client.send(message).await?;
let response: MyMessage = client.receive().await?;`}</code>
                    </pre>
                  </div>
                </div>

                <h3>Step 5: Update Server Code</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="text-red-900 dark:text-red-100 font-semibold mb-2">
                      Before (v0.1)
                    </h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`let server = VstpTcpServer::bind("127.0.0.1:8080").await?;

loop {
    let mut client = server.accept().await?;
    
    tokio::spawn(async move {
        while let Ok(Some(frame)) = client.recv().await {
            let message: MyMessage = serde_json::from_slice(
                frame.payload()
            )?;
            
            let response = process_message(message).await?;
            let response_payload = serde_json::to_vec(&response)?;
            let response_frame = Frame::new(FrameType::Data)
                .with_payload(response_payload);
                
            client.send(response_frame).await?;
        }
    });
}`}</code>
                    </pre>
                  </div>

                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="text-green-900 dark:text-green-100 font-semibold mb-2">
                      After (v0.2)
                    </h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;

server.serve(|message: MyMessage| async move {
    let response = process_message(message).await?;
    Ok(response)
}).await?;`}</code>
                    </pre>
                  </div>
                </div>

                <h3>Step 6: Update Error Handling</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Update error handling
match client.receive::<MyMessage>().await {
    Ok(message) => {
        // Handle message
    }
    Err(VstpError::Timeout) => {
        // Handle timeout
    }
    Err(VstpError::SerializationError(e)) => {
        // Handle serialization error
    }
    Err(e) => {
        // Handle other errors
    }
}`}</code>
                </pre>
              </section>

              <section id="examples">
                <h2>Migration Examples</h2>
                <p>
                  Here are complete examples showing how to migrate common
                  patterns:
                </p>

                <h3>Echo Server Migration</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-4">v0.1 Echo Server</h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`use vstp::{VstpTcpServer, Frame, FrameType};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpTcpServer::bind("127.0.0.1:8080").await?;
    
    loop {
        let mut client = server.accept().await?;
        
        tokio::spawn(async move {
            while let Ok(Some(frame)) = client.recv().await {
                let response_frame = Frame::new(FrameType::Data)
                    .with_payload(frame.payload().to_vec());
                client.send(response_frame).await?;
            }
            Ok::<(), vstp::VstpError>(())
        });
    }
}`}</code>
                    </pre>
                  </div>

                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-4">v0.2 Echo Server</h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`use vstp::easy::VstpServer;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct EchoMessage {
    content: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;
    
    server.serve(|msg: EchoMessage| async move {
        println!("Echoing: {}", msg.content);
        Ok(msg)
    }).await?;

    Ok(())
}`}</code>
                    </pre>
                  </div>
                </div>

                <h3>Chat Application Migration</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-4">v0.1 Chat Client</h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`use vstp::{VstpTcpClient, Frame, FrameType};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct ChatMessage {
    from: String,
    content: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = VstpTcpClient::connect("127.0.0.1:8080").await?;
    
    let msg = ChatMessage {
        from: "Alice".to_string(),
        content: "Hello!".to_string(),
    };
    
    let payload = serde_json::to_vec(&msg)?;
    let frame = Frame::new(FrameType::Data).with_payload(payload);
    
    client.send(frame).await?;
    
    let response_frame = client.recv().await?
        .ok_or("Connection closed")?;
    let response: ChatMessage = serde_json::from_slice(
        response_frame.payload()
    )?;
    
    println!("Received: {}", response.content);
    Ok(())
}`}</code>
                    </pre>
                  </div>

                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-4">v0.2 Chat Client</h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`use vstp::easy::VstpClient;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct ChatMessage {
    from: String,
    content: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
    
    let msg = ChatMessage {
        from: "Alice".to_string(),
        content: "Hello!".to_string(),
    };
    
    client.send(msg.clone()).await?;
    let response: ChatMessage = client.receive().await?;
    
    println!("Received: {}", response.content);
    Ok(())
}`}</code>
                    </pre>
                  </div>
                </div>
              </section>

              <section id="troubleshooting">
                <h2>Troubleshooting Migration Issues</h2>
                <p>
                  Here are common issues you might encounter during migration
                  and how to resolve them:
                </p>

                <h3>Compilation Errors</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="text-red-900 dark:text-red-100 font-semibold mb-2">
                      Error: "cannot find function `connect` in `VstpTcpClient`"
                    </h4>
                    <p className="text-red-700 dark:text-red-200 mb-2">
                      <strong>Solution:</strong> Use the new simplified API:
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`// Old
let client = VstpTcpClient::connect("127.0.0.1:8080").await?;

// New
let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;`}</code>
                    </pre>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="text-red-900 dark:text-red-100 font-semibold mb-2">
                      Error: "the trait `Serialize` is not implemented"
                    </h4>
                    <p className="text-red-700 dark:text-red-200 mb-2">
                      <strong>Solution:</strong> Add serialization derives:
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct MyMessage {
    data: String,
}`}</code>
                    </pre>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="text-red-900 dark:text-red-100 font-semibold mb-2">
                      Error: "expected function, found `VstpError::Timeout`"
                    </h4>
                    <p className="text-red-700 dark:text-red-200 mb-2">
                      <strong>Solution:</strong> Update error handling:
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`// Old
VstpError::Timeout("ACK timeout".to_string())

// New
VstpError::Timeout`}</code>
                    </pre>
                  </div>
                </div>

                <h3>Runtime Issues</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">
                      Issue: Messages not being received
                    </h4>
                    <p className="text-yellow-700 dark:text-yellow-200">
                      <strong>Solution:</strong> Ensure your message types match
                      between client and server. The new API is more strict
                      about type matching.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">
                      Issue: Timeout errors
                    </h4>
                    <p className="text-yellow-700 dark:text-yellow-200">
                      <strong>Solution:</strong> The new API has a default
                      30-second timeout. Adjust it if needed:
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`let mut client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
client.set_timeout(Duration::from_secs(60));`}</code>
                    </pre>
                  </div>
                </div>
              </section>

              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
                <p className="mb-4">
                  If you encounter issues during migration, here are some
                  resources:
                </p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/docs/troubleshooting"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      → Troubleshooting Guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/api"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      → API Reference
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/examples"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      → Examples
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
