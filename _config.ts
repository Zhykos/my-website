import { fr } from "npm:date-fns/locale/fr";
import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";
import checkUrls from "lume/plugins/check_urls.ts";
import date from "lume/plugins/date.ts";
import decapCMS from "lume/plugins/decap_cms.ts";
import extractDate from "lume/plugins/extract_date.ts";
import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import gzip from "lume/plugins/gzip.ts";
import icons from "lume/plugins/icons.ts";
import inline from "lume/plugins/inline.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import multilanguage from "lume/plugins/multilanguage.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import pageFind from "lume/plugins/pagefind.ts";
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
    .copy("files")
    .copy("img")
    .add("favicon.png")
    .use(tailwindcss())
    .use(lightningCss())
    .add("styles.css")
    .use(
        date({
            locales: { fr },
        }),
    )
    //.use(codeHighlight())
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
    .use(
        icons({
            catalogs: [
                {
                    id: "boxicons",
                    src: "https://cdn.jsdelivr.net/npm/boxicons@2.1.4/svg/{variant}-{name}.svg",
                    variants: [
                        { id: "logos", path: "logos/bxl" },
                        { id: "regular", path: "regular/bx" },
                        { id: "solid", path: "solid/bxs" },
                    ],
                },
                {
                    id: "openmoji",
                    src: "https://openmoji.org/data/color/svg/{name}.svg",
                },
                {
                    id: "remix",
                    src: "https://cdn.jsdelivr.net/npm/remixicon@4.6.0/icons/{name}.svg",
                },
                {
                    id: "vector",
                    src: "https://www.vectorlogo.zone/logos/{name}.svg",
                },
            ],
        }),
    )
    .use(
        multilanguage({
            languages: ["en", "fr"],
            defaultLanguage: "fr",
        }),
    )
    .use(inline())
    .use(
        checkUrls({
            strict: true,
            external: true,
            output: "_broken_links.json",
        }),
    )
    .use(extractDate())
    .use(
        favicon({
            input: "/favicon.png",
        }),
    )
    .use(gzip());

export default site;
