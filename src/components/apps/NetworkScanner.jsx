import React, { useState } from 'react';
import '../../styles/apps/networkscanner.css';

export default function NetworkScanner() {
  const [scanTarget, setScanTarget] = useState('192.168.1.0/24');
  const [results, setResults] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setResults([]);

    setTimeout(() => {
      const mockResults = [
        {
          ip: '192.168.1.1',
          hostname: 'gateway.local',
          status: 'up',
          ports: ['22', '80', '443'],
        },
        {
          ip: '192.168.1.5',
          hostname: 'workstation',
          status: 'up',
          ports: ['22', '3306'],
        },
        {
          ip: '192.168.1.100',
          hostname: 'server',
          status: 'up',
          ports: ['22', '80', '443', '3000'],
        },
        {
          ip: '192.168.1.150',
          hostname: 'unknown.local',
          status: 'down',
          ports: [],
        },
      ];

      setResults(mockResults);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="network-scanner">
      <div className="scanner-header">Network Scanner</div>

      <div className="scanner-input-area">
        <label>Target Network:</label>
        <input
          type="text"
          value={scanTarget}
          onChange={(e) => setScanTarget(e.target.value)}
          placeholder="Enter IP or CIDR range"
          className="scanner-input"
        />
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="scanner-btn"
        >
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </button>
      </div>

      <div className="scanner-results">
        {results.length === 0 ? (
          <div className="scanner-empty">
            {isScanning ? 'Scanning network...' : 'No results. Start a scan.'}
          </div>
        ) : (
          <div className="results-table">
            <div className="results-header">
              <div className="col-ip">IP Address</div>
              <div className="col-hostname">Hostname</div>
              <div className="col-status">Status</div>
              <div className="col-ports">Open Ports</div>
            </div>
            {results.map((result) => (
              <div key={result.ip} className="results-row">
                <div className="col-ip">{result.ip}</div>
                <div className="col-hostname">{result.hostname}</div>
                <div className={`col-status ${result.status}`}>
                  {result.status}
                </div>
                <div className="col-ports">
                  {result.ports.length > 0
                    ? result.ports.join(', ')
                    : 'N/A'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
