# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリのコードを扱う際のガイドラインを提供します。

## プロジェクト概要

VirBiCoin RPC ノードステータスダッシュボード — 暗号通貨ノードの稼働状況をリアルタイムで表示し、JSON-RPC プロキシエンドポイントを提供する Next.js アプリケーションです。

## 技術スタック

- **フレームワーク**: Next.js 16（App Router・Turbopack）
- **言語**: TypeScript 6
- **スタイリング**: Tailwind CSS 4
- **Lint**: ESLint 10（`typescript-eslint` + `eslint-config-prettier`）
- **フォーマッタ**: Prettier（`prettier-plugin-tailwindcss`）
- **ランタイム**: Node.js 20+

## よく使うコマンド

```bash
# 開発
npm run dev          # 開発サーバー起動（Turbopack, ポート3000）

# 品質チェック
npm run check        # 全チェック実行（lint + format + typecheck）
npm run lint         # ESLint チェック
npm run lint:fix     # ESLint の問題を自動修正
npm run format       # Prettier で整形
npm run format:check # Prettier のチェックのみ
npm run typecheck    # TypeScript の型チェック

# ビルド・デプロイ
npm run build        # 本番ビルド
npm start            # 本番サーバー起動（$PORT または 3000）
```

### Git フック

`npm install` 時に `prepare` スクリプトが `core.hooksPath` を `.githooks` に設定し、
pre-commit フックが有効になります。コミット前に CI と同じ `npm run check`
（lint + format:check + typecheck）が自動実行され、失敗するとコミットが中止されます。

- 自動修正: `npm run format` / `npm run lint:fix`
- 緊急回避: `git commit --no-verify`

## アーキテクチャ

```
src/
├── app/                  # App Router（ルート・レイアウト・ページ）
│   ├── globals.css       # グローバルスタイル（Tailwind + CSS変数）
│   ├── layout.tsx        # ルートレイアウト
│   ├── page.tsx          # メインダッシュボードページ
│   ├── api/
│   │   └── nodes/        # ノードステータス API エンドポイント
│   │       ├── route.ts  # GET /api/nodes
│   │       ├── data.ts   # ノード設定データ
│   │       └── [NODE_NAME]/
│   │           └── route.ts  # GET /api/nodes/:name
│   └── health/
│       └── route.ts      # ヘルスチェックエンドポイント
├── components/           # 再利用可能な React コンポーネント
│   ├── Header.tsx
│   ├── NodeStatus.tsx
│   ├── ConnectionInfo.tsx
│   ├── SecurityInfo.tsx
│   ├── UsageGuide.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
```

## コーディング規約

- `type` インポートを使用: `import type { Foo } from 'bar'`
- パスエイリアス: `@/*` は `./src/*` にマップ
- コンポーネントは `src/components/` に配置（named export）
- API ルートは Next.js App Router の規約に従う
- シングルクォート使用（Prettier設定）
- コミット前に `npm run check` を実行（`.githooks/pre-commit` で自動実行。`npm install` 時に有効化）

## デプロイ

- Nginx リバースプロキシの背後でポート4000で稼働（`PORT` 環境変数で設定）
- POST リクエストは VirBiCoin ノード RPC（ポート8329）にプロキシ
- GET リクエストは Next.js（ポート4000）にプロキシ
- 本番: `npm run build && npm start`

## 環境変数

- `PORT` — サーバーポート（デフォルト: 3000, 本番: 4000）
- `NODES` — 監視対象ノード設定（JSON形式）。未設定時はノードなし
  ```
  NODES='{"Node 1":"http://host1:8329","Node 2":"http://host2:8329"}'
  ```

## VirBiCoin ネットワーク情報

- **チェーンID**: 329
- **シンボル**: VBC
- **ブロックタイム**: 12〜14秒
- **アルゴリズム**: Ethash（GPUマイニング可能）
- **RPC**: https://rpc.virbicoin.com
- **WebSocket**: wss://ws.virbicoin.com
- **エクスプローラー**: https://explorer.virbicoin.com

## 関連リポジトリ

VirBiCoin エコシステムは以下の6つのリポジトリで構成されています：

| リポジトリ                 | 役割                                   | ローカルパス             | URL                                                                                          |
| -------------------------- | -------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------- |
| **virbicoin.com**          | 公式Webサイト（メインサイト）          | `../virbicoin.com`       | [github.com/virbicoin/virbicoin.com](https://github.com/virbicoin/virbicoin.com)             |
| **vbc-stats**              | ネットワーク統計ダッシュボード         | `../vbc-stats`           | [github.com/virbicoin/vbc-stats](https://github.com/virbicoin/vbc-stats)                     |
| **vbc-explorer**           | ブロックチェーンエクスプローラー       | `../vbc-explorer`        | [github.com/virbicoin/vbc-explorer](https://github.com/virbicoin/vbc-explorer)               |
| **go-virbicoin**           | メインクライアント（Gvbc, Go実装）     | `../go-virbicoin`        | [github.com/virbicoin/go-virbicoin](https://github.com/virbicoin/go-virbicoin)               |
| **open-virbicoin-pool**    | マイニングプール                       | `../open-virbicoin-pool` | [github.com/virbicoin/open-virbicoin-pool](https://github.com/virbicoin/open-virbicoin-pool) |
| **vbc-rpc** ← 本リポジトリ | RPCノードステータス & JSON-RPCプロキシ | `../vbc-rpc`             | [github.com/virbicoin/vbc-rpc](https://github.com/virbicoin/vbc-rpc)                         |

### 依存関係

- **vbc-rpc** → **go-virbicoin**: RPC プロキシが Gvbc ノードにリクエストを中継
- **vbc-stats** → **go-virbicoin**: Gvbc ノードが eth-netstats-client プロトコルでブロック/統計データを送信
- **vbc-explorer** → **go-virbicoin**: JSON-RPC 経由でブロックチェーンデータを取得
- **open-virbicoin-pool** → **go-virbicoin**: マイニングプールが Gvbc ノードから作業を取得
