# Chat App

> Note: This repository contains the finalized version of the project, forked from another of my repositories. As a result, there are few or no commits here aside from the initial import.

A responsive chat application with user authentication and a clean, mobile-friendly UI. Register or log in, exchange messages with a support bot, delete your own messages, and enjoy a polished experience with sensible error handling and secure message sanitization.

## Features

- Register and login with CSRF and JWT handling
- Random avatar generation on registration, avatar persisted in session
- Chat UI with bubbles, avatars, timestamps, and delete button for your own messages
- Input box with send flow and automatic support-bot reply
- Responsive, accessible styles using CSS variables and a clear class hierarchy
- Clean separation of concerns: services (API) vs. UI components
- Mock fallback for messages when API is unavailable
- Client-side routing for pages (login, register, chat)

## Project Structure

```
public/
	_redirects             # SPA fallback (/* -> /index.html)
	favicon.ico
chat-app/
	index.html             # Vite HTML
	vite.config.js         # Vite config
	package.json           # Scripts and dependencies
	eslint.config.js
	src/
		App.jsx              # App shell and routes
		index.css            # Global styles (chat + auth + nav)
		main.jsx             # Entry (React + Vite)
		mocks.js             # Mock messages for offline/API fallback
		services.js          # Auth + messages API (csrf, jwt, CRUD)
		components/
			nav.jsx            # SideNav (hamburger) with logout
			chat.jsx           # Chat view (list, send, delete, sanitize)
			auth/
				login.jsx        # Login form
				register.jsx     # Register form (random avatar)
```

## Getting Started

From this folder (`chat-app/`):

```powershell
npm install
npm run dev
```

Then open http://localhost:5173.

### Build & Preview

```powershell
npm run build
npm run preview
```

- Output goes to `dist/`.
- Files in `public/` (including `_redirects`) are copied to `dist/` automatically by Vite.

## API & Security

- API base: https://chatify-api.up.railway.app
- Endpoints used:
	- `PATCH /csrf` to obtain a CSRF token (stored in `localStorage`)
	- `POST /auth/register` to create an account (sets avatar in `sessionStorage`)
	- `POST /auth/token` to log in (JWT stored in `sessionStorage`)
	- `GET /messages` to fetch messages (requires Bearer JWT)
	- `POST /messages` to send a message (returns latest message id)
	- `DELETE /messages/:id` to delete a user message
- Message content is sanitized with DOMPurify before rendering.

## Environment Variables

None required for local development. The API host is hard-coded in `src/services.js`. If you need to point to a different backend, update the URLs in that file (and optionally configure a Vite dev server proxy).

## Deploying to Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Ensure `_redirects` exists in `public/` (it will be copied to `dist/_redirects`).

## Styling Notes

- Uses CSS variables (e.g., `--accent`, `--border`, `--radius`) for easy theming.
- Chat layout includes message bubbles, timestamps, and avatars.
- Auth pages use a clear CSS class hierarchy (e.g., `.register-page > .register-card > .register-form > .register-field`).
- Styles are mobile-friendly with reasonable spacing and touch targets.

## Notes & Troubleshooting

- If registration/login fails, verify the API is reachable and cookies aren’t blocked (CSRF flow uses `credentials: include`).
- If you get message errors, ensure a valid JWT is present in `sessionStorage`.
- You can clear `localStorage`/`sessionStorage` to reset CSRF/JWT/avatar and try again.
- A fallback mock message list is used if fetching messages fails.

## License

MIT
