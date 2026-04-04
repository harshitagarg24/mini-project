import { Link } from 'react-router-dom';
import './Dashboard.css';

const statusColors = {
  ok: 'success',
  error: 'danger',
  client_error: 'warning',
  server_error: 'danger'
};

function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  return `${(ms / 60000).toFixed(2)}m`;
}

export default function RecentTraces({ traces, loading }) {
  if (loading) {
    return <div className="loading">Loading traces...</div>;
  }

  if (traces.length === 0) {
    return <div className="empty-state">No traces found</div>;
  }

  return (
    <div className="recent-traces">
      <table className="traces-table">
        <thead>
          <tr>
            <th>Trace ID</th>
            <th>Operation</th>
            <th>Service</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {traces.slice(0, 20).map((trace) => (
            <tr key={trace.spanId}>
              <td className="trace-id">
                <code>{trace.traceId?.substring(0, 8)}...</code>
              </td>
              <td>{trace.operationName}</td>
              <td>{trace.serviceName}</td>
              <td className="duration">
                {formatDuration(trace.duration)}
              </td>
              <td>
                <span className={`status-badge ${statusColors[trace.status]}`}>
                  {trace.status}
                </span>
              </td>
              <td className="timestamp">
                {new Date(trace.startTime).toLocaleString()}
              </td>
              <td>
                <Link to={`/trace/${trace.traceId}`} className="view-link">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
