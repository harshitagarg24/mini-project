import express from 'express';

const router = express.Router();

const inMemoryTraces = [];

router.get('/trace/:traceId', (req, res) => {
  try {
    const trace = inMemoryTraces.filter(t => t.traceId === req.params.traceId);
    res.json({ trace });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/service/:serviceName', (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();
    
    const spans = inMemoryTraces.filter(t => 
      t.serviceName === req.params.serviceName &&
      new Date(t.startTime) >= start &&
      new Date(t.startTime) <= end
    ).slice(0, 1000);
    
    res.json({ spans });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/slow', (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 1000;
    const traces = inMemoryTraces
      .filter(t => t.duration > threshold && t.status === 'ok')
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 100);
    res.json({ traces });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/errors', (req, res) => {
  try {
    const traces = inMemoryTraces
      .filter(t => t.status !== 'ok')
      .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
      .slice(0, 100);
    res.json({ traces });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/process/:pid', (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const spans = inMemoryTraces.filter(t => t.processId === pid);
    res.json({ processId: pid, spans });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stats', (req, res) => {
  try {
    const { serviceName, startDate, endDate } = req.query;
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();
    
    const spans = inMemoryTraces.filter(t => 
      (!serviceName || t.serviceName === serviceName) &&
      new Date(t.startTime) >= start &&
      new Date(t.startTime) <= end
    );
    
    if (spans.length === 0) {
      res.json({ stats: {} });
      return;
    }
    
    const durations = spans.map(s => s.duration).sort((a, b) => a - b);
    const totalTraces = spans.length;
    const avgDuration = durations.reduce((a, b) => a + b, 0) / totalTraces;
    const errorCount = spans.filter(s => s.status !== 'ok').length;
    const p50 = durations[Math.floor(totalTraces * 0.5)] || 0;
    const p95 = durations[Math.floor(totalTraces * 0.95)] || 0;
    const p99 = durations[Math.floor(totalTraces * 0.99)] || 0;
    
    res.json({ 
      stats: {
        totalTraces,
        avgDuration,
        maxDuration: Math.max(...durations),
        minDuration: Math.min(...durations),
        errorCount,
        p50Duration: p50,
        p95Duration: p95,
        p99Duration: p99
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/test/delay', (req, res) => {
  const { seconds } = req.body;
  const delayMs = (seconds || 1) * 1000;
  const traceId = req.traceContext?.traceId || `trace-${Date.now()}`;
  const spanId = `span-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  setTimeout(() => {
    const trace = {
      traceId,
      spanId,
      parentSpanId: null,
      serviceName: process.env.SERVICE_NAME || 'distributed-tracing-service',
      processId: process.pid,
      operationName: 'test.delay',
      startTime: new Date(Date.now() - delayMs),
      endTime: new Date(),
      duration: delayMs,
      tags: [{ key: 'test.type', value: 'delay' }, { key: 'delay.seconds', value: seconds }],
      logs: [],
      status: 'ok',
      samplingDecision: true,
      samplingReason: 'slow'
    };
    inMemoryTraces.push(trace);
    
    res.json({
      message: `Delayed for ${seconds} seconds`,
      traceId,
      spanId,
      duration: delayMs
    });
  }, delayMs);
});

router.post('/test/status', (req, res) => {
  const { statusCode = 200 } = req.body;
  const traceId = req.traceContext?.traceId || `trace-${Date.now()}`;
  const spanId = `span-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const status = statusCode >= 400 ? 'error' : 'ok';
  
  const trace = {
    traceId,
    spanId,
    parentSpanId: null,
    serviceName: process.env.SERVICE_NAME || 'distributed-tracing-service',
    processId: process.pid,
    operationName: 'test.status',
    startTime: new Date(),
    endTime: new Date(),
    duration: 1,
    tags: [{ key: 'test.type', value: 'status' }, { key: 'status.code', value: statusCode }],
    logs: [],
    status,
    samplingDecision: true,
    samplingReason: status === 'error' ? 'error' : 'fast'
  };
  inMemoryTraces.push(trace);
  
  res.status(statusCode).json({
    message: `Status code: ${statusCode}`,
    traceId,
    spanId
  });
});

router.post('/test/proxy', async (req, res) => {
  const { url } = req.body;
  const traceId = req.traceContext?.traceId || `trace-${Date.now()}`;
  const spanId = `span-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    const response = await fetch(url);
    const data = await response.text();
    
    const trace = {
      traceId,
      spanId,
      parentSpanId: null,
      serviceName: process.env.SERVICE_NAME || 'distributed-tracing-service',
      processId: process.pid,
      operationName: 'test.proxy',
      startTime: new Date(),
      endTime: new Date(),
      duration: 10,
      tags: [{ key: 'test.type', value: 'proxy' }, { key: 'proxy.url', value: url }, { key: 'proxy.status', value: response.status }],
      logs: [],
      status: 'ok',
      samplingDecision: true,
      samplingReason: 'fast'
    };
    inMemoryTraces.push(trace);
    
    res.json({
      message: 'Proxy test completed',
      proxyStatus: response.status,
      traceId,
      data: data.substring(0, 200)
    });
  } catch (error) {
    const trace = {
      traceId,
      spanId,
      parentSpanId: null,
      serviceName: process.env.SERVICE_NAME || 'distributed-tracing-service',
      processId: process.pid,
      operationName: 'test.proxy',
      startTime: new Date(),
      endTime: new Date(),
      duration: 5,
      tags: [{ key: 'test.type', value: 'proxy' }, { key: 'proxy.url', value: url }],
      logs: [],
      status: 'error',
      errorMessage: error.message,
      samplingDecision: true,
      samplingReason: 'error'
    };
    inMemoryTraces.push(trace);
    
    res.status(500).json({
      error: error.message,
      traceId
    });
  }
});

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    pid: process.pid,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

export default router;
