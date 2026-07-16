import React, { useState, useEffect } from 'react';
import '../../styles/apps/systemmonitor.css';

export default function SystemMonitor() {
  const [stats, setStats] = useState({
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 120,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.random() * 100,
        memory: 50 + Math.random() * 30,
        disk: 75 + Math.random() * 10,
        network: 100 + Math.random() * 50,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const StatBox = ({ label, value, unit, color }) => (
    <div className="stat-box">
      <div className="stat-label">{label}</div>
      <div className="stat-bar-container">
        <div
          className="stat-bar"
          style={{
            width: `${Math.min(value, 100)}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <div className="stat-value">
        {value.toFixed(1)}
        {unit}
      </div>
    </div>
  );

  return (
    <div className="system-monitor">
      <div className="monitor-header">System Information</div>
      <div className="monitor-content">
        <StatBox
          label="CPU Usage"
          value={stats.cpu}
          unit="%"
          color="#00FF00"
        />
        <StatBox
          label="Memory"
          value={stats.memory}
          unit="%"
          color="#00FFFF"
        />
        <StatBox
          label="Disk"
          value={stats.disk}
          unit="%"
          color="#FF00FF"
        />
        <StatBox
          label="Network"
          value={stats.network}
          unit=" Mbps"
          color="#FFFF00"
        />
      </div>
      <div className="monitor-info">
        <p>Krikit OS v2.0</p>
        <p>Kernel: 2.0</p>
        <p>Uptime: 12h 45m</p>
      </div>
    </div>
  );
}
