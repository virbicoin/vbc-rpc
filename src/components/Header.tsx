'use client';

import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <header className="header-border w-full py-8">
      <div className="mx-auto max-w-screen-lg px-4">
        <div className="flex items-center justify-between">
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <Image
              src="/VBC.svg"
              alt="VirBiCoin Logo"
              width={48}
              height={48}
              className="drop-shadow-lg"
              priority
            />
            <h1 className="gradient-text text-3xl font-bold md:text-4xl">VirBiCoin Node</h1>
          </div>
          <div className="flex flex-1 justify-end">
            <ThemeToggle />
          </div>
        </div>
        <p className="subtitle-text mt-2 text-center text-sm">
          Real-time blockchain node monitoring dashboard
        </p>
      </div>
    </header>
  );
}
