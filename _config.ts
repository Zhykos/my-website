import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import decapCMS from "lume/plugins/decap_cms.ts";
import pageFind from "lume/plugins/pagefind.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import nunjucks from "lume/plugins/nunjucks.ts";

const site = lume({
    location: new URL("https://www.zhykos.fr/"),
});

site.ignore("README.md")
    .ignore("BACKUP")
    .ignore("complete-resume")
    .ignore("resume")
    .ignore("www")
    .ignore("_site")
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
    .use(decapCMS({ identity: "netlify" }));

export default site;
