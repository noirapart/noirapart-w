# NOIR A PART Website

This is the website for NOIR A PART, a cultural platform dedicated to African and Afro-diasporic art.

The site presents exhibitions, interviews, artist profiles, and ways for visitors to get in touch.

## What Visitors Can Do

- Discover current and past exhibitions.
- Read interviews with artists and cultural voices.
- Browse artist profiles.
- Switch between French and English.
- Use light or dark mode.
- Prepare an email to contact NOIR A PART.
- Prepare an email to join the newsletter.

## Main Pages

### Home

Introduces NOIR A PART and guides visitors to the main areas of the site.

### Exhibitions

Shows featured, current, upcoming, and past exhibitions. Visitors can open each exhibition to read more details.

### Interviews

Shows editorial conversations with artists and thinkers. Visitors can open each interview to read the full text.

### Artists

Shows artist profiles, locations, disciplines, biographies, and contact prompts.

## Accessibility and Usability

The site has been updated so it is easier to use for more people:

- Cards can be opened with a keyboard.
- Pop-up detail windows can be closed with Escape.
- Keyboard focus is visible.
- Motion is reduced for visitors who prefer less animation.
- Contact and newsletter actions now open email drafts instead of pretending a message was already sent.

## Previewing the Site

If the site is running locally, open:

```text
http://127.0.0.1:3002
```

## For Maintainers

Install the project:

```bash
npm install
```

Start the local preview:

```bash
npm run dev -- -p 3002 -H 127.0.0.1
```

Check that the site builds:

```bash
npm run build
```

The public contact email is set in:

```text
lib/contact.ts
```
