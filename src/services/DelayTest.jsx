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