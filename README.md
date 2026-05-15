# NplusOne Landing Page

A simple, mobile-first landing page for NplusOne, built with React, Vite, TypeScript, Tailwind CSS, Framer Motion and lucide-react.

## Local Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Current Testing Focus

During active development, the primary QA target is the laptop layout. Use common laptop viewport sizes such as `1280 x 800` and `1366 x 768` for design checks. The mobile layout remains responsive, but final mobile tuning can be done at the end.

## Google Sheet Enquiry Form Setup

The frontend posts enquiries to a Google Apps Script web app. The placeholder is stored in `.env.example`.

1. Create a new Google Sheet.
2. Copy the spreadsheet ID from the Sheet URL.
3. Open `Extensions > Apps Script`.
4. Paste the contents of `google-apps-script/Code.gs` into `Code.gs`.
5. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with your spreadsheet ID.
6. Click `Deploy > New deployment > Web app`.
7. Set `Execute as` to `Me`.
8. Set access to `Anyone`.
9. Deploy and copy the web app URL.
10. Create a local `.env` file and add:

```bash
VITE_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

Replace the value with the deployed web app URL. Restart `npm run dev` after changing `.env`.

## GitHub Pages Deployment

This project is configured for a custom-domain GitHub Pages deployment at `https://letsnplus.one/`.

- `vite.config.ts` uses `base: "/"`, which is correct for a custom domain.
- `public/CNAME` contains `letsnplus.one`.
- Run `npm run build` and deploy the `dist` folder through GitHub Pages or a GitHub Actions workflow.

Recommended GitHub Pages settings:

1. Push the project to GitHub.
2. Go to `Settings > Pages`.
3. Choose GitHub Actions or deploy the `dist` output from your preferred workflow.
4. Confirm the custom domain is `letsnplus.one`.
5. Configure DNS for the domain according to GitHub Pages requirements.

## Editing Content

- Main landing page copy and section data: `src/data/siteContent.ts`
- Header: `src/components/Header.tsx`
- Hero: `src/components/Hero.tsx`
- Form fields and submission behavior: `src/components/ContactForm.tsx`
- Footer: `src/components/Footer.tsx`
- Global styling: `src/styles/index.css`

## Brand Assets

The selected logo is the exact approved embedded-raster SVG and is copied without modification from:

```text
/Users/sailsabnis/Insig8/brand-assets/nplusone-logo/svg/nplusone-logo-exact-raster-embedded.svg
```

The site uses:

```text
public/assets/nplusone-logo.svg
```

Do not edit the SVG contents. Replace that file only if the approved final logo source changes.

## WhatsApp

The footer and contact panel use:

```text
src/data/siteContent.ts
```

Current WhatsApp number: `+91 9699390141`

The WhatsApp link is configured as `https://wa.me/919699390141`.
