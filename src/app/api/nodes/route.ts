import { NextResponse } from 'next/server';
import { nodes } from './data';

// Node names only: the RPC URLs are backend addresses and stay on the server.
export async function GET() {
  return NextResponse.json(Object.keys(nodes));
}
