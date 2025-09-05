import React from "react";
import Link from "next/link";

export default function ProtocolSpec() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Protocol Specification
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
                    href="#wire-format"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Wire Format
                  </a>
                </li>
                <li>
                  <a
                    href="#frame-types"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Frame Types
                  </a>
                </li>
                <li>
                  <a
                    href="#flags"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Flags
                  </a>
                </li>
                <li>
                  <a
                    href="#headers"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Headers
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
                    href="#transport-modes"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Transport Modes
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                VSTP Protocol Specification
              </h1>
              <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 dark:text-blue-100 dark:bg-blue-800 rounded-full">
                v0.2.1
              </span>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <section id="overview">
                <h2>Protocol Overview</h2>
                <p>
                  VSTP (Vishu's Secure Transfer Protocol) is a binary,
                  application-layer protocol designed for secure and efficient
                  data transfer. It provides a clean abstraction over TCP and
                  UDP transports with built-in security features.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-6">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                    🎯 Design Goals
                  </h3>
                  <ul className="text-blue-700 dark:text-blue-200 space-y-2">
                    <li>
                      • <strong>Security:</strong> Built-in TLS 1.3 support for
                      TCP
                    </li>
                    <li>
                      • <strong>Performance:</strong> Optimized for both TCP and
                      UDP
                    </li>
                    <li>
                      • <strong>Simplicity:</strong> Easy to implement and use
                    </li>
                    <li>
                      • <strong>Extensibility:</strong> Custom headers and
                      payload types
                    </li>
                    <li>
                      • <strong>Reliability:</strong> Built-in error handling
                      and acknowledgments
                    </li>
                  </ul>
                </div>
              </section>

              <section id="wire-format">
                <h2>Wire Format</h2>
                <p>
                  VSTP frames have a fixed header structure followed by
                  variable-length header and payload sections:
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 dark:border-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          Field
                        </th>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          Size
                        </th>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-2 font-mono">MAGIC</td>
                        <td className="px-4 py-2">2 bytes</td>
                        <td className="px-4 py-2">
                          Protocol identifier (0x56 0x54)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">VER</td>
                        <td className="px-4 py-2">1 byte</td>
                        <td className="px-4 py-2">Protocol version (0x01)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">TYPE</td>
                        <td className="px-4 py-2">1 byte</td>
                        <td className="px-4 py-2">
                          Frame type (see Frame Types)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">FLAGS</td>
                        <td className="px-4 py-2">1 byte</td>
                        <td className="px-4 py-2">Bit flags (see Flags)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">HDR_LEN</td>
                        <td className="px-4 py-2">2 bytes</td>
                        <td className="px-4 py-2">
                          Header section length (little-endian)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">PAY_LEN</td>
                        <td className="px-4 py-2">4 bytes</td>
                        <td className="px-4 py-2">
                          Payload length (big-endian)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">HEADERS</td>
                        <td className="px-4 py-2">Variable</td>
                        <td className="px-4 py-2">
                          Header section (see Headers)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">PAYLOAD</td>
                        <td className="px-4 py-2">Variable</td>
                        <td className="px-4 py-2">Payload data</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">CRC32</td>
                        <td className="px-4 py-2">4 bytes</td>
                        <td className="px-4 py-2">Checksum (optional)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 my-6">
                  <h3 className="font-semibold mb-2">📊 Frame Layout</h3>
                  <pre className="text-sm">
                    <code>{`┌─────────┬─────┬──────┬───────┬─────────┬─────────┬─────────┬─────────┬──────┐
│ MAGIC   │ VER │ TYPE │ FLAGS │ HDR_LEN │ PAY_LEN │ HEADERS │ PAYLOAD │ CRC32 │
│ 2 bytes │ 1B  │ 1B   │ 1B    │ 2B LE   │ 4B BE   │ var     │ var     │ 4B    │
└─────────┴─────┴──────┴───────┴─────────┴─────────┴─────────┴─────────┴──────┘`}</code>
                  </pre>
                </div>
              </section>

              <section id="frame-types">
                <h2>Frame Types</h2>
                <p>VSTP defines several frame types for different purposes:</p>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 dark:border-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          Type
                        </th>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          Direction
                        </th>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-2 font-mono">0x01</td>
                        <td className="px-4 py-2">HELLO</td>
                        <td className="px-4 py-2">Client → Server</td>
                        <td className="px-4 py-2">Start of session</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">0x02</td>
                        <td className="px-4 py-2">WELCOME</td>
                        <td className="px-4 py-2">Server → Client</td>
                        <td className="px-4 py-2">Server acceptance</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">0x03</td>
                        <td className="px-4 py-2">DATA</td>
                        <td className="px-4 py-2">Both</td>
                        <td className="px-4 py-2">Application data</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">0x04</td>
                        <td className="px-4 py-2">PING</td>
                        <td className="px-4 py-2">Both</td>
                        <td className="px-4 py-2">Keepalive request</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">0x05</td>
                        <td className="px-4 py-2">PONG</td>
                        <td className="px-4 py-2">Both</td>
                        <td className="px-4 py-2">Keepalive response</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">0x06</td>
                        <td className="px-4 py-2">BYE</td>
                        <td className="px-4 py-2">Both</td>
                        <td className="px-4 py-2">Graceful close</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">0x07</td>
                        <td className="px-4 py-2">ACK</td>
                        <td className="px-4 py-2">Both</td>
                        <td className="px-4 py-2">Acknowledgement</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">0x08</td>
                        <td className="px-4 py-2">ERR</td>
                        <td className="px-4 py-2">Both</td>
                        <td className="px-4 py-2">Error frame</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="flags">
                <h2>Flags</h2>
                <p>VSTP uses bit flags to indicate frame properties:</p>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 dark:border-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          Bit
                        </th>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          Flag
                        </th>
                        <th className="px-4 py-2 text-left border-b border-gray-300 dark:border-gray-600">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-2 font-mono">0x01</td>
                        <td className="px-4 py-2">REQ_ACK</td>
                        <td className="px-4 py-2">Request acknowledgment</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">0x02</td>
                        <td className="px-4 py-2">CRC</td>
                        <td className="px-4 py-2">Include CRC32 checksum</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">0x04</td>
                        <td className="px-4 py-2">FRAG</td>
                        <td className="px-4 py-2">Fragmented frame</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">0x08</td>
                        <td className="px-4 py-2">COMP</td>
                        <td className="px-4 py-2">Compressed payload</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="headers">
                <h2>Headers</h2>
                <p>
                  VSTP supports custom headers in a simple key-value format:
                </p>

                <pre className="bg-gray-900 p-4 rounded-lg">
                  <code>{`// Header format
struct Header {
    key_len: u16,        // Key length (little-endian)
    key: [u8],           // Key bytes
    value_len: u16,      // Value length (little-endian)
    value: [u8],         // Value bytes
}

// Example headers
"content-type" -> "application/json"
"session-id" -> "abc123"
"priority" -> "high"`}</code>
                </pre>
              </section>

              <section id="security">
                <h2>Security</h2>
                <p>VSTP provides security through multiple mechanisms:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
                      🔒 TCP Security
                    </h3>
                    <ul className="text-green-700 dark:text-green-200 space-y-2">
                      <li>• TLS 1.3 encryption</li>
                      <li>• Perfect forward secrecy</li>
                      <li>• Certificate validation</li>
                      <li>• Secure key exchange</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                      🛡️ UDP Security
                    </h3>
                    <ul className="text-blue-700 dark:text-blue-200 space-y-2">
                      <li>• Application-level encryption</li>
                      <li>• Message authentication</li>
                      <li>• Replay protection</li>
                      <li>• Integrity checking</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="transport-modes">
                <h2>Transport Modes</h2>
                <p>
                  VSTP supports both TCP and UDP transports with different
                  characteristics:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
                      🌐 TCP Mode
                    </h3>
                    <ul className="text-purple-700 dark:text-purple-200 space-y-2">
                      <li>• Reliable delivery</li>
                      <li>• Ordered messages</li>
                      <li>• Built-in TLS 1.3</li>
                      <li>• Connection-oriented</li>
                      <li>• Automatic retransmission</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
                      ⚡ UDP Mode
                    </h3>
                    <ul className="text-orange-700 dark:text-orange-200 space-y-2">
                      <li>• Low latency</li>
                      <li>• High throughput</li>
                      <li>• Connectionless</li>
                      <li>• Fragmentation support</li>
                      <li>• Custom reliability</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Implementation Notes
                </h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>
                    • All multi-byte integers use little-endian byte order
                    except PAY_LEN (big-endian)
                  </li>
                  <li>
                    • Frame parsing should validate MAGIC and VER fields first
                  </li>
                  <li>
                    • CRC32 is calculated over HEADERS + PAYLOAD when CRC flag
                    is set
                  </li>
                  <li>
                    • Fragmented frames should be reassembled before processing
                  </li>
                  <li>
                    • Timeouts should be implemented for all network operations
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
