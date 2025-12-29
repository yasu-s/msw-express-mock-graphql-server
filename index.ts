import express from 'express';
import bodyParser from "body-parser";
import { createMiddleware } from '@mswjs/http-middleware'
import { HttpResponse, graphql } from 'msw'
import cors from 'cors'

// port, GraphQLのpath設定
const PORT = 3000;
const GRAPHQL_PATH = '/graphql'

const app = express();

// CORS設定
app.use(cors())

// bodyParser設定
app.use(bodyParser.json())

// GraphQLモック設定
app.use(GRAPHQL_PATH, express.Router().use(createMiddleware(...[
  // operationName が GetUser の時のモック
  graphql.query('GetUser', ({ variables }) => {
    // variables.id の値によってレスポンスを変更
    if (variables.id === '1') {
      // id = 1 の場合
      return HttpResponse.json({ data: { user: { id: variables.id, name: 'hogehoge' }} })
    }
    return HttpResponse.json({ data: { user: { id: variables.id, name: 'hoge' }} })
  })
])))

// server起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}${GRAPHQL_PATH}`);
});