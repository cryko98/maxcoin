# MAXCOIN — $MAXCOIN on Base

Static site for the $MAXCOIN memecoin on Base, built around the 2014 Maxcoin story:
a Bitcoin fork (Keccak instead of SHA-256) created by Jordan Fish (@cobie) and Luke Mitchell,
named after Max Keiser, whose genesis block was mined live on Keiser Report episode 555
on 28 January 2014.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole page |
| `styles.css` | Styling — electric blue on black, taken from the coin and the banner |
| `main.js` | Copy-to-clipboard, mobile menu, scroll reveals, hero hash field |
| `newlogo.jpg` | The coin. Logo, favicon, nav and footer mark |
| `banner.jpg` | The up only banner. Full-bleed strip under the hero, and the OG / Twitter card image |
| `logo.jfif` | The flat 2014 mark. Kept for reference, not used by the page |

No build step, no dependencies. Fonts load from Google Fonts.

Both artworks are shot on pure black, so they are composited with `mix-blend-mode: screen`
over the black page — that drops their backgrounds out completely and lets the coin's glow
show through. If you ever swap in artwork on a different background, remove that property.

## Contract

Base: `0xb20000000000000000000057b754cfd33e493f01`

The address appears in `index.html` in several places (hero chip, hero buttons, onchain block,
footer links). Search and replace if it ever changes.

## Local preview

```
npx http-server . -p 5175 -c-1
```

Then open http://localhost:5175 — opening `index.html` straight from disk works too.

## Deploy

Any static host. For GitHub Pages: push to `main`, then Settings → Pages → deploy from
branch `main`, folder `/ (root)`.

## To do before launch

- Add the project's Telegram link — the placeholder is marked with an HTML comment
  in the footer of `index.html`. X is already wired to
  [@maxcoinisbased](https://x.com/maxcoinisbased) in the nav, the footer and the
  `twitter:site` meta tag.
- Optionally add a real `favicon.ico`; the page currently points browsers at `newlogo.jpg`.
