Northstar Audio

Northstar Audio is a React + Vite earbuds storefront. It features a landing page for browsing different types of earbuds, a navbar search bar, reusable product cards, and API-backed product data.

Features

- Responsive earbuds storefront UI
- Navbar with search filtering
- Reusable product card component
- Product images, prices, ratings, and feature lists
- API-powered product catalog
- Login and signup pages

Tech Stack

- React 19
- Vite
- Axios
- CSS modules via plain CSS files

API

The product cards load data from:

- `https://sample-e-1.onrender.com/product/getproducts`

Product images returned as relative upload paths are automatically prefixed with the backend URL.

Getting Started

Prerequisites

- Node.js
- npm

Install Dependencies

```bash
npm install
```

Run the App

```bash
npm run dev
```
Build for Production

```bash
npm run build
```

Preview the Production Build

```bash
npm run preview
```

Lint the Project

```bash
npm run lint
```

Project Structure

```text
src/
	Components/
		Card.jsx
		Navbar.jsx
	Pages/
		Home.jsx
		Login.jsx
		Signup.jsx
	App.jsx
	main.jsx
```

Notes

- The home page shows earbuds in reusable cards.
- The navbar search filters the visible products on the home page.
- This project uses local page routing based on the browser path.

License

No license has been added yet.
