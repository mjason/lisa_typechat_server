import { Application, Router } from "@oak/oak";
import { validateSchema, generatePrompt, jsonLoader } from "./llm.js";

const app = new Application();
const router = new Router();


router.post("/validate", async (ctx) => {
  try {
    const { schema, typeName, jsonData } = await ctx.request.body.json();
    const validationResult = validateSchema(schema, typeName, jsonData);
    ctx.response.status = 200;
    ctx.response.body = validationResult;
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { success: false, message: error.message };
  }
});

router.post("/prompt", async (ctx) => {
  try {
    const { schema, typeName, input } = await ctx.request.body.json();
    const prompt = generatePrompt(schema, typeName, input);
    ctx.response.status = 200;
    ctx.response.body = prompt;
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { success: false, message: error.message };
  }
});

router.post("/parse", async(ctx)=> {
  try {
    const { responseText } = await ctx.request.body.json();
    const jsonObject = jsonLoader(responseText);
    ctx.response.status = 200;
    ctx.response.body = jsonObject;
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { success: false, message: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });