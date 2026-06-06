export function UsageGuide() {
  return (
    <div className="glass-card animate-fade-in h-full p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h2 className="text-primary text-lg font-bold">Usage Guide</h2>
      </div>
      <ul className="space-y-3">
        <li className="text-secondary flex items-start gap-3 text-sm">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
            1
          </span>
          <span>Click on the provided endpoint URL to copy it to your clipboard.</span>
        </li>
        <li className="text-secondary flex items-start gap-3 text-sm">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
            2
          </span>
          <span>Configure your wallet or dApp with the RPC endpoint.</span>
        </li>
        <li className="text-secondary flex items-start gap-3 text-sm">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
            3
          </span>
          <span>For real-time updates, use the WebSocket endpoint.</span>
        </li>
      </ul>
    </div>
  );
}
