<<<<<<< HEAD
import { useState } from "react";
import { statusTest } from "../services/api";

export default function StatusTest() {
  const [code, setCode] = useState("");

  const handleTest = async () => {
    try {
      await statusTest(code);
    } catch (err) {
      alert(`Status: ${code}`);
=======
import { useState } from 'react';
import { simulateStatus } from '../services/api';

export default function StatusTest() {
  const [statusCode, setStatusCode] = useState('200');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTest = async () => {
    const code = parseInt(statusCode);
    if (isNaN(code)) {
      alert('Please enter a valid status code');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await simulateStatus(code);
      setResult({
        success: code < 400,
        message: `Status code: ${code}`,
        traceId: response.traceId
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.message
      });
    } finally {
      setLoading(false);
>>>>>>> fa9b19fe (Added my project code)
    }
  };

  return (
<<<<<<< HEAD
    <div>
      <h3>Force Status Code</h3>
      <input onChange={(e) => setCode(e.target.value)} placeholder="Enter code" />
      <button onClick={handleTest}>Test</button>
    </div>
  );
}
=======
    <div className="test-component">
      <h3>Force Status Code</h3>
      <p>Test error handling with different status codes</p>

      <div className="test-input">
        <label>
          Status Code:
          <input
            type="number"
            value={statusCode}
            onChange={(e) => setStatusCode(e.target.value)}
            min="100"
            min="600"
            disabled={loading}
          />
        </label>
      </div>

      <button 
        onClick={handleTest} 
        disabled={loading}
        className="test-button"
      >
        {loading ? 'Testing...' : 'Test'}
      </button>

      {result && (
        <div className={`test-result ${result.success ? 'success' : 'error'}`}>
          <p>{result.message}</p>
          {result.traceId && (
            <p className="trace-id">
              Trace ID: <code>{result.traceId}</code>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
>>>>>>> fa9b19fe (Added my project code)
