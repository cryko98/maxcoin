# MAXCOIN — $MAXCOIN on Base

Static site for the $MAXCOIN memecoin on Base, built around the 2014 Maxcoin story:
a Bitcoin fork (Keccak instead of SHA-256) created by Jordan Fish (@cobie) and Luke Mitchell,
named after Max Keiser, whose genesis block was mined live on Keiser Report episode 555
on 28 January 2014.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole page |
| `styles.css` | Styling — gold/near-black palette taken from the 2014 mark |
| `main.js` | Copy-to-clipboard, mobile menu, scroll reveals, hero hash field |
| `logo.jfif` | Logo, also used as favicon and OG image |

No build step, no dependencies. Fonts load from Google Fonts.

## Contract

Base: `0xb20000000000000000000057b754cfd33e493f01`

The address appears in `index.html` in five places (hero chip, hero buttons, onchain block,
footer links, meta). Search and replace if it ever changes.

## Local preview

```
npx http-server . -p 5175 -c-1
```

Then open http://localhost:5175 — opening `index.html` straight from disk works too.

## Deploy

Any static host. For GitHub Pages: push to `main`, then Settings → Pages → deploy from
branch `main`, folder `/ (root)`.

## To do before launch

- Add the project's X and Telegram links — placeholders are marked with an HTML comment
  in the footer of `index.html`.
- Optionally replace `logo.jfif` with a transparent PNG plus a real `favicon.ico`.
