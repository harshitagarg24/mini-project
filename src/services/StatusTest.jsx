import { useState } from "react";
import { statusTest } from "../services/api";

export default function StatusTest() {
  const [code, setCode] = useState("");

  const handleTest = async () => {
    try {
      await statusTest(code);
    } catch (err) {
      alert(`Status: ${code}`);
    }
  };

  return (
    <div>
      <h3>Force Status Code</h3>
      <input onChange={(e) => setCode(e.target.value)} placeholder="Enter code" />
      <button onClick={handleTest}>Test</button>
    </div>
  );
}