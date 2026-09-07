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

Pre-launch: the page carries no contract address at all. Both CA boxes read `coming soon`,
and the buy / chart / explorer links are replaced by the X account and the X community.

At launch, search `index.html` for `at launch:` — five HTML comments mark every spot that
needs the address:

1. hero CA chip — put the address in the `code` element, drop the `ca--pending` class,
   add the copy button back (`<button class="ca__copy" data-copy="ADDRESS">copy</button>`)
2. hero buttons — swap the two X buttons for buy on base / basescan / dexscreener
3. nav button — point it at the chart instead of `#onchain`
4. onchain block — same treatment as the hero chip, then put the explorer rows back
   in `.onchain__links`
5. footer links — restore basescan and dexscreener

`main.js` needs no change; the copy handler binds to any `[data-copy]` element.

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
  in the footer of `index.html`. X is already wired up:
  [@maxcoinisbased](https://x.com/maxcoinisbased) in the nav, the community band, the footer
  and the `twitter:site` meta tag, and the
  [X community](https://x.com/i/communities/1992156120572735753) in the community band
  and the footer.
- Optionally add a real `favicon.ico`; the page currently points browsers at `newlogo.jpg`.
