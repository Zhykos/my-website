import f from "https://deno.land/x/netlify_cms_config@v0.2.0/mod.ts";

f.defaultRequired = false;

const config = {
    backend: {
        name: "git-gateway",
        branch: "master",
    },
    media_folder: "img",
    collections: [],
};

// Posts
config.collections.push(
    f
        .folder("Posts", "posts")
        .description("Here you can create or edit your posts")
        .preview(false)
        .create(true)
        //.viewFilter("Draft", "draft", true)
        .fields([
            f.string("Title"),
            f.string("Description"),
            f.datetime("Date"),
            f.list("Tags"),
            //f.boolean("Draft").required(false),
            f.markdown("Body"),
        ])
        .toJSON(),
);

export default config;
