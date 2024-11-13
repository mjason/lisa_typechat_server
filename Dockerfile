FROM denoland/deno:alpine-2.0.6

EXPOSE 8000

WORKDIR /app

ADD deno.json /app/.
ADD main.js /app/.
ADD llm.js /app/.
ADD deno.lock /app/.

RUN deno install --entrypoint main.js

CMD ["run", "--allow-net", "--allow-read", "--allow-env", "main.js"]