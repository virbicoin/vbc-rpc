export function SecurityInfo() {
  return (
    <div className="glass-card animate-fade-in h-full p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-pink-600">
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h2 className="text-primary text-lg font-bold">Security Tips</h2>
      </div>
      <ul className="space-y-3">
        <li className="text-secondary flex items-start gap-3 text-sm">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>
            Always verify URLs start with{' '}
            <code className="rounded bg-blue-500/10 px-1 text-blue-500">https://</code> or{' '}
            <code className="rounded bg-purple-500/10 px-1 text-purple-500">wss://</code>
          </span>
        </li>
        <li className="text-secondary flex items-start gap-3 text-sm">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Keep your wallet software updated to the latest version.</span>
        </li>
        <li className="text-secondary flex items-start gap-3 text-sm">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Never share your private keys or seed phrases with anyone.</span>
        </li>
      </ul>
    </div>
  );
}
