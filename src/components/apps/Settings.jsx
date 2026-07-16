import React, { useState } from 'react';
import '../../styles/apps/settings.css';

export default function Settings() {
  const [theme, setTheme] = useState('dark');
  const [volume, setVolume] = useState(70);
  const [brightness, setBrightness] = useState(80);

  return (
    <div className="settings">
      <div className="settings-header">Settings</div>

      <div className="settings-content">
        <div className="settings-section">
          <h3>Display</h3>
          <div className="setting-item">
            <label>Theme:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Brightness:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
            />
            <span>{brightness}%</span>
          </div>
        </div>

        <div className="settings-section">
          <h3>Audio</h3>
          <div className="setting-item">
            <label>Volume:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
            <span>{volume}%</span>
          </div>
        </div>

        <div className="settings-section">
          <h3>System</h3>
          <div className="setting-item">
            <label>OS Name:</label>
            <span>Krikit OS v2.0</span>
          </div>
          <div className="setting-item">
            <label>Kernel:</label>
            <span>2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
