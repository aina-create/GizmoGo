import { useEffect, useState } from 'react'
import axios from 'axios'

const PRODUCTS_API_URL = 'https://sample-e-1.onrender.com/product/getproducts'
const LOCAL_PRODUCTS_STORAGE_KEY = 'northstar-products'
const IMAGE_BASE_URL = 'https://sample-e-1.onrender.com'

export const earbudProducts = [
	{
		badge: 'Best Seller',
		title: 'Aurora Pulse X',
		image:
			'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
		imageAlt: 'Premium wireless earbuds with a sleek charging case',
		description: 'Studio-grade sound and plush comfort for all-day listening without compromise.',
		price: '$149',
		rating: '4.9/5',
		features: ['ANC', '28-hour battery', 'Instant pairing'],
		actionLabel: 'Buy now',
		href: '#featured',
	},
	{
		badge: 'New Favourite',
		title: 'StormFit Pro',
		image:
			'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
		imageAlt: 'Sporty wireless earbuds designed for movement',
		description: 'Built to stay locked in during workouts, commutes, and every burst of motion.',
		price: '$109',
		rating: '4.8/5',
		features: ['Sweat proof', 'Secure fit', 'Deep bass'],
		actionLabel: 'Buy now',
		href: '#collections',
	},
	{
		badge: 'Game Night',
		title: 'ShadowLink Air',
		image:
			'https://images.unsplash.com/photo-1491927570842-0261e477d937?auto=format&fit=crop&w=900&q=80',
		imageAlt: 'Stylish black earbuds with a glossy charging case',
		description: 'Ultra-low latency and crisp voice clarity for gaming, calls, and binge sessions.',
		price: '$129',
		rating: '4.7/5',
		features: ['Low latency', 'Dual mic', 'Lag-free play'],
		actionLabel: 'Buy now',
		href: '#deals',
	},
	{
		badge: 'Pocket Power',
		title: 'Nova Mini',
		image:
			'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
		imageAlt: 'Compact wireless earbuds in a slim charging case',
		description: 'Small enough to carry everywhere, powerful enough to sound amazing all day.',
		price: '$89',
		rating: '4.6/5',
		features: ['Compact case', '12-hour battery', 'Quick charge'],
		actionLabel: 'Buy now',
		href: '#featured',
	},
]

const formatPrice = (price) => {
	if (price === undefined || price === null || price === '') {
		return ''
	}

	return `₹${Number(price).toLocaleString('en-IN')}`
}

const getImageUrl = (image) => {
	if (!image) {
		return ''
	}

	if (/^https?:\/\//i.test(image)) {
		return image
	}

	return `${IMAGE_BASE_URL}/${image.replace(/^\/+/, '')}`
}

const mapApiProducts = (items) =>
	items.map((item) => ({
		badge: item.category || 'Featured',
		title: item.name || 'Unnamed product',
		image: getImageUrl(item.image),
		imageAlt: item.name ? `${item.name} product image` : 'Product image',
		description: item.description || 'No description available.',
		price: formatPrice(item.price),
		rating: item.stock !== undefined ? `Stock ${item.stock}` : '',
		features: [item.category ? `Category: ${item.category}` : '', item.stock !== undefined ? `Stock: ${item.stock}` : ''].filter(Boolean),
		actionLabel: 'Buy now',
		href: '#featured',
	}))

const mapLocalProducts = (items) =>
	items.map((item) => ({
		badge: item.featured ? 'Featured' : item.category || 'New',
		title: item.name || item.title || 'Unnamed product',
		image: getImageUrl(item.image),
		imageAlt: item.name ? `${item.name} product image` : 'Product image',
		description: item.description || 'No description available.',
		price: formatPrice(item.price),
		rating: item.stock !== undefined ? `Stock ${item.stock}` : '',
		features: [
			item.category ? `Category: ${item.category}` : '',
			item.featured ? 'Saved from add product page' : '',
			item.stock !== undefined ? `Stock: ${item.stock}` : '',
		].filter(Boolean),
		actionLabel: 'Buy now',
		href: '#featured',
	}))

const dedupeProducts = (items) => {
	const seen = new Set()

	return items.filter((item) => {
		const key = [item.title, item.description, item.price, item.badge].join('|')

		if (seen.has(key)) {
			return false
		}

		seen.add(key)
		return true
	})
}

function Card({
	badge,
	title,
	image,
	imageAlt = '',
	description,
	price,
	rating,
	features = [],
	className = '',
	actionLabel,
	href = '#',
}) {
	return (
		<article className={`home-card ${className}`.trim()}>
			{image ? <img className="home-card-image" src={image} alt={imageAlt || title || ''} loading="lazy" /> : null}
			{badge ? <span className="home-card-badge">{badge}</span> : null}
			{title ? <h2>{title}</h2> : null}
			{description ? <p>{description}</p> : null}

			{features.length > 0 ? (
				<ul className="home-card-features" aria-label={`${title} features`}>
					{features.map((feature) => (
						<li key={feature}>{feature}</li>
					))}
				</ul>
			) : null}

			<div className="home-card-row home-card-row--bottom">
				<div>
					{price ? <strong>{price}</strong> : null}
					{rating ? <span>{rating}</span> : null}
				</div>
				{actionLabel ? (
					<a className="home-card-button" href={href}>
						{actionLabel}
					</a>
				) : null}
			</div>
		</article>
	)
}

export function ProductCatalog({ searchTerm = '' }) {
	const [products, setProducts] = useState(earbudProducts)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const normalizedSearchTerm = searchTerm.trim().toLowerCase()

	useEffect(() => {
		let isMounted = true

		const loadProducts = () => {
			const localProducts = JSON.parse(window.localStorage.getItem(LOCAL_PRODUCTS_STORAGE_KEY) || '[]')
			const curatedProducts = dedupeProducts(earbudProducts)

			if (isMounted) {
				setProducts(curatedProducts)
				setError('')
			}

			if (isMounted) {
				setLoading(false)
			}
		}

		loadProducts()

		return () => {
			isMounted = false
		}
	}, [])

	if (loading) {
		return (
			<section className="home-features" aria-label="Earbud collections" id="collections">
				<div className="home-card home-card--status">
					<p>Loading products...</p>
				</div>
			</section>
		)
	}

	if (error) {
		return (
			<section className="home-features" aria-label="Earbud collections" id="collections">
				<div className="home-card home-card--status">
					<p>{error}</p>
				</div>
			</section>
		)
	}

	if (products.length === 0) {
		return (
			<section className="home-features" aria-label="Earbud collections" id="collections">
				<div className="home-card home-card--status">
					<p>No products found.</p>
				</div>
			</section>
		)
	}

	const visibleProducts = normalizedSearchTerm
		? products.filter((product) => {
				const searchableText = [
					product.title,
					product.badge,
					product.description,
					product.price,
					product.rating,
					...(product.features || []),
				]
					.join(' ')
					.toLowerCase()

				return searchableText.includes(normalizedSearchTerm)
		  })
		: products

	if (visibleProducts.length === 0) {
		return (
			<section className="home-features" aria-label="Earbud collections" id="collections">
				<div className="home-card home-card--status">
					<p>No earbuds match your search.</p>
				</div>
			</section>
		)
	}

	return (
		<section className="home-features" aria-label="Earbud collections" id="collections">
			{visibleProducts.map((product) => (
				<Card key={`${product.title}-${product.price}`} {...product} />
			))}
		</section>
	)
}

export default Card