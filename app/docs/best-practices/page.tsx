import React from "react";
import Link from "next/link";

export default function BestPractices() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Best Practices
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#message-design"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Message Design
                  </a>
                </li>
                <li>
                  <a
                    href="#error-handling"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Error Handling
                  </a>
                </li>
                <li>
                  <a
                    href="#performance"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Performance
                  </a>
                </li>
                <li>
                  <a
                    href="#security"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#testing"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Testing
                  </a>
                </li>
                <li>
                  <a
                    href="#monitoring"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Monitoring
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              VSTP Best Practices
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Learn the best practices for building robust, scalable applications
                with VSTP. These guidelines will help you avoid common pitfalls and
                build production-ready systems.
              </p>

              <section id="message-design">
                <h2>Message Design</h2>
                <p>
                  Well-designed messages are the foundation of a maintainable VSTP
                  application. Follow these principles for optimal message design.
                </p>

                <h3>Use Strong Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="text-red-900 dark:text-red-100 font-semibold mb-2">
                      ❌ Avoid
                    </h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`// Weak typing
#[derive(Serialize, Deserialize)]
struct Message {
    data: serde_json::Value,  // Too generic
    type: String,             // Error-prone
}`}</code>
                    </pre>
                  </div>

                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="text-green-900 dark:text-green-100 font-semibold mb-2">
                      ✅ Prefer
                    </h4>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm">
                      <code>{`// Strong typing
#[derive(Serialize, Deserialize)]
struct UserMessage {
    user_id: u64,
    content: String,
    timestamp: u64,
}

#[derive(Serialize, Deserialize)]
struct SystemMessage {
    level: LogLevel,
    message: String,
    source: String,
}`}</code>
                    </pre>
                  </div>
                </div>

                <h3>Version Your Messages</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`#[derive(Serialize, Deserialize)]
struct MessageV1 {
    version: u32,
    data: MessageData,
}

#[derive(Serialize, Deserialize)]
struct MessageData {
    // Your actual message fields
}`}</code>
                </pre>

                <h3>Keep Messages Small</h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-6">
                  <h4 className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">
                    💡 Size Guidelines
                  </h4>
                  <ul className="text-yellow-700 dark:text-yellow-200 list-disc list-inside">
                    <li>TCP: Keep under 64KB for optimal performance</li>
                    <li>UDP: Keep under 1.5KB to avoid fragmentation</li>
                    <li>Use pagination for large data sets</li>
                    <li>Consider compression for text-heavy messages</li>
                  </ul>
                </div>
              </section>

              <section id="error-handling">
                <h2>Error Handling</h2>
                <p>
                  Robust error handling is crucial for production applications.
                  VSTP provides comprehensive error types to help you handle
                  failures gracefully.
                </p>

                <h3>Handle All Error Types</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::VstpError;

async fn handle_message(client: &VstpClient) -> Result<(), Box<dyn std::error::Error>> {
    match client.receive::<MyMessage>().await {
        Ok(message) => {
            // Process message
            process_message(message).await?;
        }
        Err(VstpError::Timeout) => {
            // Handle timeout
            log::warn!("Message receive timeout");
            return Ok(());
        }
        Err(VstpError::Protocol(msg)) => {
            // Handle protocol errors
            log::error!("Protocol error: {}", msg);
            return Err(msg.into());
        }
        Err(e) => {
            // Handle other errors
            log::error!("Unexpected error: {}", e);
            return Err(e.into());
        }
    }
    Ok(())
}`}</code>
                </pre>

                <h3>Implement Retry Logic</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use tokio::time::{sleep, Duration};

async fn send_with_retry(
    client: &VstpClient,
    message: MyMessage,
    max_retries: u32,
) -> Result<(), Box<dyn std::error::Error>> {
    for attempt in 0..max_retries {
        match client.send(message.clone()).await {
            Ok(_) => return Ok(()),
            Err(e) if attempt == max_retries - 1 => return Err(e.into()),
            Err(e) => {
                log::warn!("Send attempt {} failed: {}", attempt + 1, e);
                sleep(Duration::from_millis(100 * (attempt + 1) as u64)).await;
            }
        }
    }
    unreachable!()
}`}</code>
                </pre>
              </section>

              <section id="performance">
                <h2>Performance Optimization</h2>
                <p>
                  VSTP is designed for high performance, but following these
                  guidelines will help you get the most out of it.
                </p>

                <h3>Choose the Right Transport</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                      🌐 Use TCP When
                    </h3>
                    <ul className="text-blue-700 dark:text-blue-200 space-y-2">
                      <li>• Reliable delivery is required</li>
                      <li>• Message order matters</li>
                      <li>• You need built-in encryption</li>
                      <li>• Connection persistence is important</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
                      ⚡ Use UDP When
                    </h3>
                    <ul className="text-orange-700 dark:text-orange-200 space-y-2">
                      <li>• Low latency is critical</li>
                      <li>• High throughput is needed</li>
                      <li>• You can handle packet loss</li>
                      <li>• You need custom reliability</li>
                    </ul>
                  </div>
                </div>

                <h3>Optimize Message Batching</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Batch multiple messages
#[derive(Serialize, Deserialize)]
struct MessageBatch {
    messages: Vec<MyMessage>,
    batch_id: String,
}

async fn send_batch(client: &VstpClient, messages: Vec<MyMessage>) -> Result<(), VstpError> {
    let batch = MessageBatch {
        messages,
        batch_id: uuid::Uuid::new_v4().to_string(),
    };
    
    client.send(batch).await
}`}</code>
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
              </section>

              <section id="security">
                <h2>Security Best Practices</h2>
                <p>
                  Security should be a primary concern when building networked
                  applications. VSTP provides several security features, but you
                  need to use them correctly.
                </p>

                <h3>Always Use TLS for TCP</h3>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
                  <h4 className="text-green-900 dark:text-green-100 font-semibold mb-2">
                    🔒 TLS Benefits
                  </h4>
                  <ul className="text-green-700 dark:text-green-200 list-disc list-inside">
                    <li>Automatic encryption of all data</li>
                    <li>Perfect forward secrecy</li>
                    <li>Certificate-based authentication</li>
                    <li>Protection against man-in-the-middle attacks</li>
                  </ul>
                </div>

                <h3>Implement Application-Level Security for UDP</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use aes_gcm::{Aes256Gcm, Key, Nonce};
use aes_gcm::aead::{Aead, NewAead};

#[derive(Serialize, Deserialize)]
struct SecureMessage {
    encrypted_data: Vec<u8>,
    nonce: Vec<u8>,
    signature: Vec<u8>,
}

async fn send_secure_message(
    client: &VstpClient,
    message: MyMessage,
    key: &[u8],
) -> Result<(), Box<dyn std::error::Error>> {
    // Encrypt message
    let cipher = Aes256Gcm::new(Key::from_slice(key));
    let nonce = Nonce::from_slice(b"unique nonce");
    let encrypted = cipher.encrypt(nonce, message.to_string().as_bytes())?;
    
    // Create secure message
    let secure_msg = SecureMessage {
        encrypted_data: encrypted,
        nonce: nonce.to_vec(),
        signature: sign_message(&encrypted, key)?,
    };
    
    client.send(secure_msg).await?;
    Ok(())
}`}</code>
                </pre>

                <h3>Validate All Input</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use validator::{Validate, ValidationError};

#[derive(Serialize, Deserialize, Validate)]
struct UserMessage {
    #[validate(length(min = 1, max = 1000))]
    content: String,
    
    #[validate(range(min = 0, max = 100))]
    priority: u8,
}

async fn handle_user_message(msg: UserMessage) -> Result<(), VstpError> {
    // Validate input
    msg.validate()
        .map_err(|e| VstpError::Protocol(format!("Validation error: {}", e)))?;
    
    // Process message
    process_message(msg).await?;
    Ok(())
}`}</code>
                </pre>
              </section>

              <section id="testing">
                <h2>Testing Strategies</h2>
                <p>
                  Comprehensive testing is essential for reliable applications.
                  VSTP makes it easy to test your networked code.
                </p>

                <h3>Unit Testing</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`#[cfg(test)]
mod tests {
    use super::*;
    use vstp::easy::{VstpClient, VstpServer};
    
    #[tokio::test]
    async fn test_message_handling() -> Result<(), Box<dyn std::error::Error>> {
        let server = VstpServer::bind_tcp("127.0.0.1:0").await?;
        let server_addr = "127.0.0.1:8080";
        
        // Start server
        tokio::spawn(async move {
            server.serve(|msg: TestMessage| async move {
                assert_eq!(msg.content, "test");
                Ok(msg)
            }).await
        });
        
        // Test client
        let client = VstpClient::connect_tcp(server_addr).await?;
        let test_msg = TestMessage {
            content: "test".to_string(),
        };
        
        client.send(test_msg.clone()).await?;
        let response: TestMessage = client.receive().await?;
        
        assert_eq!(response.content, "test");
        Ok(())
    }
}`}</code>
                </pre>

                <h3>Integration Testing</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`#[tokio::test]
async fn test_full_workflow() -> Result<(), Box<dyn std::error::Error>> {
    // Start test server
    let server = start_test_server().await?;
    
    // Test multiple clients
    let mut clients = Vec::new();
    for i in 0..10 {
        let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
        clients.push(client);
    }
    
    // Send messages from all clients
    for (i, client) in clients.iter().enumerate() {
        let msg = TestMessage {
            content: format!("message {}", i),
        };
        client.send(msg).await?;
    }
    
    // Verify all messages were received
    // ... verification logic
    
    Ok(())
}`}</code>
                </pre>
              </section>

              <section id="monitoring">
                <h2>Monitoring and Observability</h2>
                <p>
                  Production applications need comprehensive monitoring to ensure
                  reliability and performance.
                </p>

                <h3>Logging</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use tracing::{info, warn, error, instrument};

#[instrument]
async fn handle_message(msg: MyMessage) -> Result<(), VstpError> {
    info!("Processing message: {}", msg.id);
    
    match process_message(msg).await {
        Ok(result) => {
            info!("Message processed successfully: {}", result);
            Ok(())
        }
        Err(e) => {
            error!("Failed to process message: {}", e);
            Err(e)
        }
    }
}`}</code>
                </pre>

                <h3>Metrics</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use prometheus::{Counter, Histogram, Registry};

lazy_static! {
    static ref MESSAGES_RECEIVED: Counter = Counter::new(
        "vstp_messages_received_total",
        "Total number of messages received"
    ).unwrap();
    
    static ref MESSAGE_PROCESSING_TIME: Histogram = Histogram::new(
        "vstp_message_processing_seconds",
        "Time spent processing messages"
    ).unwrap();
}

async fn handle_message_with_metrics(msg: MyMessage) -> Result<(), VstpError> {
    let _timer = MESSAGE_PROCESSING_TIME.start_timer();
    MESSAGES_RECEIVED.inc();
    
    // Process message
    let result = process_message(msg).await?;
    
    Ok(result)
}`}</code>
                </pre>

                <h3>Health Checks</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use std::time::{Duration, Instant};

struct HealthChecker {
    last_heartbeat: Arc<Mutex<Instant>>,
}

impl HealthChecker {
    async fn start_heartbeat(&self, client: VstpClient) {
        let last_heartbeat = self.last_heartbeat.clone();
        
        tokio::spawn(async move {
            let mut interval = tokio::time::interval(Duration::from_secs(30));
            
            loop {
                interval.tick().await;
                
                match client.send(HeartbeatMessage {}).await {
                    Ok(_) => {
                        *last_heartbeat.lock().await = Instant::now();
                    }
                    Err(e) => {
                        error!("Heartbeat failed: {}", e);
                    }
                }
            }
        });
    }
    
    fn is_healthy(&self) -> bool {
        let last_heartbeat = self.last_heartbeat.lock().unwrap();
        last_heartbeat.elapsed() < Duration::from_secs(60)
    }
}`}</code>
                </pre>
              </section>

              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <p className="mb-4">
                  Following these best practices will help you build robust,
                  scalable applications with VSTP:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Design strong, versioned message types</li>
                  <li>Implement comprehensive error handling and retry logic</li>
                  <li>Choose the right transport for your use case</li>
                  <li>Optimize for performance with batching and connection pooling</li>
                  <li>Implement proper security measures</li>
                  <li>Write comprehensive tests</li>
                  <li>Add monitoring and observability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
