const { Server } = require('ws'),
  { MongoClient } = require('mongodb'),
  PORT = process.env.PORT || 9000,
  wss = new Server({ port: PORT });

wss.on('connection', ws => {
  let client;
  ws.on('message', async m => {
    console.log('New message:', JSON.parse(m));
    let msg;
    try { msg = JSON.parse(m); } catch { return ws.send(JSON.stringify({ error: 'Invalid JSON.' })); }
    const { method, data } = msg;
    if (method === 'connect') {
      if (client)
        return ws.send(
          JSON.stringify({ error: 'Connection already established, refresh browser to disconnect.', event: 'connect' })
        );
      try {
        client = await MongoClient.connect(data);
        ws.send(JSON.stringify({ result: 'Successfully connected to MongoDB.', event: 'connect' }));
      } catch (e) { ws.send(JSON.stringify({ error: 'Connection error: ' + e.message, event: 'connect' })); }
    }
    else if (method === 'query') {
      if (!client)
        return ws.send(JSON.stringify({ error: 'No MongoDB connection. Use "connect" first.', event: 'query' }));
      try {
        const result = await new Function(
          'client',
          'return (async () => {' + data + '})()'
        )(client);
        ws.send(JSON.stringify({result, event: 'query'}));
      } catch (e) { ws.send(JSON.stringify({ error: 'Query error: ' + e.message, event: 'query' })); }
    }
    else {
      ws.send(JSON.stringify({ error: 'Invalid method. Use "connect" or "query".', event: 'unknown' }));
    }
  });
  ws.on('close', async () => {
    console.log('Client disconnected. Closing MongoDB connection if exists.');
    if (client) try { await client.close(); } catch (e) { console.error('Error closing MongoDB:', e); }
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
