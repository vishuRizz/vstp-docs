import React from "react";
import Link from "next/link";

export default function Examples() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Examples
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#basic-echo"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Basic Echo
                  </a>
                </li>
                <li>
                  <a
                    href="#chat-server"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Chat Server
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
                    href="#real-time-sensor"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Real-time Sensor
                  </a>
                </li>
                <li>
                  <a
                    href="#load-balancer"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Load Balancer
                  </a>
                </li>
                <li>
                  <a
                    href="#game-server"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Game Server
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              VSTP Examples
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Explore real-world examples that demonstrate VSTP's capabilities.
                Each example is complete and ready to run, showing best practices
                for different use cases.
              </p>

              <section id="basic-echo">
                <h2>Basic Echo Server</h2>
                <p>
                  A simple echo server that demonstrates the basic VSTP client-server
                  communication pattern.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="font-semibold mb-4">Server</h3>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{`use vstp::easy::{VstpServer, VstpClient};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct Message {
    content: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;
    println!("Echo server running on 127.0.0.1:8080");
    
    server.serve(|msg: Message| async move {
        println!("Echoing: {}", msg.content);
        Ok(msg)
    }).await?;

    Ok(())
}`}</code>
                    </pre>
                  </div>

                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="font-semibold mb-4">Client</h3>
                    <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{`use vstp::easy::VstpClient;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct Message {
    content: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
    
    let msg = Message {
        content: "Hello, VSTP!".to_string(),
    };
    
    client.send(msg.clone()).await?;
    let response: Message = client.receive().await?;
    
    println!("Received: {}", response.content);
    Ok(())
}`}</code>
                    </pre>
                  </div>
                </div>
              </section>

              <section id="chat-server">
                <h2>Multi-User Chat Server</h2>
                <p>
                  A complete chat server with user management and message broadcasting.
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::easy::{VstpServer, VstpClient};
use serde::{Serialize, Deserialize};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::Mutex;

#[derive(Serialize, Deserialize, Clone)]
struct ChatMessage {
    from: String,
    content: String,
    timestamp: u64,
}

#[derive(Serialize, Deserialize)]
struct UserJoin {
    username: String,
}

type ConnectedUsers = Arc<Mutex<HashMap<String, String>>>;

// Server implementation
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let users = Arc::new(Mutex::new(HashMap::new()));
    let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;
    
    println!("Chat server running on 127.0.0.1:8080");
    
    server.serve(move |msg: ChatMessage| {
        let users = users.clone();
        async move {
            // Broadcast message to all connected users
            let user_count = users.lock().await.len();
            println!("[{} users] {}: {}", user_count, msg.from, msg.content);
            Ok(msg)
        }
    }).await?;

    Ok(())
}

// Client implementation
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
    let username = "Alice".to_string();
    
    // Start message receiving task
    let client_recv = client.clone();
    tokio::spawn(async move {
        while let Ok(msg) = client_recv.receive::<ChatMessage>().await {
            if msg.from != username {
                println!("{}: {}", msg.from, msg.content);
            }
        }
    });
    
    // Send messages
    for i in 0..5 {
        let msg = ChatMessage {
            from: username.clone(),
            content: format!("Message {}", i),
            timestamp: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)?
                .as_secs(),
        };
        
        client.send(msg).await?;
        tokio::time::sleep(std::time::Duration::from_secs(1)).await;
    }
    
    Ok(())
}`}</code>
                </pre>
              </section>

              <section id="file-transfer">
                <h2>Secure File Transfer</h2>
                <p>
                  A file transfer system with progress tracking and integrity verification.
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::easy::{VstpServer, VstpClient};
use serde::{Serialize, Deserialize};
use sha2::{Sha256, Digest};

#[derive(Serialize, Deserialize)]
struct FileInfo {
    filename: String,
    size: u64,
    checksum: String,
}

#[derive(Serialize, Deserialize)]
struct FileChunk {
    chunk_id: u32,
    data: Vec<u8>,
    is_last: bool,
}

#[derive(Serialize, Deserialize)]
struct TransferProgress {
    bytes_transferred: u64,
    total_bytes: u64,
}

// Server implementation
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
}

// Client implementation
async fn send_file(client: &VstpClient, filepath: &str) -> Result<(), Box<dyn std::error::Error>> {
    let file = tokio::fs::read(filepath).await?;
    let chunks = file.chunks(1024).enumerate();
    
    for (i, chunk) in chunks {
        let file_chunk = FileChunk {
            chunk_id: i as u32,
            data: chunk.to_vec(),
            is_last: i == chunks.len() - 1,
        };
        
        client.send(file_chunk).await?;
        
        // Wait for progress update
        let progress: TransferProgress = client.receive().await?;
        println!("Progress: {}/{} bytes", progress.bytes_transferred, progress.total_bytes);
    }
    
    Ok(())
}`}</code>
                </pre>
              </section>

              <section id="real-time-sensor">
                <h2>Real-time Sensor Data</h2>
                <p>
                  A high-performance sensor data collection system using UDP for
                  low-latency communication.
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::easy::{VstpServer, VstpClient};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct SensorData {
    sensor_id: String,
    timestamp: u64,
    temperature: f32,
    humidity: f32,
    pressure: f32,
}

#[derive(Serialize, Deserialize)]
struct DataStream {
    stream_id: String,
    data: Vec<SensorData>,
}

// Server implementation
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpServer::bind_udp("127.0.0.1:8080").await?;
    
    server.serve(|data: SensorData| async move {
        // Process real-time data
        println!("Sensor {}: {:.2}°C, {:.2}%, {:.2}Pa", 
                 data.sensor_id, data.temperature, data.humidity, data.pressure);
        
        // Store in database or forward to other systems
        store_sensor_data(&data).await?;
        
        Ok(data)
    }).await?;

    Ok(())
}

// Client implementation
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = VstpClient::connect_udp("127.0.0.1:8080").await?;
    
    // Simulate sensor data
    for i in 0..100 {
        let data = SensorData {
            sensor_id: "sensor1".to_string(),
            timestamp: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)?
                .as_secs(),
            temperature: 20.0 + (i as f32 * 0.1),
            humidity: 50.0 + (i as f32 * 0.2),
            pressure: 1013.25 + (i as f32 * 0.5),
        };
        
        client.send(data).await?;
        tokio::time::sleep(std::time::Duration::from_millis(100)).await;
    }
    
    Ok(())
}`}</code>
                </pre>
              </section>

              <section id="load-balancer">
                <h2>Load Balancer</h2>
                <p>
                  A simple load balancer that distributes requests across multiple
                  backend services.
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::easy::{VstpServer, VstpClient};
use serde::{Serialize, Deserialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
struct ServiceRequest {
    service_name: String,
    method: String,
    payload: serde_json::Value,
    request_id: String,
}

#[derive(Serialize, Deserialize)]
struct ServiceResponse {
    request_id: String,
    result: Result<serde_json::Value, String>,
}

type ServiceRegistry = Arc<Mutex<HashMap<String, Vec<String>>>>;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let registry = Arc::new(Mutex::new(HashMap::new()));
    let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;
    
    // Register services
    {
        let mut reg = registry.lock().await;
        reg.insert("user-service".to_string(), vec![
            "127.0.0.1:8081".to_string(),
            "127.0.0.1:8082".to_string(),
        ]);
    }
    
    server.serve(move |req: ServiceRequest| {
        let registry = registry.clone();
        async move {
            // Get service instances
            let instances = registry.lock().await
                .get(&req.service_name)
                .ok_or("Service not found")?
                .clone();
                
            // Simple round-robin load balancing
            let instance = &instances[req.request_id.len() % instances.len()];
            
            // Forward request to backend service
            let response = forward_request(instance, &req).await?;
            Ok(response)
        }
    }).await?;

    Ok(())
}`}</code>
                </pre>
              </section>

              <section id="game-server">
                <h2>Game Server</h2>
                <p>
                  A real-time game server with player management and game state
                  synchronization.
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use vstp::easy::{VstpServer, VstpClient};
use serde::{Serialize, Deserialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Clone)]
struct Player {
    id: String,
    name: String,
    position: (f32, f32),
    health: u32,
}

#[derive(Serialize, Deserialize)]
struct GameState {
    players: Vec<Player>,
    game_time: u64,
}

#[derive(Serialize, Deserialize)]
struct PlayerAction {
    player_id: String,
    action: String,
    data: serde_json::Value,
}

type GameWorld = Arc<Mutex<HashMap<String, Player>>>;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let world = Arc::new(Mutex::new(HashMap::new()));
    let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;
    
    server.serve(move |action: PlayerAction| {
        let world = world.clone();
        async move {
            // Process player action
            match action.action.as_str() {
                "move" => {
                    let mut w = world.lock().await;
                    if let Some(player) = w.get_mut(&action.player_id) {
                        // Update player position
                        player.position = (
                            action.data["x"].as_f64().unwrap() as f32,
                            action.data["y"].as_f64().unwrap() as f32,
                        );
                    }
                }
                "attack" => {
                    // Handle attack logic
                }
                _ => {}
            }
            
            // Return current game state
            let w = world.lock().await;
            let game_state = GameState {
                players: w.values().cloned().collect(),
                game_time: std::time::SystemTime::now()
                    .duration_since(std::time::UNIX_EPOCH)?
                    .as_secs(),
            };
            
            Ok(game_state)
        }
    }).await?;

    Ok(())
}`}</code>
                </pre>
              </section>

              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Running the Examples</h2>
                <p className="mb-4">
                  All examples are ready to run. Here's how to get started:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Create a new Rust project: <code>cargo new my-vstp-app</code></li>
                  <li>Add VSTP to your dependencies in <code>Cargo.toml</code></li>
                  <li>Copy the example code into your <code>main.rs</code></li>
                  <li>Run with <code>cargo run</code></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
