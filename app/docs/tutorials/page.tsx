import React from "react";
import Link from "next/link";

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tutorials
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#chat-app"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Chat Application
                  </a>
                </li>
                <li>
                  <a
                    href="#file-transfer"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    File Transfer
                  </a>
                </li>
                <li>
                  <a
                    href="#real-time-data"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Real-time Data
                  </a>
                </li>
                <li>
                  <a
                    href="#microservices"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Microservices
                  </a>
                </li>
                <li>
                  <a
                    href="#iot-device"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    IoT Device
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              VSTP Tutorials
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Learn how to build real-world applications with VSTP through these
                step-by-step tutorials. Each tutorial focuses on a specific use case
                and demonstrates best practices.
              </p>

              <section id="chat-app">
                <h2>Building a Chat Application</h2>
                <p>
                  In this tutorial, we'll build a simple chat application using VSTP's
                  TCP mode with automatic message routing.
                </p>

                <h3>Step 1: Define Message Types</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct ChatMessage {
    pub from: String,
    pub content: String,
    pub timestamp: u64,
}

#[derive(Serialize, Deserialize)]
pub struct UserJoin {
    pub username: String,
}

#[derive(Serialize, Deserialize)]
pub struct UserLeave {
    pub username: String,
}`}</code>
                </pre>

                <h3>Step 2: Create the Server</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::easy::VstpServer;
use std::collections::HashMap;
use tokio::sync::Mutex;

type ConnectedUsers = Arc<Mutex<HashMap<String, String>>>;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let users = Arc::new(Mutex::new(HashMap::new()));
    let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;
    
    println!("Chat server running on 127.0.0.1:8080");
    
    server.serve(move |msg: ChatMessage| {
        let users = users.clone();
        async move {
            // Broadcast message to all connected users
            println!("{}: {}", msg.from, msg.content);
            Ok(msg)
        }
    }).await?;

    Ok(())
}`}</code>
                </pre>

                <h3>Step 3: Create the Client</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::easy::VstpClient;
use std::io::{self, BufRead};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
    let stdin = io::stdin();
    
    println!("Enter your username:");
    let mut username = String::new();
    stdin.lock().read_line(&mut username)?;
    let username = username.trim().to_string();
    
    // Send join message
    client.send(UserJoin { username: username.clone() }).await?;
    
    // Start message receiving task
    let client_recv = client.clone();
    tokio::spawn(async move {
        while let Ok(msg) = client_recv.receive::<ChatMessage>().await {
            if msg.from != username {
                println!("{}: {}", msg.from, msg.content);
            }
        }
    });
    
    // Handle user input
    for line in stdin.lock().lines() {
        let content = line?;
        if content == "/quit" {
            break;
        }
        
        let msg = ChatMessage {
            from: username.clone(),
            content,
            timestamp: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)?
                .as_secs(),
        };
        
        client.send(msg).await?;
    }
    
    Ok(())
}`}</code>
                </pre>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
                  <h4 className="text-green-900 dark:text-green-100 font-semibold mb-2">
                    💡 Key Features Demonstrated
                  </h4>
                  <ul className="text-green-700 dark:text-green-200 list-disc list-inside">
                    <li>Automatic message serialization/deserialization</li>
                    <li>Concurrent message handling</li>
                    <li>Type-safe message passing</li>
                    <li>Built-in error handling</li>
                  </ul>
                </div>
              </section>

              <section id="file-transfer">
                <h2>File Transfer System</h2>
                <p>
                  Learn how to build a secure file transfer system using VSTP's
                  reliable TCP mode with progress tracking.
                </p>

                <h3>Step 1: Define Transfer Messages</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`#[derive(Serialize, Deserialize)]
pub struct FileInfo {
    pub filename: String,
    pub size: u64,
    pub checksum: String,
}

#[derive(Serialize, Deserialize)]
pub struct FileChunk {
    pub chunk_id: u32,
    pub data: Vec<u8>,
    pub is_last: bool,
}

#[derive(Serialize, Deserialize)]
pub struct TransferProgress {
    pub bytes_transferred: u64,
    pub total_bytes: u64,
}`}</code>
                </pre>

                <h3>Step 2: File Transfer Server</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use std::path::Path;
use sha2::{Sha256, Digest};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;
    
    server.serve(|chunk: FileChunk| async move {
        // Save chunk to file
        let mut file = tokio::fs::OpenOptions::new()
            .create(true)
            .append(true)
            .open("received_file").await?;
            
        file.write_all(&chunk.data).await?;
        
        // Send progress update
        let progress = TransferProgress {
            bytes_transferred: chunk.chunk_id as u64 * 1024,
            total_bytes: 0, // Would be set from initial FileInfo
        };
        
        Ok(progress)
    }).await?;

    Ok(())
}`}</code>
                </pre>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
                  <h4 className="text-blue-900 dark:text-blue-100 font-semibold mb-2">
                    🔒 Security Features
                  </h4>
                  <ul className="text-blue-700 dark:text-blue-200 list-disc list-inside">
                    <li>Automatic TLS 1.3 encryption</li>
                    <li>File integrity verification</li>
                    <li>Progress tracking and resumption</li>
                    <li>Error recovery and retry logic</li>
                  </ul>
                </div>
              </section>

              <section id="real-time-data">
                <h2>Real-time Data Streaming</h2>
                <p>
                  Build a high-performance data streaming system using VSTP's UDP mode
                  for low-latency communication.
                </p>

                <h3>Step 1: Define Data Types</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`#[derive(Serialize, Deserialize)]
pub struct SensorData {
    pub sensor_id: String,
    pub timestamp: u64,
    pub temperature: f32,
    pub humidity: f32,
    pub pressure: f32,
}

#[derive(Serialize, Deserialize)]
pub struct DataStream {
    pub stream_id: String,
    pub data: Vec<SensorData>,
}`}</code>
                </pre>

                <h3>Step 2: UDP Data Server</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpServer::bind_udp("127.0.0.1:8080").await?;
    
    server.serve(|data: SensorData| async move {
        // Process real-time data
        println!("Sensor {}: {:.2}°C, {:.2}%", 
                 data.sensor_id, data.temperature, data.humidity);
        
        // Store in database or forward to other systems
        store_sensor_data(&data).await?;
        
        Ok(data)
    }).await?;

    Ok(())
}

async fn store_sensor_data(data: &SensorData) -> Result<(), Box<dyn std::error::Error>> {
    // Implementation for storing data
    Ok(())
}`}</code>
                </pre>

                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 my-6">
                  <h4 className="text-orange-900 dark:text-orange-100 font-semibold mb-2">
                    ⚡ Performance Tips
                  </h4>
                  <ul className="text-orange-700 dark:text-orange-200 list-disc list-inside">
                    <li>Use UDP for low-latency requirements</li>
                    <li>Batch multiple data points in single messages</li>
                    <li>Implement custom reliability for critical data</li>
                    <li>Monitor network conditions and adjust accordingly</li>
                  </ul>
                </div>
              </section>

              <section id="microservices">
                <h2>Microservices Communication</h2>
                <p>
                  Learn how to use VSTP for inter-service communication in a
                  microservices architecture.
                </p>

                <h3>Step 1: Service Discovery</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`#[derive(Serialize, Deserialize)]
pub struct ServiceRequest {
    pub service_name: String,
    pub method: String,
    pub payload: serde_json::Value,
    pub request_id: String,
}

#[derive(Serialize, Deserialize)]
pub struct ServiceResponse {
    pub request_id: String,
    pub result: Result<serde_json::Value, String>,
}`}</code>
                </pre>

                <h3>Step 2: Service Gateway</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use std::collections::HashMap;

type ServiceRegistry = Arc<Mutex<HashMap<String, String>>>;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let registry = Arc::new(Mutex::new(HashMap::new()));
    let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;
    
    server.serve(move |req: ServiceRequest| {
        let registry = registry.clone();
        async move {
            // Route request to appropriate service
            let service_addr = registry.lock().await
                .get(&req.service_name)
                .ok_or("Service not found")?;
                
            // Forward request and return response
            let response = forward_request(service_addr, &req).await?;
            Ok(response)
        }
    }).await?;

    Ok(())
}`}</code>
                </pre>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 my-6">
                  <h4 className="text-purple-900 dark:text-purple-100 font-semibold mb-2">
                    🏗️ Architecture Benefits
                  </h4>
                  <ul className="text-purple-700 dark:text-purple-200 list-disc list-inside">
                    <li>Type-safe service communication</li>
                    <li>Automatic load balancing</li>
                    <li>Built-in service discovery</li>
                    <li>Secure inter-service communication</li>
                  </ul>
                </div>
              </section>

              <section id="iot-device">
                <h2>IoT Device Communication</h2>
                <p>
                  Build a robust IoT device communication system with automatic
                  reconnection and data buffering.
                </p>

                <h3>Step 1: Device Messages</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`#[derive(Serialize, Deserialize)]
pub struct DeviceStatus {
    pub device_id: String,
    pub battery_level: u8,
    pub signal_strength: i8,
    pub last_seen: u64,
}

#[derive(Serialize, Deserialize)]
pub struct DeviceCommand {
    pub device_id: String,
    pub command: String,
    pub parameters: serde_json::Value,
}`}</code>
                </pre>

                <h3>Step 2: IoT Gateway</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpServer::bind_tcp("0.0.0.0:8080").await?;
    
    server.serve(|status: DeviceStatus| async move {
        // Update device status in database
        update_device_status(&status).await?;
        
        // Check for pending commands
        if let Some(command) = get_pending_command(&status.device_id).await? {
            return Ok(command);
        }
        
        Ok(DeviceCommand {
            device_id: status.device_id,
            command: "heartbeat".to_string(),
            parameters: serde_json::Value::Null,
        })
    }).await?;

    Ok(())
}`}</code>
                </pre>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-6">
                  <h4 className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">
                    🔋 IoT Considerations
                  </h4>
                  <ul className="text-yellow-700 dark:text-yellow-200 list-disc list-inside">
                    <li>Implement connection pooling for efficiency</li>
                    <li>Use message queuing for offline devices</li>
                    <li>Implement data compression for bandwidth</li>
                    <li>Add device authentication and authorization</li>
                  </ul>
                </div>
              </section>

              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
                <p className="mb-4">
                  Ready to build your own application? Check out these resources:
                </p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/docs/examples"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      → More Examples
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
                  <li>
                    <Link
                      href="/docs/api"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      → API Reference
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
