<<<<<<< HEAD
import { useEffect, useState } from "react";
import { getLogs } from "../services/api";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await getLogs();
    setLogs(res.data);
  };

  return (
    <div>
      <h3>Trace Logs</h3>
      <button onClick={fetchLogs}>Refresh</button>

      {logs.map((log, i) => (
        <div key={i} style={{ border: "1px solid gray", margin: "10px" }}>
          <p><b>Trace ID:</b> {log.traceId}</p>
          <p><b>Status:</b> {log.status}</p>
          <p><b>Time:</b> {log.duration}</p>
        </div>
      ))}
=======
import { useState, useEffect } from 'react';
import { getSlowTraces, getErrorTraces } from '../services/api';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('slow');
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      let res;
      if (activeTab === 'slow') {
        res = await getSlowTraces(1000);
      } else {
        res = await getErrorTraces();
      }
      setLogs(res.traces || []);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [activeTab]);

  const formatDuration = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="logs-component">
      <h3>Trace Logs</h3>
      
      <div className="logs-tabs">
        <button 
          className={activeTab === 'slow' ? 'active' : ''} 
          onClick={() => setActiveTab('slow')}
        >
          Slow Traces
        </button>
        <button 
          className={activeTab === 'error' ? 'active' : ''} 
          onClick={() => setActiveTab('error')}
        >
          Error Traces
        </button>
      </div>

      <button onClick={fetchLogs} className="refresh-btn">
        Refresh
      </button>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : logs.length === 0 ? (
        <div className="empty-state">No traces found</div>
      ) : (
        <div className="logs-list">
          {logs.map((log, i) => (
            <div key={i} className={`log-item ${log.status}`}>
              <div className="log-header">
                <span className="trace-id">Trace: {log.traceId?.substring(0, 8)}...</span>
                <span className={`status-badge ${log.status}`}>{log.status}</span>
              </div>
              <div className="log-details">
                <span><b>Operation:</b> {log.operationName}</span>
                <span><b>Duration:</b> {formatDuration(log.duration)}</span>
                <span><b>Service:</b> {log.serviceName}</span>
                <span><b>PID:</b> {log.processId}</span>
              </div>
              {log.errorMessage && (
                <div className="error-message">{log.errorMessage}</div>
              )}
            </div>
          ))}
        </div>
      )}
>>>>>>> fa9b19fe (Added my project code)
    </div>
  );
}
