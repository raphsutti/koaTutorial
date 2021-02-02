import Router from "koa-router";

const router = new Router();

router.get("/health", async (ctx) => {
  try {
    ctx.body = {
      status: "success",
      data: "hello world",
    };
  } catch (e) {
    console.error(e);
  }
});

export default router;
