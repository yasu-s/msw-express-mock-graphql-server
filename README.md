## 概要

- MSW + Express + @mswjs/http-middlewareを使用してGraphQLモックサーバーを構築

## 実行環境

- Node.js - 24.x

## 使用ライブラリ

- express - 5.2.1
- msw - 2.12.7
- @mswjs/http-middleware - 0.10.3
- cors - 2.8.5

## 動作確認

```bash
# パッケージインストール
$ npm i

# GraphQLモックサーバー起動
$ npm run start

# GraphQLクエリ実行
$ curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query GetUser($id: ID!) { user(id: $id) { id name } }",
    "variables": { "id": "1" }
  }' \
  http://localhost:3000/graphql
```

## 参考URL

- https://github.com/mswjs/http-middleware
