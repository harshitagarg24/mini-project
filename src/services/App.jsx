<<<<<<< HEAD
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
=======
import { useState } from 'react';
import './App.css';

import DelayTest from './services/DelayTest';
import StatusTest from './services/StatusTest';
import ProxyTest from './services/ProxyTest';
import Logs from './services/Logs';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app">
      <nav className="app-nav">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === 'delay' ? 'active' : ''} 
          onClick={() => setActiveTab('delay')}
        >
          Delay Test
        </button>
        <button 
          className={activeTab === 'status' ? 'active' : ''} 
          onClick={() => setActiveTab('status')}
        >
          Status Test
        </button>
        <button 
          className={activeTab === 'proxy' ? 'active' : ''} 
          onClick={() => setActiveTab('proxy')}
        >
          Proxy Test
        </button>
        <button 
          className={activeTab === 'logs' ? 'active' : ''} 
          onClick={() => setActiveTab('logs')}
        >
          Logs
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'dashboard' && (
          <div className="dashboard-welcome">
            <h1>Distributed Tracing System</h1>
            <p>Select a tab to start testing or view logs.</p>
            <ul>
              <li><strong>Delay Test:</strong> Simulate delayed requests to test sampling</li>
              <li><strong>Status Test:</strong> Test error handling and error trace collection</li>
              <li><strong>Proxy Test:</strong> Test trace context propagation across services</li>
              <li><strong>Logs:</strong> View slow and error traces</li>
            </ul>
          </div>
        )}
        {activeTab === 'delay' && <DelayTest />}
        {activeTab === 'status' && <StatusTest />}
        {activeTab === 'proxy' && <ProxyTest />}
        {activeTab === 'logs' && <Logs />}
      </main>
>>>>>>> fa9b19fe (Added my project code)
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> fa9b19fe (Added my project code)
