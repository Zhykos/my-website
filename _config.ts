import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import date from "lume/plugins/date.ts";
import decapCMS from "lume/plugins/decap_cms.ts";
import feed from "lume/plugins/feed.ts";
import icons from "lume/plugins/icons.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import pageFind from "lume/plugins/pagefind.ts";
import postcss from "lume/plugins/postcss.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import sitemap from "lume/plugins/sitemap.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";

const site = lume({
    location: new URL("https://www.zhykos.fr/"),
    watcher: {
        ignore: ["./node_modules/"],
    },
});

site.ignore("README.md")
    .ignore("BACKUP")
    .ignore("complete-resume")
    .ignore("resume")
    .ignore("www")
    .copy("img")
    .use(tailwindcss())
    .use(postcss())
    .use(date())
    .use(codeHighlight())
    .use(basePath())
    .use(sitemap())
    .use(nunjucks())
    .use(
        pageFind({
            ui: {
                resetStyles: false,
                highlightParam: "highlight",
            },
        }),
    )
    .use(slugifyUrls({ alphanumeric: false }))
    .use(
        feed({
            output: ["/feed.json", "/feed.xml"],
            query: "type=posts",
            info: {
                title: "=site.title",
                description: "=site.description",
            },
            items: {
                title: "=title",
                content: "$.post-body",
            },
        }),
    )
    .use(resolveUrls())
    .use(decapCMS({ identity: "netlify" }))
    .use(icons());

export default site;
