import { createTypeScriptJsonValidator } from 'lisa-typechat/ts';
import { jsonrepair } from 'jsonrepair';

export function validateSchema(schema, typeName, jsonData) {
  const validator = createTypeScriptJsonValidator(schema, typeName);

  return validator.validate(jsonData);
}

export function generatePrompt(schema, typeName, input) {
  const validator = createTypeScriptJsonValidator(schema, typeName)
  return `你是一个服务，将用户请求翻译为类型为 "${validator.getTypeName()}" 的JSON对象，遵循以下TypeScript定义：\n` +
    `\`\`\`\n${validator.getSchemaText()}\`\`\`\n` +
    `以下是用户请求：\n` +
    `"""\n${input}\n"""\n` +
    `请将上述用户请求翻译为一个 JSON 对象，使用 2 个空格缩进，且不包含值为 undefined 的属性。\n`;
}

export function jsonLoader(responseText) {
  const startIndex = responseText.indexOf("{")
  const endIndex = responseText.lastIndexOf("}")
  if (!(startIndex >= 0 && endIndex > startIndex)) {
      return error(`Response is not JSON:\n${responseText}`)
  }
  const jsonText = responseText.slice(startIndex, endIndex + 1)
  let jsonObject
  try {
      jsonObject = JSON.parse(jsonText)
  }
  catch (e) {
      console.log(e instanceof SyntaxError ? e.message : "JSON parse error")
      try {
          console.log("trying to repair json");
          jsonObject = JSON.parse(jsonrepair(jsonText))
      } catch (e) {
          console.log("trying to repair json failed")
          return error(e instanceof SyntaxError ? e.message : "JSON parse error")
      }
  }

  return jsonObject
}