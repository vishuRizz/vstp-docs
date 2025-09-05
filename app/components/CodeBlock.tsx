"use client";

import React from "react";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({
  children,
  className = "",
}: CodeBlockProps) {
  // Extract text content from children
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") {
      return node;
    }
    if (typeof node === "number") {
      return node.toString();
    }
    if (React.isValidElement(node)) {
      if (
        node.props &&
        typeof node.props === "object" &&
        "children" in node.props
      ) {
        return getTextContent((node.props as any).children);
      }
    }
    if (Array.isArray(node)) {
      return node.map(getTextContent).join("");
    }
    return "";
  };

  const textContent = getTextContent(children);

  return (
    <div className="code-block-container">
      <pre className={`${className} pr-12`}>
        <code>{children}</code>
      </pre>
      <CopyButton text={textContent} />
    </div>
  );
}
