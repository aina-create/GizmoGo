import { useMemo, useState } from 'react'
import { z } from 'zod'
import './Addproduct.css'

const LOCAL_PRODUCTS_STORAGE_KEY = 'northstar-products'

const productSchema = z.object({
	name: z.string().trim().min(1, 'Product name is required'),
	category: z.string().trim().min(1, 'Category is required'),
	price: z.string().trim().min(1, 'Price is required'),
	stock: z.string().trim().min(1, 'Stock is required'),
	description: z.string().trim().min(1, 'Description is required'),
	image: z.string().trim().url('Enter a valid image URL').or(z.literal('')),
	featured: z.boolean(),
})

const initialFormState = {
	name: '',
	category: '',
	price: '',
	stock: '',
	description: '',
	image: '',
	featured: true,
}

function Addproduct() {
	const [formData, setFormData] = useState(initialFormState)
	const [errors, setErrors] = useState({})
	const [successMessage, setSuccessMessage] = useState('')

	const previewCard = useMemo(
		() => ({
			badge: formData.featured ? 'Featured' : 'Standard',
			title: formData.name || 'Product name preview',
			description: formData.description || 'Product description preview',
			price: formData.price ? `₹${Number(formData.price).toLocaleString('en-IN')}` : '₹0',
			rating: formData.stock ? `Stock ${formData.stock}` : 'Stock 0',
			image: formData.image,
			features: [
				formData.category ? `Category: ${formData.category}` : 'Category: not set',
				formData.featured ? 'Promoted in the featured list' : 'Regular listing',
			],
		}),
		[formData]
	)

	const handleChange = (event) => {
		const { name, type, checked, value } = event.target

		setFormData((current) => ({
			...current,
			[name]: type === 'checkbox' ? checked : value,
		}))

		if (name in errors) {
			setErrors((current) => ({
				...current,
				[name]: undefined,
			}))
		}

		if (successMessage) {
			setSuccessMessage('')
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		const validation = productSchema.safeParse(formData)

		if (!validation.success) {
			const fieldErrors = validation.error.flatten().fieldErrors

			setErrors({
				name: fieldErrors.name?.[0],
				category: fieldErrors.category?.[0],
				price: fieldErrors.price?.[0],
				stock: fieldErrors.stock?.[0],
				description: fieldErrors.description?.[0],
				image: fieldErrors.image?.[0],
			})
			return
		}

		const product = {
			...validation.data,
			price: Number(validation.data.price),
			stock: Number(validation.data.stock),
			createdAt: new Date().toISOString(),
		}

		const storedProducts = JSON.parse(window.localStorage.getItem(LOCAL_PRODUCTS_STORAGE_KEY) || '[]')
		window.localStorage.setItem(
			LOCAL_PRODUCTS_STORAGE_KEY,
			JSON.stringify([product, ...storedProducts])
		)

		setErrors({})
		setSuccessMessage('Product added successfully')
		setFormData(initialFormState)
	}

	return (
		<main className="add-product-page">
			<section className="add-product-shell">
				<div className="add-product-hero">
					<p className="add-product-kicker">Product admin</p>
					<h1>Add a new product</h1>
					<p>
						Create a new product entry with the details you want to show in the catalog.
							The form stores the item locally so the home page can show it right away.
					</p>

					<div className="add-product-notes">
						<div>
							<span>01</span>
							<p>Validate the product details before saving.</p>
						</div>
						<div>
							<span>02</span>
							<p>Preview the card layout before publishing.</p>
						</div>
					</div>
				</div>

				<div className="add-product-panel">
					<div className="add-product-header">
						<p className="add-product-kicker add-product-kicker--muted">New product</p>
						<h2>Fill in the product details</h2>
					</div>

					{successMessage ? <p className="add-product-success">{successMessage}</p> : null}

					<form className="add-product-form" onSubmit={handleSubmit}>
						<label htmlFor="name">Product name</label>
						<input
							id="name"
							name="name"
							type="text"
							placeholder="Wireless Earbuds X1"
							value={formData.name}
							onChange={handleChange}
							aria-invalid={Boolean(errors.name)}
							aria-describedby={errors.name ? 'name-error' : undefined}
						/>
						{errors.name ? <p className="field-error" id="name-error">{errors.name}</p> : null}

						<label htmlFor="category">Category</label>
						<input
							id="category"
							name="category"
							type="text"
							placeholder="Audio"
							value={formData.category}
							onChange={handleChange}
							aria-invalid={Boolean(errors.category)}
							aria-describedby={errors.category ? 'category-error' : undefined}
						/>
						{errors.category ? <p className="field-error" id="category-error">{errors.category}</p> : null}

						<div className="add-product-grid">
							<div>
								<label htmlFor="price">Price</label>
								<input
									id="price"
									name="price"
									type="number"
									min="0"
									step="1"
									placeholder="1499"
									value={formData.price}
									onChange={handleChange}
									aria-invalid={Boolean(errors.price)}
									aria-describedby={errors.price ? 'price-error' : undefined}
								/>
								{errors.price ? <p className="field-error" id="price-error">{errors.price}</p> : null}
							</div>

							<div>
								<label htmlFor="stock">Stock</label>
								<input
									id="stock"
									name="stock"
									type="number"
									min="0"
									step="1"
									placeholder="25"
									value={formData.stock}
									onChange={handleChange}
									aria-invalid={Boolean(errors.stock)}
									aria-describedby={errors.stock ? 'stock-error' : undefined}
								/>
								{errors.stock ? <p className="field-error" id="stock-error">{errors.stock}</p> : null}
							</div>
						</div>

						<label htmlFor="image">Image URL</label>
						<input
							id="image"
							name="image"
							type="url"
							placeholder="https://example.com/product.jpg"
							value={formData.image}
							onChange={handleChange}
							aria-invalid={Boolean(errors.image)}
							aria-describedby={errors.image ? 'image-error' : undefined}
						/>
						{errors.image ? <p className="field-error" id="image-error">{errors.image}</p> : null}

						<label htmlFor="description">Description</label>
						<textarea
							id="description"
							name="description"
							rows="5"
							placeholder="Describe the product features and target audience"
							value={formData.description}
							onChange={handleChange}
							aria-invalid={Boolean(errors.description)}
							aria-describedby={errors.description ? 'description-error' : undefined}
						/>
						{errors.description ? <p className="field-error" id="description-error">{errors.description}</p> : null}

						<label className="checkbox-row add-product-checkbox" htmlFor="featured">
							<input
								id="featured"
								name="featured"
								type="checkbox"
								checked={formData.featured}
								onChange={handleChange}
							/>
							<span>Show this product as featured</span>
						</label>

						<button type="submit" className="primary-button add-product-button">
							Save product
						</button>
					</form>
				</div>

				<aside className="add-product-preview" aria-label="Product preview">
					<p className="add-product-kicker add-product-kicker--muted">Live preview</p>
					<article className="add-product-card">
						{previewCard.image ? (
							<img src={previewCard.image} alt={previewCard.title} className="add-product-card-image" />
						) : null}
						<span className="home-card-badge">{previewCard.badge}</span>
						<h3>{previewCard.title}</h3>
						<p>{previewCard.description}</p>
						<ul className="home-card-features">
							{previewCard.features.map((feature) => (
								<li key={feature}>{feature}</li>
							))}
						</ul>
						<div className="home-card-row home-card-row--bottom">
							<div>
								<strong>{previewCard.price}</strong>
								<span>{previewCard.rating}</span>
							</div>
							<span className="add-product-preview-note">Ready to publish</span>
						</div>
					</article>
				</aside>
			</section>
		</main>
	)
}

export default Addproduct
