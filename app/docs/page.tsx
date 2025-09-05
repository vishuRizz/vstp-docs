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
                    href="/docs/migration"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Migration Guide
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
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                VSTP Documentation
              </h1>
              <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 dark:text-green-100 dark:bg-green-800 rounded-full">
                v0.2.1
              </span>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Welcome to VSTP (Vishu's Secure Transfer Protocol) - a modern,
                high-performance protocol designed for secure and efficient data
                transfer. Version 0.2.1 introduces a simplified API that makes
                it easier than ever to build robust networked applications.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    🚀 Quick Start
                  </h3>
                  <p className="text-blue-700 dark:text-blue-200 mb-4">
                    Get started in minutes with our new simplified API. Perfect
                    for both beginners and experienced developers.
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
                    Deep dive into the protocol specification, wire format, and
                    security features.
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
                    Comprehensive API documentation with examples and best
                    practices.
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
                    Step-by-step tutorials and real-world examples using the new
                    simplified API.
                  </p>
                  <Link
                    href="/docs/tutorials"
                    className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>

              <h2>What's New in v0.2.1?</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <div>
                      <strong>Simplified High-Level API</strong>
                      <p className="text-gray-600 dark:text-gray-300">
                        New easy-to-use API with automatic serialization,
                        deserialization, and error handling.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <div>
                      <strong>Unified TCP/UDP Interface</strong>
                      <p className="text-gray-600 dark:text-gray-300">
                        Same API for both TCP and UDP, making it easy to switch
                        between transport protocols.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <div>
                      <strong>Improved Error Handling</strong>
                      <p className="text-gray-600 dark:text-gray-300">
                        Better error messages, automatic recovery, and timeout
                        handling.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <div>
                      <strong>Message Routing</strong>
                      <p className="text-gray-600 dark:text-gray-300">
                        Built-in support for message routing and handling in
                        servers.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <h2>Key Features</h2>
              <ul>
                <li>
                  <strong>Type-Safe Communication:</strong> Automatic
                  serialization/deserialization of Rust types
                </li>
                <li>
                  <strong>Secure by Default:</strong> Built-in TLS 1.3 support
                  for TCP connections
                </li>
                <li>
                  <strong>High Performance:</strong> Optimized UDP mode for
                  real-time applications
                </li>
                <li>
                  <strong>Reliable:</strong> Automatic retries, acknowledgments,
                  and error recovery
                </li>
                <li>
                  <strong>Easy to Use:</strong> Simple, intuitive API with
                  excellent documentation
                </li>
                <li>
                  <strong>Flexible:</strong> Support for both structured and raw
                  message formats
                </li>
              </ul>

              <h2>Common Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2">
                    Real-time Communication
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    <li>Chat applications</li>
                    <li>Game networking</li>
                    <li>Live streaming</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2">Data Transfer</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    <li>File transfer</li>
                    <li>Backup systems</li>
                    <li>Content distribution</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2">IoT & Edge Computing</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    <li>Device communication</li>
                    <li>Sensor networks</li>
                    <li>Remote monitoring</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2">Microservices</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    <li>Service communication</li>
                    <li>Event streaming</li>
                    <li>Load balancing</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-blue-700 dark:text-blue-200 mb-4">
                  Check out our quick start guide to begin building with VSTP in
                  minutes.
                </p>
                <Link
                  href="/docs/getting-started"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Quick Start Guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
