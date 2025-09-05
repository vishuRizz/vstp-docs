import React from "react";
import Link from "next/link";

export default function ApiReference() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                API Reference
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#client"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    VstpClient
                  </a>
                </li>
                <li>
                  <a
                    href="#server"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    VstpServer
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
                    href="#timeouts"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Timeouts
                  </a>
                </li>
                <li>
                  <a
                    href="#serialization"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Serialization
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              API Reference
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
                <h4 className="text-blue-900 dark:text-blue-100 font-semibold mb-2">
                  📘 API Version
                </h4>
                <p className="text-blue-700 dark:text-blue-200">
                  This documentation covers the new simplified API introduced in
                  VSTP v0.2.1. For the low-level API, see the{" "}
                  <Link
                    href="/docs/api/low-level"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Low-Level API Reference
                  </Link>
                  .
                </p>
              </div>

              <section id="client">
                <h2>VstpClient</h2>
                <p>
                  The <code>VstpClient</code> struct provides a high-level
                  interface for sending and receiving messages.
                </p>

                <h3>Creating a Client</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// TCP client
let client = VstpClient::connect_tcp("127.0.0.1:8080").await?;

// UDP client
let client = VstpClient::connect_udp("127.0.0.1:8080").await?;`}</code>
                </pre>

                <h3>Methods</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">send</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Sends any serializable data to the server.
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg">
                      <code>{`async fn send<T: Serialize>(&self, data: T) -> Result<(), VstpError>`}</code>
                    </pre>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">receive</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Receives and deserializes data from the server.
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg">
                      <code>{`async fn receive<T: DeserializeOwned>(&self) -> Result<T, VstpError>`}</code>
                    </pre>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">send_with_ack</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Sends data and waits for acknowledgment.
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg">
                      <code>{`async fn send_with_ack<T: Serialize>(&self, data: T) -> Result<(), VstpError>`}</code>
                    </pre>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">send_raw</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Sends a raw frame without serialization.
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg">
                      <code>{`async fn send_raw(&self, frame: Frame) -> Result<(), VstpError>`}</code>
                    </pre>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">set_timeout</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Sets the operation timeout.
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg">
                      <code>{`fn set_timeout(&mut self, timeout: Duration)`}</code>
                    </pre>
                  </div>
                </div>
              </section>

              <section id="server">
                <h2>VstpServer</h2>
                <p>
                  The <code>VstpServer</code> struct provides a high-level
                  interface for handling client connections and messages.
                </p>

                <h3>Creating a Server</h3>
                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// TCP server
let server = VstpServer::bind_tcp("127.0.0.1:8080").await?;

// UDP server
let server = VstpServer::bind_udp("127.0.0.1:8080").await?;`}</code>
                </pre>

                <h3>Methods</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">serve</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Starts the server with a message handler.
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg">
                      <code>{`async fn serve<F, Fut, T, R>(self, handler: F) -> Result<(), VstpError>
where
    F: Fn(T) -> Fut + Send + Sync + 'static,
    Fut: Future<Output = Result<R, VstpError>> + Send,
    T: DeserializeOwned + Send + 'static,
    R: Serialize + Send + 'static`}</code>
                    </pre>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">set_timeout</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Sets the operation timeout.
                    </p>
                    <pre className="bg-gray-900 p-4 rounded-lg">
                      <code>{`fn set_timeout(&mut self, timeout: Duration)`}</code>
                    </pre>
                  </div>
                </div>
              </section>

              <section id="error-handling">
                <h2>Error Handling</h2>
                <p>
                  VSTP provides comprehensive error handling through the{" "}
                  <code>VstpError</code> enum:
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`pub enum VstpError {
    // IO errors
    Io(std::io::Error),
    
    // Protocol errors
    Protocol(String),
    InvalidVersion { expected: u8, got: u8 },
    InvalidFrameType(u8),
    InvalidMagic([u8; 2]),
    
    // Operation errors
    Timeout,
    InvalidAddress,
    SerializationError,
    DeserializationError,
    UnexpectedFrameType,
    ConnectionClosed,
    ServerError(String),
}`}</code>
                </pre>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-6">
                  <h4 className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">
                    ⚠️ Error Handling Best Practices
                  </h4>
                  <ul className="text-yellow-700 dark:text-yellow-200 list-disc list-inside">
                    <li>Always check for timeouts and connection errors</li>
                    <li>
                      Use <code>send_with_ack</code> for important messages
                    </li>
                    <li>
                      Handle serialization errors for better error messages
                    </li>
                  </ul>
                </div>
              </section>

              <section id="timeouts">
                <h2>Timeouts</h2>
                <p>
                  VSTP provides configurable timeouts for all operations. The
                  default timeout is 30 seconds.
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Set client timeout
let mut client = VstpClient::connect_tcp("127.0.0.1:8080").await?;
client.set_timeout(Duration::from_secs(5));

// Set server timeout
let mut server = VstpServer::bind_tcp("127.0.0.1:8080").await?;
server.set_timeout(Duration::from_secs(10));`}</code>
                </pre>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
                  <h4 className="text-green-900 dark:text-green-100 font-semibold mb-2">
                    💡 Timeout Tips
                  </h4>
                  <ul className="text-green-700 dark:text-green-200 list-disc list-inside">
                    <li>Use shorter timeouts for real-time applications</li>
                    <li>Consider network conditions when setting timeouts</li>
                    <li>
                      UDP operations might need longer timeouts for
                      retransmission
                    </li>
                  </ul>
                </div>
              </section>

              <section id="serialization">
                <h2>Serialization</h2>
                <p>
                  VSTP uses serde for automatic serialization and
                  deserialization of messages.
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct MyMessage {
    field1: String,
    field2: i32,
    field3: Vec<f64>,
}

// Send typed message
client.send(MyMessage {
    field1: "hello".to_string(),
    field2: 42,
    field3: vec![1.0, 2.0, 3.0],
}).await?;

// Receive typed message
let msg: MyMessage = client.receive().await?;`}</code>
                </pre>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 my-6">
                  <h4 className="text-purple-900 dark:text-purple-100 font-semibold mb-2">
                    🎯 Serialization Tips
                  </h4>
                  <ul className="text-purple-700 dark:text-purple-200 list-disc list-inside">
                    <li>Use derive macros for simple types</li>
                    <li>Implement custom serialization for complex types</li>
                    <li>Consider message size in UDP mode</li>
                  </ul>
                </div>
              </section>

              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
                <p className="mb-4">
                  Now that you understand the API, check out these resources:
                </p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/docs/examples"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      → Real-world Examples
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/best-practices"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      → Best Practices Guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/troubleshooting"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      → Troubleshooting Guide
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
