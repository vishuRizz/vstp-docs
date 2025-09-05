import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              VSTP
            </h1>
            <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
              v0.1.0
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#quickstart"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Quick Start
            </a>
            <a
              href="#protocol"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Protocol
            </a>
            <a
              href="#api"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              API
            </a>
            <a
              href="#examples"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Examples
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Vishu's Secure Transfer Protocol
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A general-purpose, binary, extensible application-layer protocol
            designed to be secure, fast, and easy to implement.
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            <a
              href="#quickstart"
              className="px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </a>
            <a
              href="https://github.com/vishuRizz/VSTP-Vishus-Secure-Transfer-Protocol"
              className="px-8 py-3 text-base font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Secure by Default
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Built-in TLS 1.3 support for TCP connections, ensuring your data
                stays protected.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Fast UDP Mode
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Optimized for speed with UDP transport, perfect for real-time
                applications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Easy to Implement
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Clean API design and comprehensive documentation make
                integration a breeze.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quickstart" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Quick Start
          </h2>
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{`# Add VSTP to your Cargo.toml
[dependencies]
vstp = "0.1.0"

# Create a simple data frame
use vstp::{Frame, FrameType, Flags};

let frame = Frame::new(FrameType::Data)
    .with_header("content-type", "text/plain")
    .with_payload(b"Hello, VSTP!".to_vec())
    .with_flag(Flags::REQ_ACK);

// Encode to bytes
let encoded = vstp::frame::encode_frame(&frame)?;

// Decode from bytes
let mut buf = bytes::BytesMut::from(&encoded[..]);
let decoded = vstp::frame::try_decode_frame(&mut buf, 1024)?.unwrap();

assert_eq!(frame, decoded);`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Protocol Overview Section */}
      <section
        id="protocol"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Protocol Overview
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <h3>Frame Format</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>MAGIC (2B)</strong>: Protocol identifier (0x56 0x54)
              </li>
              <li>
                <strong>VER (1B)</strong>: Protocol version
              </li>
              <li>
                <strong>TYPE (1B)</strong>: Message type
              </li>
              <li>
                <strong>FLAGS (1B)</strong>: Bit flags
              </li>
              <li>
                <strong>HDR_LEN (2B LE)</strong>: Header section length
              </li>
              <li>
                <strong>PAY_LEN (4B BE)</strong>: Payload length
              </li>
              <li>
                <strong>HEADERS</strong>: Variable-length header section
              </li>
              <li>
                <strong>PAYLOAD</strong>: Variable-length payload section
              </li>
              <li>
                <strong>CRC32</strong>: 32-bit checksum
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">
            VSTP is open source and available under the MIT License.
          </p>
          <div className="mt-8 flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              Examples
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
