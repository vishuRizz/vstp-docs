import React from "react";
import Link from "next/link";
import CodeWithCopy from "../../components/CodeWithCopy";

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
                    href="#basic-usage"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Basic Usage
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
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
                <h4 className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">
                  ⚡ Quick Tip
                </h4>
                <p className="text-yellow-700 dark:text-yellow-200">
                  VSTP v0.2.1 introduces a new simplified API that makes it much
                  easier to build networked applications. This guide focuses on
                  the new API.
                </p>
              </div>

              <section id="installation">
                <h2>Installation</h2>
                <p>
                  Add VSTP to your project by adding the following to your{" "}
                  <code>Cargo.toml</code>:
                </p>

                <CodeWithCopy className="bg-gray-900 p-4 rounded-lg">
                  {`[dependencies]
vstp = "0.2.1"
tokio = { version = "1.0", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }`}
                </CodeWithCopy>
              </section>

              <section id="basic-usage">
                <h2>Basic Usage</h2>
                <p>
                  VSTP v0.2.1 makes it incredibly easy to send and receive typed
                  messages. Here's a simple example:
                </p>

                <CodeWithCopy className="bg-gray-900 p-4 rounded-lg">
                  {`use serde::{Serialize, Deserialize};
use vstp::easy::{VstpClient, VstpServer};

#[derive(Serialize, Deserialize)]
struct Message {
    content: String,
}

// Server
let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;
server.serve(|msg: Message| async move {
    println!("Got message: {}", msg.content);
    Ok(msg) // Echo the message back
}).await?;

// Client
let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
client.send(Message { content: "Hello!".to_string() }).await?;
let response: Message = client.receive().await?;`}
                </CodeWithCopy>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
                  <h4 className="text-blue-900 dark:text-blue-100 font-semibold mb-2">
                    💡 Key Features
                  </h4>
                  <ul className="text-blue-700 dark:text-blue-200 list-disc list-inside">
                    <li>Automatic serialization/deserialization</li>
                    <li>Type-safe message passing</li>
                    <li>Built-in error handling</li>
                    <li>Timeouts and retries</li>
                  </ul>
                </div>
              </section>

              <section id="tcp-example">
                <h2>TCP Example: Chat Server</h2>
                <p>
                  Here's a complete example of a chat server using TCP with
                  automatic message routing:
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use serde::{Serialize, Deserialize};
use vstp::easy::{VstpClient, VstpServer};

#[derive(Serialize, Deserialize)]
struct ChatMessage {
    from: String,
    content: String,
}

// Chat Server
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;
    println!("Chat server running on 127.0.0.1:8080");
    
    server.serve(|msg: ChatMessage| async move {
        println!("{}: {}", msg.from, msg.content);
        Ok(msg) // Broadcast message back to all clients
    }).await?;

    Ok(())
}

// Chat Client
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
    
    // Send a message
    let msg = ChatMessage {
        from: "Alice".to_string(),
        content: "Hello everyone!".to_string(),
    };
    client.send(msg).await?;
    
    // Receive messages
    while let Ok(msg) = client.receive::<ChatMessage>().await {
        println!("{}: {}", msg.from, msg.content);
    }

    Ok(())
}`}</code>
                </pre>
              </section>

              <section id="udp-example">
                <h2>UDP Example: Real-time Data</h2>
                <p>
                  For real-time applications, you can use UDP mode. The API
                  remains the same:
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use serde::{Serialize, Deserialize};
use vstp::easy::{VstpClient, VstpServer};

#[derive(Serialize, Deserialize)]
struct SensorData {
    sensor_id: String,
    temperature: f32,
    humidity: f32,
}

// UDP Server
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let server = VstpServer::bind_udp("127.0.0.1:8080").await?;
    
    server.serve(|data: SensorData| async move {
        println!("Sensor {}: {}°C, {}%", data.sensor_id, data.temperature, data.humidity);
        Ok(data)
    }).await?;

    Ok(())
}

// UDP Client
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = VstpClient::connect_udp("127.0.0.1:8080").await?;
    
    // Send data periodically
    loop {
        let data = SensorData {
            sensor_id: "sensor1".to_string(),
            temperature: 25.5,
            humidity: 60.0,
        };
        client.send(data).await?;
        tokio::time::sleep(std::time::Duration::from_secs(1)).await;
    }
}`}</code>
                </pre>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
                  <h4 className="text-green-900 dark:text-green-100 font-semibold mb-2">
                    🚀 Performance Tip
                  </h4>
                  <p className="text-green-700 dark:text-green-200">
                    UDP mode is perfect for real-time applications where low
                    latency is crucial. VSTP handles packet fragmentation and
                    reassembly automatically.
                  </p>
                </div>
              </section>

              <section id="next-steps">
                <h2>Next Steps</h2>
                <p>
                  Now that you've seen the basics, here are some resources to
                  help you build more complex applications:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Link
                    href="/docs/api"
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <h3 className="font-semibold mb-2">📚 API Reference</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Complete documentation of all VSTP features and options.
                    </p>
                  </Link>

                  <Link
                    href="/docs/examples"
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <h3 className="font-semibold mb-2">💡 Examples</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Real-world examples and common patterns.
                    </p>
                  </Link>

                  <Link
                    href="/docs/best-practices"
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <h3 className="font-semibold mb-2">✨ Best Practices</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Tips and tricks for building robust applications.
                    </p>
                  </Link>

                  <Link
                    href="/docs/troubleshooting"
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <h3 className="font-semibold mb-2">🔧 Troubleshooting</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Common issues and how to solve them.
                    </p>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
