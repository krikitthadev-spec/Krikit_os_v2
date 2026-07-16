import React, { useState, useRef, useEffect } from 'react';
import '../../styles/apps/terminal.css';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', text: 'Krikit OS v2.0 - Terminal Emulator' },
    { type: 'system', text: 'Type "help" for available commands' },
    { type: 'system', text: '' },
  ]);
  const [currentDir, setCurrentDir] = useState('/home/user');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const newOutput = [...output];

    newOutput.push({
      type: 'input',
      text: `${currentDir}$ ${trimmedCmd}`,
    });

    if (trimmedCmd === 'help') {
      newOutput.push({
        type: 'output',
        text: `Available commands:
  help      - Show this help message
  clear     - Clear terminal
  whoami    - Display current user
  pwd       - Print working directory
  ls        - List files
  date      - Show current date/time
  echo      - Echo text
  neofetch  - System information`,
      });
    } else if (trimmedCmd === 'clear') {
      setOutput([]);
      return;
    } else if (trimmedCmd === 'whoami') {
      newOutput.push({
        type: 'output',
        text: 'root',
      });
    } else if (trimmedCmd === 'pwd') {
      newOutput.push({
        type: 'output',
        text: currentDir,
      });
    } else if (trimmedCmd === 'ls') {
      newOutput.push({
        type: 'output',
        text: 'Documents  Downloads  Desktop  Pictures  Videos',
      });
    } else if (trimmedCmd === 'date') {
      newOutput.push({
        type: 'output',
        text: new Date().toString(),
      });
    } else if (trimmedCmd === 'neofetch') {
      newOutput.push({
        type: 'output',
        text: `
     ___________
    /           \\
   / Krikit OS  \\
  /   v2.0      \\
 /______________\\
        
OS: Krikit Linux x86_64
Kernel: Krikit 2.0
Shell: bash
RAM: 16GB
CPU: Quantum Processor`,
      });
    } else if (trimmedCmd.startsWith('echo ')) {
      const echoText = trimmedCmd.slice(5);
      newOutput.push({
        type: 'output',
        text: echoText,
      });
    } else if (trimmedCmd !== '') {
      newOutput.push({
        type: 'error',
        text: `Command not found: ${trimmedCmd}`,
      });
    }

    setOutput(newOutput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {output.map((line, idx) => (
          <div key={idx} className={`terminal-line ${line.type}`}>
            {line.text.split('\n').map((t, i) => (
              <div key={i}>{t}</div>
            ))}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="terminal-input-line">
        <span className="terminal-prompt">{currentDir}$ </span>
        <input
          className="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      </div>
    </div>
  );
}
