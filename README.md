# dosebook-web

The website for [Dosebook](https://dosebook.app): one static page and a privacy policy. No build step.

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

- `index.html`, `privacy.html`, `style.css`, `script.js`: the site.
- `assets/img/`: screenshots (WebP) and the app icon. Screenshots come from the demo data in the app
  (`-demo`), never from real records.
- `CNAME`: the custom domain for GitHub Pages. DNS needs an `A`/`ALIAS` record for the apex and a
  `CNAME` for `www` pointing at `<user>.github.io`.

Deploy: GitHub Pages from the `main` branch, root folder.

The app's source lives in the main Dosebook repository (link to be added once it is public). Dosebook builds on
the open-source [Bench](https://github.com/ArunNGun/Bench) by Arun.
