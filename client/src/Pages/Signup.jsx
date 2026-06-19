import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import './Signup.css'

const shellVariants = {
	hidden: { opacity: 0, y: 18 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.45,
			ease: 'easeOut',
			staggerChildren: 0.08,
		},
	},
}

const panelVariants = {
	hidden: { opacity: 0, y: 22 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

function Signup() {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
	})
	const [successMessage, setSuccessMessage] = useState('')

	const handleChange = (event) => {
		const { name, value } = event.target

		setFormData((current) => ({
			...current,
			[name]: value,
		}))
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		setSuccessMessage('Account created successfully')
	}

	useEffect(() => {
		if (!successMessage) {
			return undefined
		}

		const redirectTimer = window.setTimeout(() => {
			window.location.href = '/login'
		}, 1600)

		return () => window.clearTimeout(redirectTimer)
	}, [successMessage])

	return (
			<motion.main
				className="auth-page auth-page--signup"
				initial="hidden"
				animate="visible"
				variants={shellVariants}
			>
				<motion.section className="auth-shell" variants={shellVariants}>
					<motion.div className="auth-visual" variants={panelVariants}>
					<p className="auth-kicker">Create account</p>
					<h1>Get started with Northstar</h1>
					<p>
						Set up your account in a few seconds and move into a cleaner way of working.
					</p>
					</motion.div>

					<motion.div className="auth-form-panel" variants={panelVariants}>
					<a className="auth-brand" href="/login">
						<span aria-hidden="true" />
						<strong>Northstar</strong>
					</a>

					<div className="auth-header">
						<p className="auth-kicker auth-kicker--muted">Signup</p>
						<h2>Create your account</h2>
						<p>Use the form below to create your new account.</p>
					</div>

					{successMessage ? <p className="success-banner">{successMessage}</p> : null}

					<form className="auth-form" onSubmit={handleSubmit}>
						<label htmlFor="fullName">Full name</label>
						<input
							id="fullName"
							name="fullName"
							type="text"
							placeholder="Your name"
							value={formData.fullName}
							onChange={handleChange}
							required
						/>

						<label htmlFor="email">Email address</label>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="name@example.com"
							value={formData.email}
							onChange={handleChange}
							required
						/>

						<label htmlFor="password">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							placeholder="Create a password"
							value={formData.password}
							onChange={handleChange}
							required
						/>

						<button type="submit" className="primary-button">
							Create account
						</button>
					</form>

					<p className="signup-link">
						Already have an account? <a href="/login">Sign in</a>
					</p>
					</motion.div>
				</motion.section>
			</motion.main>
	)
}

export default Signup
