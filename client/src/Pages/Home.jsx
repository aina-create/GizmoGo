import { useState } from 'react'
import Navbar from '../Components/Navbar.jsx'
import Card, { ProductCatalog } from '../Components/Card.jsx'
import './Home.css'

const SESSION_STORAGE_KEY = 'northstar-session'
const AUTH_TOKEN_KEY = 'northstar-token'

function Home() {
	const [searchTerm, setSearchTerm] = useState('')

	const handleSignOut = () => {
		window.localStorage.removeItem(SESSION_STORAGE_KEY)
		window.localStorage.removeItem(AUTH_TOKEN_KEY)
		window.location.href = '/login'
	}

	return (
		<main className="home-page" id="top">
			<Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
			<section className="home-hero">
				<div className="home-copy">
					<p className="home-kicker">New arrivals</p>
					<h1>Find earbuds that fit your sound</h1>
					<p className="home-intro">
						Shop different types of earbuds for music, workouts, gaming, and everyday listening.
					</p>

					<div className="home-actions">
						<a className="home-primary" href="#featured">
							Shop featured earbuds
						</a>
						<a className="home-secondary" href="#collections">
							Browse collections
						</a>
						<a className="home-add-product" href="/addproduct">
							Add product
						</a>
						<button type="button" className="home-signout" onClick={handleSignOut}>
							Sign out
						</button>
					</div>
				</div>

				<div className="home-panel" aria-hidden="true" id="featured">
					<Card
						badge="Featured pick"
						title="Browse the latest earbuds"
						description="Product cards below are powered by the Postman API and update from the backend response."
						price="Live data"
						rating="API synced"
						features={['Fetched from /product/getproducts', 'Automatic image loading', 'Reusable card layout']}
						actionLabel="Buy now"
						href="#deals"
						className="home-card--large"
					/>
				</div>
			</section>

			<ProductCatalog searchTerm={searchTerm} />

			<section className="home-banner" id="deals">
				<div>
					<p className="home-kicker">Limited offer</p>
					<h2>Save on the most popular earbuds this week</h2>
					<p>
						Get the best value on wireless audio with curated picks for commuting, exercise, and entertainment.
					</p>
				</div>
				<a className="home-primary" href="#featured">
					Shop deals
				</a>
			</section>
		</main>
	)
}

export default Home
