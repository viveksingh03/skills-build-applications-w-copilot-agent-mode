import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { createApp } from '../dist/app.js';
import { connectToDatabase } from '../dist/config/database.js';

test('GET /api/users/ returns a users payload', async () => {
  await connectToDatabase();
  const app = createApp();
  const server = createServer(app);
  server.listen(0);
  await once(server, 'listening');

  try {
    const address = server.address();
    assert.ok(address && typeof address === 'object' && 'port' in address);
    const response = await fetch(`http://127.0.0.1:${address.port}/api/users/`);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.ok(Array.isArray(body.data));
    assert.equal(body.resource, 'users');
  } finally {
    server.close();
    await once(server, 'close');
  }
});

test('GET /api/config returns the API base URL', async () => {
  await connectToDatabase();
  const app = createApp();
  const server = createServer(app);
  server.listen(0);
  await once(server, 'listening');

  try {
    const address = server.address();
    assert.ok(address && typeof address === 'object' && 'port' in address);
    const response = await fetch(`http://127.0.0.1:${address.port}/api/config`);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.ok(typeof body.apiUrl === 'string');
    assert.match(body.apiUrl, /http:\/\/localhost:8000|\.app\.github\.dev/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});
