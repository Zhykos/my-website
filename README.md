# Zhykos' website

🌍 My french personal and professional website with static pages: my resume, my experiences and personal projects.

👉 https://www.zhykos.fr 👈

## Main pages

Template from [Prerak Raja](https://github.com/rajaprerak/rajaprerak.github.io).

Just needs a browser because it's based on HTML, JavaScript and CSS.

## Resume

Made with [Reactive Resume](https://rxresu.me/).

Used locally with [Docker Compose](https://docs.docker.com/compose/).

PDF generated and process controlled with [Playwright](https://playwright.dev/).

## Complete resume

Made with [RenderCV](https://rendercv.com/).

Needs Python: https://www.python.org/downloads/.

Then install with `pip install "rendercv[full]"` and regenerate files with:

```shell
rendercv render "thomas-cicognani-complete-resume.yaml"
```

## Format and lint

Uses [Biome](https://biomejs.dev/).

A [Deno](https://deno.com/) shortcut is available, so you can run `deno task format` (or check `deno.json` for the command line).
