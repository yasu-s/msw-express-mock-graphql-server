import express from 'express';
import bodyParser from "body-parser";
import { createMiddleware } from '@mswjs/http-middleware'
import { HttpResponse, graphql } from 'msw'
import cors from 'cors'
import userJson from './user.json'

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
  graphql.query('GetUser', () => {
    return  HttpResponse.json({ data: userJson })
  })
])))

// server起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}${GRAPHQL_PATH}`);
});