import React, { useState } from 'react';
import '../../styles/apps/filemanager.css';

const FILES_SYSTEM = {
  '/home/user': {
    name: 'user',
    type: 'folder',
    children: {
      'Documents': { name: 'Documents', type: 'folder', children: {} },
      'Downloads': { name: 'Downloads', type: 'folder', children: {} },
      'Desktop': { name: 'Desktop', type: 'folder', children: {} },
      'notes.txt': { name: 'notes.txt', type: 'file' },
      'script.sh': { name: 'script.sh', type: 'file' },
    },
  },
};

export default function FileManager() {
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [selected, setSelected] = useState(null);

  const getCurrentItems = () => {
    const items = FILES_SYSTEM[currentPath]?.children || {};
    return Object.values(items);
  };

  const handleDoubleClick = (item) => {
    if (item.type === 'folder') {
      setCurrentPath(`${currentPath}/${item.name}`);
      setSelected(null);
    }
  };

  const handleBack = () => {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length > 2) {
      const newPath = '/' + parts.slice(0, -1).join('/');
      setCurrentPath(newPath);
      setSelected(null);
    }
  };

  const items = getCurrentItems();

  return (
    <div className="file-manager">
      <div className="fm-toolbar">
        <button onClick={handleBack} className="fm-btn">
          ← Back
        </button>
        <div className="fm-path">{currentPath}</div>
        <button className="fm-btn">🔄</button>
      </div>

      <div className="fm-content">
        {items.length === 0 ? (
          <div className="fm-empty">No files</div>
        ) : (
          <div className="fm-grid">
            {items.map((item) => (
              <div
                key={item.name}
                className={`fm-item ${selected === item.name ? 'selected' : ''}`}
                onClick={() => setSelected(item.name)}
                onDoubleClick={() => handleDoubleClick(item)}
              >
                <div className="fm-icon">
                  {item.type === 'folder' ? '📁' : '📄'}
                </div>
                <div className="fm-name">{item.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fm-status">
        {selected && <span>{selected}</span>}
      </div>
    </div>
  );
}
