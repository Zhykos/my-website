import Server from "lume/core/server.ts";
import expires from "lume/middlewares/expires.ts";
import notFound from "lume/middlewares/not_found.ts";
import precompress from "lume/middlewares/precompress.ts";

const server = new Server({
    port: 8000,
    root: `${Deno.cwd()}/_site`,
});

server
    .use(expires())
    .use(
        notFound({
            root: `${Deno.cwd()}/_site`,
            page404: "/404.html",
        }),
    )
    .use(precompress());

server.start();

console.log("Listening on http://localhost:8000");
