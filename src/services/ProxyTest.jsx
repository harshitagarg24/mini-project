import { useState } from "react";
import { proxyTest } from "../services/api";

export default function ProxyTest() {
  const [url, setUrl] = useState("");

  const handleTest = async () => {
    await proxyTest(url);
    alert("Request Sent!");
  };

  return (
    <div>
      <h3>Proxy Test</h3>
      <input onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
      <button onClick={handleTest}>Send</button>
    </div>
  );
}