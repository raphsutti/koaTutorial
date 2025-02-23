import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";
import Router from "koa-router";
import health from "./routes/healthcheck";
import { config } from "./config";

const app = new Koa();

const PORT = config.port;

app.use(bodyParser());
app.use(cors({ origin: "*" })); // allow any origin
app.use(logger());
app.use(health.routes());

const router = new Router();

router.get("/", async (ctx: Context) => {
  try {
    ctx.body = {
      status: "success",
    };
  } catch (e) {
    console.error(e);
  }
});
app.use(router.routes());

const server = app
  .listen(PORT, async () => {
    console.log(`Server started on port: ${PORT}`);
  })
  .on("error", (err) => {
    console.error(err);
  });

export default server;
