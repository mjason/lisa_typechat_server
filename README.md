Lisa TypeChat API 文档

基本域名: https://lisa-typechat.listenai.com

Lisa TypeChat API 提供多个端点，用于根据指定的 TypeScript schema 格式对 JSON 数据和 prompt 输入进行验证和解析。

接口说明

1. 验证 JSON 数据

端点: /validate

请求方法: POST

描述: 根据指定的 TypeScript schema 验证 JSON 数据的格式是否符合要求。响应结果中会返回验证结果，指出数据是否符合 schema 的格式。

请求体参数:
	•	schema (string): TypeScript schema 文件的内容，例如 schema.ts 的字符串表示形式。
	•	typeName (string): 要验证的数据类型名称，例如 "Resume"。
	•	jsonData (object): 需要验证的 JSON 数据。

请求示例:

{
  "schema": "schema.ts 文件内容",
  "typeName": "Resume",
  "jsonData": {
    "name": "John Doe",
    "experience": 5
  }
}

2. 生成 Prompt

端点: /prompt

请求方法: POST

描述: 根据指定的 schema 格式将原始输入 prompt 数据转化为结构化格式。本端点基于 schema 和类型生成一个结构化的 prompt。

请求体参数:
	•	schema (string): TypeScript schema 文件内容。
	•	typeName (string): 要生成的 prompt 所需的数据类型名称，例如 "Resume"。
	•	input (string): 原始的 prompt 数据，将被转化为符合 schema 格式的结构化数据。

请求示例:

{
  "schema": "schema.ts 文件内容",
  "typeName": "Resume",
  "input": "prompt 内容"
}

3. 解析响应内容

端点: /parse

请求方法: POST

描述: 将输出文本解析为结构化信息，带JSON自动修复。

请求体参数:
	•	responseText (string): 需要解析的文本响应内容。

请求示例:

{
  "responseText": "待解析的响应文本内容"
}

注意: 用户可以直接检查每个端点返回的响应，以了解每次调用的结构和成功状态。


---
项目开源协议：你爱干嘛干嘛