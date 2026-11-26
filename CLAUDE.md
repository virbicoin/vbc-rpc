# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリのコードを扱う際のガイドラインを提供します。

## プロジェクト概要

VirBiCoin RPC ノードステータスダッシュボード — 各ノードの稼働状況をリアルタイムで表示し、公開 RPC / WebSocket の使い方を案内する Next.js アプリケーションです。JSON-RPC の POST は nginx がノード（8329）へ中継し、このアプリを通りません（「デプロイ」参照）。

## 技術スタック

- **フレームワーク**: Next.js 16（App Router・Turbopack）
- **言語**: TypeScript 6
- **スタイリング**: Tailwind CSS 4
- **Lint**: ESLint 10（`typescript-eslint` + `eslint-config-prettier`）
- **フォーマッタ**: Prettier（`prettier-plugin-tailwindcss`）
- **ランタイム**: Node.js 20.19+ / 22.13+ / 24（`engines`。Next.js 16 と ESLint 10 の要件。`.nvmrc` と CI は 24）

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

## コミット署名（GPG）

このリポジトリのコミットは GPG 署名が有効です（`commit.gpgsign`）。AI エージェントは
秘密情報であるパスフレーズを代理入力できないため、gpg-agent のキャッシュが切れていると
`git commit` が署名失敗で中断することがあります。

- 署名が切れているときは、ユーザーがターミナルで一度パスフレーズを入力してください
  （`git commit` の再実行、または `echo test | gpg --clearsign` を一度実行）。一度
  入力すれば gpg-agent がしばらくキャッシュします。
- パスフレーズは秘密情報です。AI エージェントへ渡したりディスクへ保存したりしないで
  ください。
- コミット失敗を未然に防ぎたい場合は、コミット前にキャッシュを温める pre-commit フック
  （署名キャッシュが切れていればパスフレーズ入力を促す）を利用する方法があります。

## 関連リポジトリ

VirBiCoin エコシステムは以下のリポジトリで構成されています:

| リポジトリ                 | 役割                                                                   | ローカルパス        | URL                                                                                |
| -------------------------- | ---------------------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| **virbicoin.com**          | 公式 Web サイト（メインサイト。private）                               | `../virbicoin.com`  | [github.com/virbicoin/virbicoin.com](https://github.com/virbicoin/virbicoin.com)   |
| **go-virbicoin**           | メインクライアント（Gvbc, Go 実装）                                    | `../go-virbicoin`   | [github.com/virbicoin/go-virbicoin](https://github.com/virbicoin/go-virbicoin)     |
| **open-virbicoin**         | Rust クライアント（Ovbc, OpenEthereum フォーク）                       | `../open-virbicoin` | [github.com/virbicoin/open-virbicoin](https://github.com/virbicoin/open-virbicoin) |
| **vbc-explorer**           | ブロックチェーンエクスプローラー（DEX・Launchpad・ブリッジ画面を含む） | `../vbc-explorer`   | [github.com/virbicoin/vbc-explorer](https://github.com/virbicoin/vbc-explorer)     |
| **vbc-stats**              | ネットワーク統計ダッシュボード                                         | `../vbc-stats`      | [github.com/virbicoin/vbc-stats](https://github.com/virbicoin/vbc-stats)           |
| **vbc-stats-api**          | VBC Stats 用ノードレポーター（組み込みレポーターのない Ovbc 向け）     | `../vbc-stats-api`  | [github.com/virbicoin/vbc-stats-api](https://github.com/virbicoin/vbc-stats-api)   |
| **vbc-pool**               | マイニングプール                                                       | `../vbc-pool`       | [github.com/virbicoin/vbc-pool](https://github.com/virbicoin/vbc-pool)             |
| **vbc-rpc** ← 本リポジトリ | RPC ノードステータスページ（公開 RPC・WebSocket の案内）               | `../vbc-rpc`        | [github.com/virbicoin/vbc-rpc](https://github.com/virbicoin/vbc-rpc)               |
| **vbc-hash**               | Ethash アルゴリズム実装（C/Go バインディング）                         | `../vbc-hash`       | [github.com/virbicoin/vbc-hash](https://github.com/virbicoin/vbc-hash)             |

### 依存関係

- **go-virbicoin** と **open-virbicoin**: 同じ VirBiCoin ネットワーク（chainId 329）の 2 つのクライアント実装（Gvbc は Go、Ovbc は Rust）。報酬・フォークブロックなどコンセンサスに関わる変更は必ず両方に同時に入れる
- **vbc-explorer** → ノードの JSON-RPC（Gvbc / Ovbc）。内部取引の索引は Parity 形式の `trace_transaction` を使うため Ovbc が必要（本番の explorer は Ovbc の IPC ソケットを読む）
- **vbc-stats** ← Gvbc は組み込みの ethstats レポーター（`--ethstats`）で直接報告し、Ovbc は **vbc-stats-api** を介して報告する
- **vbc-pool** → ノードの JSON-RPC（Gvbc / Ovbc。本番は両方）から作業を取得し、ブロックの確定と支払いを行う。シェアの検証は `proxy/miner.go` の純 Go 実装で、vbc-hash には依存しない
- **vbc-rpc** → 各ノードの JSON-RPC（8329）に状態を問い合わせるだけ。公開 RPC（rpc.virbicoin.com）への POST は nginx がノードへ中継し、このアプリを通らない
- **vbc-hash**: このワークスペースのどのリポジトリも import していない（Gvbc は `consensus/ethash`、vbc-pool は `proxy/miner.go` の自前実装）
- **virbicoin.com**: 静的サイト（他リポジトリへのリンクのみ）
- 公開リポジトリなので、private のリポジトリはこの表に載せていない（virbicoin.com は公開 Web サイトのソースとして載せる）。公開 README からは virbicoin.com の GitHub ではなく Web サイト（https://www.virbicoin.com）にリンクする
