# shaduk.github.io

A compact personal blog built with the same core stack as steipete.me: Astro,
Tailwind CSS, MDX content, RSS, and sitemap generation.

## Commands

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

Posts live in `src/content/posts`. Add a new `.mdx` file with `title`,
`description`, `pubDate`, `minutes`, and `tags` frontmatter.

The production site is configured for `https://shadkhan.com` via GitHub Pages.
The domain registrar should point the apex domain at GitHub Pages using the
standard GitHub Pages `A` and `AAAA` records.

