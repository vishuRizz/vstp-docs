# Copy Feature for Code Blocks

This documentation now includes a copy feature for all code blocks. Here's how to use it:

## Components Created

### 1. `CopyButton` Component

- Located: `app/components/CopyButton.tsx`
- Provides a copy button with hover effects and success feedback
- Uses the `useCopyToClipboard` hook for functionality

### 2. `CodeWithCopy` Component

- Located: `app/components/CodeWithCopy.tsx`
- Simple wrapper for code blocks with copy functionality
- Use this for new code blocks

### 3. `CodeBlock` Component

- Located: `app/components/CodeBlock.tsx`
- More complex component that can extract text from React children
- Use this for dynamic content

### 4. `useCopyToClipboard` Hook

- Located: `app/hooks/useCopyToClipboard.ts`
- Custom hook for clipboard functionality
- Provides `copied` state and `copyToClipboard` function

## How to Use

### For New Code Blocks

Replace existing `<pre>` tags with the `CodeWithCopy` component:

```tsx
// Old way
<pre className="bg-gray-900 p-4 rounded-lg">
  <code>{`your code here`}</code>
</pre>

// New way
<CodeWithCopy className="bg-gray-900 p-4 rounded-lg">
  {`your code here`}
</CodeWithCopy>
```

### For Dynamic Content

Use the `CodeBlock` component for React children:

```tsx
<CodeBlock className="bg-gray-900 p-4 rounded-lg">
  {dynamicCodeContent}
</CodeBlock>
```

## Features

- ✅ **Hover to Show**: Copy button appears on hover
- ✅ **Visual Feedback**: Shows checkmark when copied
- ✅ **Auto Hide**: Button disappears after 2 seconds
- ✅ **Accessible**: Proper ARIA labels and keyboard support
- ✅ **Responsive**: Works on all screen sizes
- ✅ **Dark Mode**: Styled for both light and dark themes

## Styling

The copy button is styled with CSS classes:

- `.code-block-container`: Container for the code block
- `.copy-button`: The copy button itself
- Hover effects and transitions are included

## Browser Support

- Modern browsers with Clipboard API support
- Graceful fallback for older browsers
- No external dependencies required
