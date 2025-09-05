import React from "react";
import Link from "next/link";

export default function Troubleshooting() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Troubleshooting
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#common-issues"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Common Issues
                  </a>
                </li>
                <li>
                  <a
                    href="#connection-problems"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Connection Problems
                  </a>
                </li>
                <li>
                  <a
                    href="#serialization-errors"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Serialization Errors
                  </a>
                </li>
                <li>
                  <a
                    href="#performance-issues"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Performance Issues
                  </a>
                </li>
                <li>
                  <a
                    href="#timeout-issues"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Timeout Issues
                  </a>
                </li>
                <li>
                  <a
                    href="#debugging-tips"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Debugging Tips
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Troubleshooting Guide
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                This guide helps you diagnose and fix common issues when using
                VSTP. Each section provides specific solutions for different
                types of problems.
              </p>

              <section id="common-issues">
                <h2>Common Issues</h2>
                <p>
                  Here are the most frequently encountered issues and their
                  solutions:
                </p>

                <div className="space-y-6">
                  <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">
                      ❌ "Connection refused" Error
                    </h3>
                    <p className="text-red-700 dark:text-red-200 mb-4">
                      <strong>Symptoms:</strong> Client cannot connect to server
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Possible Causes:</h4>
                      <ul className="list-disc list-inside text-red-700 dark:text-red-200">
                        <li>Server is not running</li>
                        <li>Wrong port number</li>
                        <li>Firewall blocking connection</li>
                        <li>Address format incorrect</li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold">Solutions:</h4>
                      <pre className="bg-gray-900 p-4 rounded-lg text-sm mt-2">
                        <code>{`// Check if server is running
netstat -an | grep 8080

// Verify address format
let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
// NOT: "localhost:8080" or "http://127.0.0.1:8080"

// Check firewall settings
sudo ufw status`}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
                      ⚠️ "Serialization error" Message
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-200 mb-4">
                      <strong>Symptoms:</strong> Messages fail to serialize or
                      deserialize
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Possible Causes:</h4>
                      <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-200">
                        <li>Missing Serialize/Deserialize derives</li>
                        <li>Type mismatch between client and server</li>
                        <li>Invalid JSON data</li>
                        <li>Circular references in data structures</li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold">Solutions:</h4>
                      <pre className="bg-gray-900 p-4 rounded-lg text-sm mt-2">
                        <code>{`// Add serialization derives
#[derive(Serialize, Deserialize)]
struct MyMessage {
    data: String,
}

// Ensure type consistency
// Client sends: MyMessage
// Server expects: MyMessage (same type)

// Validate JSON manually
let json = serde_json::to_string(&message)?;
println!("JSON: {}", json);`}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                      🔄 "Timeout" Error
                    </h3>
                    <p className="text-blue-700 dark:text-blue-200 mb-4">
                      <strong>Symptoms:</strong> Operations timeout before
                      completing
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Possible Causes:</h4>
                      <ul className="list-disc list-inside text-blue-700 dark:text-blue-200">
                        <li>Network latency</li>
                        <li>Server overload</li>
                        <li>Default timeout too short</li>
                        <li>Server not responding</li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold">Solutions:</h4>
                      <pre className="bg-gray-900 p-4 rounded-lg text-sm mt-2">
                        <code>{`// Increase timeout
let mut client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
client.set_timeout(Duration::from_secs(60));

// Check server performance
// Monitor CPU and memory usage
// Check network connectivity`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </section>

              <section id="connection-problems">
                <h2>Connection Problems</h2>
                <p>
                  Issues related to establishing and maintaining connections:
                </p>

                <h3>TCP Connection Issues</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Problem: TLS Handshake Fails
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      The TLS handshake fails during connection establishment.
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`// Check TLS configuration
// Ensure server has valid certificates
// Verify TLS version compatibility

// Debug TLS issues
RUST_LOG=debug cargo run`}</code>
                    </pre>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Problem: Connection Drops
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Connections are established but drop unexpectedly.
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`// Implement connection monitoring
let mut client = VstpClient::connect_tcp("127.0.0.1:8080").await?;

// Send periodic heartbeats
tokio::spawn(async move {
    let mut interval = tokio::time::interval(Duration::from_secs(30));
    loop {
        interval.tick().await;
        if let Err(_) = client.send(Heartbeat {}).await {
            // Reconnect
            break;
        }
    }
});`}</code>
                    </pre>
                  </div>
                </div>

                <h3>UDP Connection Issues</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">Problem: Packet Loss</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      UDP packets are being lost in transit.
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`// Implement custom reliability
client.send_with_ack(message).await?;

// Use smaller packet sizes
const MAX_PACKET_SIZE: usize = 1400; // Leave room for headers

// Implement retry logic
for attempt in 0..3 {
    match client.send(message.clone()).await {
        Ok(_) => break,
        Err(_) if attempt == 2 => return Err("Max retries exceeded"),
        Err(_) => tokio::time::sleep(Duration::from_millis(100)).await,
    }
}`}</code>
                    </pre>
                  </div>
                </div>
              </section>

              <section id="serialization-errors">
                <h2>Serialization Errors</h2>
                <p>Problems with message serialization and deserialization:</p>

                <h3>Type Mismatch Errors</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Problem: Client and server use different types
// Client
#[derive(Serialize, Deserialize)]
struct ClientMessage {
    data: String,
}

// Server
#[derive(Serialize, Deserialize)]
struct ServerMessage {  // Different field name!
    content: String,
}

// Solution: Use the same type
#[derive(Serialize, Deserialize)]
struct Message {
    data: String,
}

// Or use a shared crate for message types`}</code>
                </pre>

                <h3>JSON Validation</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Validate JSON before sending
let json = serde_json::to_string(&message)?;
println!("Sending JSON: {}", json);

// Validate JSON after receiving
let json = String::from_utf8(frame.payload().to_vec())?;
println!("Received JSON: {}", json);

// Use serde_json::from_str for debugging
match serde_json::from_str::<MyMessage>(&json) {
    Ok(msg) => println!("Valid message: {:?}", msg),
    Err(e) => println!("Invalid JSON: {}", e),
}`}</code>
                </pre>

                <h3>Custom Serialization</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// For complex types, implement custom serialization
use serde::{Serialize, Deserialize, Serializer, Deserializer};

#[derive(Debug)]
struct CustomType {
    data: Vec<u8>,
}

impl Serialize for CustomType {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        // Custom serialization logic
        serializer.serialize_bytes(&self.data)
    }
}

impl<'de> Deserialize<'de> for CustomType {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        // Custom deserialization logic
        let data = Vec::<u8>::deserialize(deserializer)?;
        Ok(CustomType { data })
    }
}`}</code>
                </pre>
              </section>

              <section id="performance-issues">
                <h2>Performance Issues</h2>
                <p>Optimizing VSTP application performance:</p>

                <h3>Message Batching</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Instead of sending individual messages
for message in messages {
    client.send(message).await?;  // Inefficient
}

// Batch messages together
#[derive(Serialize, Deserialize)]
struct MessageBatch {
    messages: Vec<MyMessage>,
    batch_id: String,
}

let batch = MessageBatch {
    messages,
    batch_id: uuid::Uuid::new_v4().to_string(),
};
client.send(batch).await?;  // More efficient`}</code>
                </pre>

                <h3>Connection Pooling</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use std::sync::Arc;
use tokio::sync::Mutex;

struct ConnectionPool {
    connections: Arc<Mutex<Vec<VstpClient>>>,
    max_connections: usize,
}

impl ConnectionPool {
    async fn get_connection(&self) -> Result<VstpClient, VstpError> {
        let mut conns = self.connections.lock().await;
        
        if let Some(conn) = conns.pop() {
            return Ok(conn);
        }
        
        // Create new connection
        VstpClient::connect_tcp("127.0.0.1:8080").await
    }
    
    async fn return_connection(&self, conn: VstpClient) {
        let mut conns = self.connections.lock().await;
        if conns.len() < self.max_connections {
            conns.push(conn);
        }
    }
}`}</code>
                </pre>

                <h3>Async Processing</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Process messages concurrently
server.serve(|msg: MyMessage| {
    async move {
        // Spawn heavy processing in background
        tokio::spawn(async move {
            heavy_processing(msg.clone()).await;
        });
        
        // Return immediately
        Ok(msg)
    }
}).await?;

// Use async streams for high-throughput
use tokio_stream::StreamExt;

let mut stream = tokio_stream::iter(messages);
while let Some(message) = stream.next().await {
    client.send(message).await?;
}`}</code>
                </pre>
              </section>

              <section id="timeout-issues">
                <h2>Timeout Issues</h2>
                <p>Managing timeouts effectively:</p>

                <h3>Configuring Timeouts</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Set appropriate timeouts for different operations
let mut client = VstpClient::connect_tcp("127.0.0.1:8080").await?;

// Short timeout for real-time operations
client.set_timeout(Duration::from_millis(100));

// Longer timeout for file transfers
client.set_timeout(Duration::from_secs(300));

// Different timeouts for different message types
match message_type {
    MessageType::Heartbeat => {
        client.set_timeout(Duration::from_millis(100));
    }
    MessageType::FileTransfer => {
        client.set_timeout(Duration::from_secs(60));
    }
    _ => {
        client.set_timeout(Duration::from_secs(5));
    }
}`}</code>
                </pre>

                <h3>Timeout Handling</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Implement retry logic with exponential backoff
async fn send_with_retry(
    client: &VstpClient,
    message: MyMessage,
    max_retries: u32,
) -> Result<(), VstpError> {
    for attempt in 0..max_retries {
        match client.send(message.clone()).await {
            Ok(_) => return Ok(()),
            Err(VstpError::Timeout) if attempt < max_retries - 1 => {
                let delay = Duration::from_millis(100 * (1 << attempt));
                tokio::time::sleep(delay).await;
            }
            Err(e) => return Err(e),
        }
    }
    Err(VstpError::Timeout)
}`}</code>
                </pre>
              </section>

              <section id="debugging-tips">
                <h2>Debugging Tips</h2>
                <p>Effective debugging strategies for VSTP applications:</p>

                <h3>Enable Debug Logging</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Set environment variable
export RUST_LOG=debug

// Or in your code
env_logger::init();

// Use tracing for structured logging
use tracing::{info, warn, error, debug};

#[tracing::instrument]
async fn handle_message(msg: MyMessage) -> Result<(), VstpError> {
    debug!("Processing message: {:?}", msg);
    
    match process_message(msg).await {
        Ok(result) => {
            info!("Message processed successfully: {:?}", result);
            Ok(())
        }
        Err(e) => {
            error!("Failed to process message: {}", e);
            Err(e)
        }
    }
}`}</code>
                </pre>

                <h3>Network Debugging</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Use network monitoring tools
// tcpdump for packet inspection
sudo tcpdump -i any port 8080

// netstat for connection monitoring
netstat -an | grep 8080

// ss for socket statistics
ss -tuln | grep 8080

// Wireshark for detailed packet analysis
// Filter: vstp or port 8080`}</code>
                </pre>

                <h3>Message Tracing</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Add message IDs for tracing
#[derive(Serialize, Deserialize)]
struct TraceableMessage {
    id: String,
    data: String,
    timestamp: u64,
}

// Log message flow
async fn send_message(client: &VstpClient, msg: TraceableMessage) -> Result<(), VstpError> {
    info!("Sending message {}: {}", msg.id, msg.data);
    
    match client.send(msg.clone()).await {
        Ok(_) => {
            info!("Message {} sent successfully", msg.id);
            Ok(())
        }
        Err(e) => {
            error!("Failed to send message {}: {}", msg.id, e);
            Err(e)
        }
    }
}`}</code>
                </pre>

                <h3>Performance Profiling</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Use tokio-console for async runtime monitoring
// Add to Cargo.toml
[dependencies]
tokio-console = "0.1"

// Run with console subscriber
use tokio_console_subscriber;

#[tokio::main]
async fn main() {
    tokio_console_subscriber::init();
    
    // Your application code
}

// Use flamegraph for CPU profiling
cargo install flamegraph
cargo flamegraph --bin my-app`}</code>
                </pre>
              </section>

              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
                <p className="mb-4">
                  If you're still experiencing issues, try these resources:
                </p>
                <ul className="space-y-2">
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
                  <li>
                    <Link
                      href="/docs/best-practices"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      → Best Practices
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
