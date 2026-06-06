<p align="center">
  <img src="public/VBC.svg" alt="VirBiCoin Logo" width="120" height="120">
</p>

<h1 align="center">RPC VirBiCoin</h1>

<p align="center">
  <strong>VirBiCoin RPC Node Status Dashboard & JSON-RPC Proxy</strong>
</p>

<p align="center">
  <a href="https://rpc.virbicoin.com">
    <img src="https://img.shields.io/badge/RPC-rpc.virbicoin.com-cyan?style=for-the-badge&logo=google-chrome&logoColor=white" alt="RPC">
  </a>
  <a href="https://explorer.virbicoin.com">
    <img src="https://img.shields.io/badge/Explorer-Live-green?style=for-the-badge&logo=ethereum&logoColor=white" alt="Explorer">
  </a>
  <a href="https://discord.virbicoin.com">
    <img src="https://img.shields.io/badge/Discord-Join-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/ESLint-10-4B32C3?style=flat-square&logo=eslint&logoColor=white" alt="ESLint">
  <img src="https://img.shields.io/badge/Node.js-≥20-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License: MIT">
  </a>
</p>

---

## ✨ Features

- 🖥️ **Node Status Display** — Real-time block height, peer count, and version info
- 🌐 **JSON-RPC Proxy** — Relays POST requests to VirBiCoin nodes
- 🌙 **Dark/Light Theme** — System preference detection with manual toggle
- ⚡ **Fast Rendering** — Next.js App Router + Turbopack
- 📱 **Responsive** — Mobile-friendly dashboard UI

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/virbicoin/rpc.virbicoin.com.git
cd rpc.virbicoin.com

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🛠️ Available Scripts

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Development server (Turbopack)     |
| `npm run build`        | Production build                   |
| `npm start`           | Production server                  |
| `npm run check`        | All checks (lint + format + typecheck) |
| `npm run lint`         | ESLint check                       |
| `npm run lint:fix`     | ESLint auto-fix                    |
| `npm run typecheck`    | TypeScript type check              |
| `npm run format`       | Prettier format                    |
| `npm run format:check` | Prettier check                     |

## 🔌 API Endpoints

| Endpoint           | Method | Description                     |
| ------------------ | ------ | ------------------------------- |
| `/api/nodes`       | GET    | List all node statuses          |
| `/api/nodes/:name` | GET    | Get specific node status        |
| `/health`          | GET    | Health check                    |
| `/`                | POST   | JSON-RPC proxy (via Nginx)      |

## 📁 Project Structure

```
src/
├── app/                  # App Router (routes, layouts, pages)
│   ├── globals.css       # Tailwind global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main dashboard
│   ├── api/
│   │   └── nodes/        # Node status API
│   │       ├── route.ts  # GET /api/nodes
│   │       ├── data.ts   # Node configuration (from env)
│   │       └── [NODE_NAME]/
│   │           └── route.ts  # GET /api/nodes/:name
│   └── health/
│       └── route.ts      # Health check
├── components/           # Reusable React components
│   ├── Header.tsx
│   ├── NodeStatus.tsx
│   ├── ConnectionInfo.tsx
│   ├── SecurityInfo.tsx
│   ├── UsageGuide.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
public/
├── favicon.ico
└── VBC.svg
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description                              | Default |
| -------- | ---------------------------------------- | ------- |
| `PORT`   | Server port                              | `3000`  |
| `NODES`  | Node config (JSON: `{"Name": "URL", ...}`) | None    |

Example `.env`:

```bash
PORT=4000
NODES='{"Node 1":"http://host1:8329","Node 2":"http://host2:8329"}'
```

## 🚢 Production Deployment

```bash
npm run build
PORT=4000 npm start
```

### Nginx Reverse Proxy Example

```nginx
server {
    server_name rpc.virbicoin.com;

    # Proxy _next/ static assets to Next.js
    location /_next/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
    }

    location / {
        # JSON-RPC (POST) → VirBiCoin node
        if ($request_method = POST) {
            proxy_pass http://127.0.0.1:8329;
            break;
        }
        # GET → Next.js dashboard
        proxy_pass http://127.0.0.1:4000$request_uri;
        proxy_set_header Host $host;
    }
}
```

## 📦 Tech Stack

| Category  | Technology                                      |
| --------- | ----------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) with Turbopack |
| Language  | [TypeScript 6](https://www.typescriptlang.org)  |
| Styling   | [Tailwind CSS 4](https://tailwindcss.com)       |
| Linting   | ESLint 10 + Prettier 3                          |

## 🌐 Network Resources

<table>
  <tr>
    <td align="center">
      <a href="https://explorer.virbicoin.com">
        <img src="https://img.shields.io/badge/🔍_Explorer-blue?style=for-the-badge" alt="Explorer">
      </a>
    </td>
    <td align="center">
      <a href="https://pool.virbicoin.com">
        <img src="https://img.shields.io/badge/⛏️_Mining_Pool-orange?style=for-the-badge" alt="Pool">
      </a>
    </td>
    <td align="center">
      <a href="https://stats.virbicoin.com">
        <img src="https://img.shields.io/badge/📊_Stats-green?style=for-the-badge" alt="Stats">
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://rpc.virbicoin.com">
        <img src="https://img.shields.io/badge/🌐_RPC-teal?style=for-the-badge" alt="RPC">
      </a>
    </td>
    <td align="center">
      <a href="https://www.virbicoin.com">
        <img src="https://img.shields.io/badge/🏠_Website-gray?style=for-the-badge" alt="Website">
      </a>
    </td>
    <td align="center">
      <a href="https://www.virbicoin.com/whitepaper">
        <img src="https://img.shields.io/badge/📄_Whitepaper-slateblue?style=for-the-badge" alt="Whitepaper">
      </a>
    </td>
  </tr>
</table>

## 💬 Community

<p>
  <a href="https://discord.virbicoin.com">
    <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
  </a>
  <a href="https://x.com/VirBiCoin">
    <img src="https://img.shields.io/badge/X_(Twitter)-000000?style=for-the-badge&logo=x&logoColor=white" alt="X">
  </a>
  <a href="https://bitcointalk.org/index.php?topic=5546988.0">
    <img src="https://img.shields.io/badge/Bitcointalk-F7931A?style=for-the-badge&logo=bitcoin&logoColor=white" alt="Bitcointalk">
  </a>
  <a href="https://coinpaprika.com/coin/vbc-virbicoin/">
    <img src="https://img.shields.io/badge/CoinPaprika-00d4aa?style=for-the-badge" alt="CoinPaprika">
  </a>
</p>

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  <sub>Built with ❤️ by the VirBiCoin Team</sub>
</p>
