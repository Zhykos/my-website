# Zhykos' website

🌍 My french personal and professional website with static pages: my resume, my experiences and personal projects.

👉 https://www.zhykos.fr 👈

## Website

Made with [Lume](https://lume.land/) x [Deno](https://deno.com/) (static site generator with TypeScript, Nunjuncks and Markdown), [Tailwind CSS](https://tailwindcss.com/) and [daisyUI](https://daisyui.com/).

Just needs a browser because it's based on HTML, JavaScript and CSS.

Templates and components:
- https://daisyui.com/components/
- https://github.com/rajaprerak/rajaprerak.github.io
- https://tailspark.co/components?component=Blog&category=marketing
- https://willpinha.github.io/daisy-components/card/

Images:
- https://boxicons.com/
- https://remixicon.com/
- https://unsplash.com/fr/photos/ordinateur-portable-asus-noir-affichage-3-00-sxiSod0tyYQ
- https://www.vectorlogo.zone/

And logos and screenshots from official websites (IUT de Reims, Faculté de Nantes, etc.)

Docs:
- https://deno.com/blog/build-a-static-site-with-lume
- https://github.com/lumeland/base-blog

## Resume

Made with [Reactive Resume](https://rxresu.me/).

Used locally with [Docker Compose](https://docs.docker.com/compose/).

PDF generated and process controlled with [Playwright](https://playwright.dev/).

To use, in the file `./resume/docker-compose.yml` replace `[your-server-ip]` by your actual IP local address of your machine.

Then: `docker compose up -d`.

Finally, go to http://localhost:3000/ and create an account.

## Complete resume

Made with [RenderCV](https://rendercv.com/).

Needs Python: https://www.python.org/downloads/.

Then install with `pip install "rendercv[full]"` and regenerate files with:

```shell
rendercv render "thomas-cicognani-complete-resume.yaml"
```

## Formatters and linters

To verify and format the project files, a [Deno](https://deno.com/) shortcut is available, so you can run `deno task check` (or see `deno.json` for the detailed command line).

### For Typescript and CSS

Uses [Biome](https://biomejs.dev/).

### For Nunjuncks

Uses [djLint](https://www.djlint.com/).

Needs Python: https://www.python.org/

Then run `pip install djlint`. Maybe you'll need to add djlint to PATH.
