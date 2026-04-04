<<<<<<< HEAD
import { useState } from "react";
import { delayTest } from "../services/api";

export default function DelayTest() {
  const [sec, setSec] = useState("");

  const handleTest = async () => {
    await delayTest(sec);
    alert("Delay executed!");
  };

  return (
    <div>
      <h3>Simulate Delay</h3>
      <input onChange={(e) => setSec(e.target.value)} placeholder="Seconds" />
      <button onClick={handleTest}>Run</button>
    </div>
  );
}
=======
import { useState } from 'react';
import { simulateDelay } from '../services/api';

export default function DelayTest() {
  const [seconds, setSeconds] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTest = async () => {
    if (!seconds || isNaN(seconds)) {
      alert('Please enter a valid number of seconds');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await simulateDelay(parseInt(seconds));
      setResult({
        success: true,
        message: `Delay of ${seconds} seconds completed`,
        traceId: response.traceId
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="test-component">
      <h3>Simulate Delay</h3>
      <p>Test how the system handles delayed requests</p>

      <div className="test-input">
        <label>
          Delay (seconds):
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            min="0"
            max="30"
            disabled={loading}
          />
        </label>
      </div>

      <button 
        onClick={handleTest} 
        disabled={loading}
        className="test-button"
      >
        {loading ? 'Running...' : 'Run Test'}
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
