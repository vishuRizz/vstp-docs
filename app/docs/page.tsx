import React from "react";
import Link from "next/link";

export default function DocsHome() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Documentation
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs/getting-started"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/protocol"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Protocol Specification
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/api"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/tutorials"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/examples"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Examples
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/best-practices"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Best Practices
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/troubleshooting"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Troubleshooting
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              VSTP Documentation
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Welcome to the comprehensive documentation for Vishu's Secure
                Transfer Protocol (VSTP). This documentation will guide you
                through everything you need to know to implement and use VSTP
                effectively.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    🚀 Quick Start
                  </h3>
                  <p className="text-blue-700 dark:text-blue-200 mb-4">
                    Get up and running with VSTP in minutes. Perfect for
                    beginners.
                  </p>
                  <Link
                    href="/docs/getting-started"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
                  >
                    Start Here →
                  </Link>
                </div>

                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                    📚 Protocol Spec
                  </h3>
                  <p className="text-green-700 dark:text-green-200 mb-4">
                    Deep dive into the protocol specification and wire format.
                  </p>
                  <Link
                    href="/docs/protocol"
                    className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 font-medium"
                  >
                    Read Spec →
                  </Link>
                </div>

                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    🛠️ API Reference
                  </h3>
                  <p className="text-purple-700 dark:text-purple-200 mb-4">
                    Complete API documentation with examples and usage patterns.
                  </p>
                  <Link
                    href="/docs/api"
                    className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 font-medium"
                  >
                    Browse API →
                  </Link>
                </div>

                <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
                    🎯 Tutorials
                  </h3>
                  <p className="text-orange-700 dark:text-orange-200 mb-4">
                    Step-by-step tutorials for common use cases and patterns.
                  </p>
                  <Link
                    href="/docs/tutorials"
                    className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>

              <h2>What is VSTP?</h2>
              <p>
                VSTP (Vishu's Secure Transfer Protocol) is a general-purpose,
                binary, extensible application-layer protocol designed to be
                secure, fast, and easy to implement. It provides a clean
                abstraction over TCP and UDP transports with built-in security
                features.
              </p>

              <h3>Key Features</h3>
              <ul>
                <li>
                  <strong>Secure by Default:</strong> Built-in TLS 1.3 support
                  for TCP connections
                </li>
                <li>
                  <strong>Fast UDP Mode:</strong> Optimized for speed with UDP
                  transport
                </li>
                <li>
                  <strong>Binary Protocol:</strong> Efficient wire format with
                  minimal overhead
                </li>
                <li>
                  <strong>Extensible:</strong> Custom headers and payload types
                </li>
                <li>
                  <strong>Cross-Platform:</strong> Easy to implement in any
                  programming language
                </li>
                <li>
                  <strong>Reliable:</strong> Built-in error handling and
                  acknowledgment system
                </li>
              </ul>

              <h3>Use Cases</h3>
              <ul>
                <li>Real-time communication applications</li>
                <li>File transfer systems</li>
                <li>IoT device communication</li>
                <li>Gaming and streaming applications</li>
                <li>Microservices communication</li>
                <li>Custom protocol implementations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
