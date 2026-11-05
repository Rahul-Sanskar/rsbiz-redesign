# RSBIZ Premium Website

A premium, colourful React + TypeScript website for RSBIZ Pvt Ltd. Built with Vite, Framer Motion and Lucide icons. No paid themes, plugins or subscriptions are required.

## Design direction
- Brand palette: deep plum, magenta, champagne gold, rose and warm ivory.
- Editorial, high-contrast layouts and bold typography inspired by modern communications-platform websites.
- Responsive navigation, motion reveals, animated service ticker, service cards, FAQ accordion and enquiry form.
- The supplied RSBIZ logo is cropped for practical website placement at `public/images/rsbiz-logo.png`.

## Run locally
1. Install Node.js (LTS).
2. Extract this ZIP and open the folder in VS Code.
3. Open Terminal in VS Code and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL shown by Vite (usually http://localhost:5173).

## Build for hosting
```bash
npm run build
```
Upload the contents of the generated `dist/` folder to your website's document root.

## PHP enquiry form
The form posts to `public/api/contact.php` and sends enquiries to `info@rsbiz.in` using PHP `mail()`.

Important:
- The website must be hosted on a PHP-enabled hosting plan for the form to work.
- Confirm that `info@rsbiz.in` is the correct receiving mailbox.
- Configure/verify outbound mail delivery with your hosting provider. Some hosts require authenticated SMTP instead of PHP `mail()`.
- Test the form on the live server before replacing the current website.
- Keep a backup of the current cPanel website before deployment.

## Image sources
The page uses remotely hosted editorial images. They are loaded from their original image hosts, so an internet connection is required:
- Omnichannel support team: Toolzz blog image CDN.
- Office collaboration: Research.com image CDN.
- Voice and telephony team: CodeAutomation image CDN.
- Marketing collaboration: 7giorni image CDN.
- Web design collaboration: LoadServ image CDN.

Please review the image hosts' licensing/usage terms before commercial production use. Replace the image URLs in `src/App.tsx` with licensed brand photography or your own images if required.

## Content and accuracy
The service descriptions and company metrics were adapted from publicly indexed pages on rsbiz.in. The achievements shown (100+ projects, 85+ happy customers, 3 awards) reflect the existing site's published figures. Please verify all figures, service claims, address and contact email before launch.
