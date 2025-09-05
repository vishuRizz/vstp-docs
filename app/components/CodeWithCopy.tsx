"use client";

import React from "react";
import CopyButton from "./CopyButton";

interface CodeWithCopyProps {
  children: string;
  className?: string;
}

export default function CodeWithCopy({
  children,
  className = "",
}: CodeWithCopyProps) {
  return (
    <div className="code-block-container">
      <pre className={`${className} pr-12`}>
        <code>{children}</code>
      </pre>
      <CopyButton text={children} />
    </div>
  );
}
