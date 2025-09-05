"use client";

import { useEffect } from "react";

export default function GlobalCopyHandler() {
  useEffect(() => {
    const addCopyButtons = () => {
      // Find all pre elements that don't already have copy functionality
      const preElements = document.querySelectorAll(
        "pre:not([data-copy-added])"
      );

      preElements.forEach((pre) => {
        // Mark as processed
        pre.setAttribute("data-copy-added", "true");

        // Create copy button
        const copyButton = document.createElement("button");
        copyButton.className = "global-copy-button";
        copyButton.innerHTML = `
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        `;
        copyButton.title = "Copy code";

        // Add click handler
        copyButton.addEventListener("click", async () => {
          const codeElement = pre.querySelector("code");
          const text = codeElement
            ? codeElement.textContent || ""
            : pre.textContent || "";

          try {
            await navigator.clipboard.writeText(text);

            // Show success feedback
            const originalHTML = copyButton.innerHTML;
            copyButton.innerHTML = `
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            `;
            copyButton.title = "Copied!";

            // Reset after 2 seconds
            setTimeout(() => {
              copyButton.innerHTML = originalHTML;
              copyButton.title = "Copy code";
            }, 2000);
          } catch (err) {
            console.error("Failed to copy text: ", err);
          }
        });

        // Append button to pre element
        pre.appendChild(copyButton);
      });
    };

    // Add copy buttons on initial load
    addCopyButtons();

    // Add copy buttons when new content is added (for dynamic content)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          addCopyButtons();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
