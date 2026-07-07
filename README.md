# NOIR A PART Web

NOIR A PART is a bilingual editorial gallery site for African and Afro-diasporic art, culture, exhibitions, interviews, and artist profiles.

## Tech Stack

- Next.js 15 App Router
- React 19
- Tailwind CSS 4
- Motion for page and interaction animation
- Lucide React icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev -- -p 3002 -H 127.0.0.1
```

Open:

```text
http://127.0.0.1:3002
```

Build for production:

```bash
npm run build
```

## Project Structure

```text
app/          Next.js routes, layout, global styles
components/   Shared UI and page sections
contexts/     Language context
lib/          Translations, utilities, shared config
public/       Runtime image assets
Assets/       Source image assets
```

## UX and Accessibility Notes

- Core cards open content in accessible dialogs with focus trapping, Escape close, focus restore, and scroll lock.
- Interactive cards use semantic buttons instead of click-only containers.
- Global focus-visible styles are enabled for keyboard navigation.
- Reduced-motion preferences are respected through MotionConfig and CSS.
- Contact and newsletter forms prepare prefilled email drafts instead of showing false sent/subscribed states.
- Google-hosted runtime font loading was removed so production builds work offline.

## Contact Config

The public contact address is defined in:

```text
lib/contact.ts
```

Update `CONTACT_EMAIL` there when the production inbox is final.
