import Logs from "./components/Logs";
import DelayTest from "./components/DelayTest";
import StatusTest from "./components/StatusTest";
import ProxyTest from "./components/ProxyTest";

function App() {
  return (
    <div>
      <h1>Distributed Tracing Dashboard</h1>
      <DelayTest />
      <StatusTest />
      <ProxyTest />
      <Logs />
    </div>
  );
}

export default App;