'use client';

import { useState, useEffect } from 'react';

interface EndpointStatus {
  rpc: {
    isAlive: boolean;
    lastChecked: string;
  };
  websocket: {
    isAlive: boolean;
    lastChecked: string;
  };
}

const CACHE_DURATION = 5 * 60 * 1000;

export function ConnectionInfo() {
  const [endpointStatus, setEndpointStatus] = useState<EndpointStatus>({
    rpc: { isAlive: false, lastChecked: '' },
    websocket: { isAlive: false, lastChecked: '' },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEndpoints = async () => {
      const cachedStatus = localStorage.getItem('endpointStatus');
      const cachedStatusTimestamp = localStorage.getItem('endpointStatusTimestamp');

      if (cachedStatus && cachedStatusTimestamp) {
        const timestamp = parseInt(cachedStatusTimestamp);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setEndpointStatus(JSON.parse(cachedStatus));
          setLoading(false);
          return;
        }
      }

      const now = new Date();
      const lastChecked = new Intl.DateTimeFormat(undefined, {
        dateStyle: 'short',
        timeStyle: 'long',
      }).format(now);

      try {
        const rpcRes = await fetch('https://rpc.virbicoin.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_blockNumber',
            params: [],
          }),
        });
        const rpcIsAlive = rpcRes.ok;

        const ws = new WebSocket('wss://ws.virbicoin.com');
        const wsCheck = new Promise<boolean>((resolve) => {
          ws.onopen = () => {
            ws.close();
            resolve(true);
          };
          ws.onerror = () => resolve(false);
          setTimeout(() => resolve(false), 5000);
        });

        const wsIsAlive = await wsCheck;

        const newStatus = {
          rpc: { isAlive: rpcIsAlive, lastChecked },
          websocket: { isAlive: wsIsAlive, lastChecked },
        };

        localStorage.setItem('endpointStatus', JSON.stringify(newStatus));
        localStorage.setItem('endpointStatusTimestamp', Date.now().toString());

        setEndpointStatus(newStatus);
        setLoading(false);
      } catch (error) {
        console.error('Error checking endpoints:', error);
        const newStatus = {
          rpc: { isAlive: false, lastChecked },
          websocket: { isAlive: false, lastChecked },
        };

        localStorage.setItem('endpointStatus', JSON.stringify(newStatus));
        localStorage.setItem('endpointStatusTimestamp', Date.now().toString());

        setEndpointStatus(newStatus);
        setLoading(false);
      }
    };

    checkEndpoints();
  }, []);

  if (loading) {
    return (
      <div className="glass-card animate-fade-in p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-teal-600">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
          <h2 className="text-primary text-xl font-bold">Connection Endpoints</h2>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
          <div className="text-muted animate-pulse text-lg font-medium">Checking Endpoints...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card animate-fade-in p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-teal-600">
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
        <h2 className="text-primary text-xl font-bold">Connection Endpoints</h2>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* RPC Endpoint */}
        <div className="endpoint-card rounded-xl border p-5 transition-colors">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-primary inline-flex items-center gap-2 font-medium">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              RPC Endpoint
            </span>
            <span
              className={endpointStatus.rpc.isAlive ? 'status-online' : 'status-offline'}
              style={{
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              {endpointStatus.rpc.isAlive ? 'Online' : 'Offline'}
            </span>
          </div>
          <div className="code-block group flex items-center justify-between rounded-lg p-3">
            <code className="text-secondary font-mono text-sm">https://rpc.virbicoin.com</code>
            <button
              onClick={() => navigator.clipboard.writeText('https://rpc.virbicoin.com')}
              className="text-muted p-1 transition-colors hover:text-blue-400"
              title="Copy to clipboard"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
          <p className="text-muted mt-2 text-xs">Last checked: {endpointStatus.rpc.lastChecked}</p>
        </div>

        {/* WebSocket Endpoint */}
        <div className="endpoint-card rounded-xl border p-5 transition-colors">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-primary inline-flex items-center gap-2 font-medium">
              <svg
                className="h-5 w-5 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              WebSocket Endpoint
            </span>
            <span
              className={endpointStatus.websocket.isAlive ? 'status-online' : 'status-offline'}
              style={{
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              {endpointStatus.websocket.isAlive ? 'Online' : 'Offline'}
            </span>
          </div>
          <div className="code-block group flex items-center justify-between rounded-lg p-3">
            <code className="text-secondary font-mono text-sm">wss://ws.virbicoin.com</code>
            <button
              onClick={() => navigator.clipboard.writeText('wss://ws.virbicoin.com')}
              className="text-muted p-1 transition-colors hover:text-purple-400"
              title="Copy to clipboard"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
          <p className="text-muted mt-2 text-xs">
            Last checked: {endpointStatus.websocket.lastChecked}
          </p>
        </div>
      </div>

      <div className="info-banner rounded-lg p-4">
        <p className="text-secondary flex items-start gap-2 text-sm">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Use these endpoints to connect to the VirBiCoin network. Ensure your client supports
          JSON-RPC and WebSocket protocols.
        </p>
      </div>
    </div>
  );
}
