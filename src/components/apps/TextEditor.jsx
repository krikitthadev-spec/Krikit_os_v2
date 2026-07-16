import React, { useState } from 'react';
import '../../styles/apps/texteditor.css';

export default function TextEditor() {
  const [content, setContent] = useState(`#!/bin/bash
# Krikit OS Text Editor
# Edit your files here

echo "Welcome to Krikit OS v2.0"
`);

  const [fileName, setFileName] = useState('untitled.txt');

  const handleSave = () => {
    alert(`File "${fileName}" saved!`);
  };

  return (
    <div className="text-editor">
      <div className="editor-toolbar">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="editor-filename"
        />
        <button onClick={handleSave} className="editor-btn save-btn">
          💾 Save
        </button>
        <button className="editor-btn">📋 Copy</button>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="editor-textarea"
        spellCheck="false"
      />

      <div className="editor-status">
        Lines: {content.split('\n').length} | Characters: {content.length}
      </div>
    </div>
  );
}
