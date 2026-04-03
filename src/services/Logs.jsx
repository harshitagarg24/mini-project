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
    </div>
  );
}
