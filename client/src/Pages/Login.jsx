import { useEffect, useState } from 'react'
import { z } from 'zod'
import { motion } from 'motion/react'
import './Login.css'
import axios from "axios";

const loginSchema = z.object({
	email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
	password: z.string().min(1, 'Password is required'),
})

const SESSION_STORAGE_KEY = 'northstar-session'
const AUTH_TOKEN_KEY = 'northstar-token'
const REMEMBERED_EMAIL_KEY = 'northstar-remembered-email'

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


function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		rememberMe: true,
	})
	const [errors, setErrors] = useState({})
	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		const rememberedEmail = window.localStorage.getItem(REMEMBERED_EMAIL_KEY)

		if (!rememberedEmail) {
			return
		}

		setFormData((current) => ({
			...current,
			email: rememberedEmail,
			rememberMe: true,
		}))
	}, [])

	const handleChange = (event) => {
		const { name, type, checked, value } = event.target

		setFormData((current) => ({
			...current,
			[name]: type === 'checkbox' ? checked : value,
		}))

		if (name === 'email' || name === 'password') {
			setErrors((current) => ({
				...current,
				[name]: undefined,
			}))
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		const validation = loginSchema.safeParse({
			email: formData.email,
			password: formData.password,
		})

		if (!validation.success) {
			const fieldErrors = validation.error.flatten().fieldErrors

			setErrors({
				email: fieldErrors.email?.[0],
				password: fieldErrors.password?.[0],
			})
			return
		}

		setErrors({})

		try {
			const response = await axios.post(
				'https://sample-e-1.onrender.com/login',
				{
					email: validation.data.email,
					password: validation.data.password,
				}
			)

			const token =
				response.data?.token ||
				response.data?.accessToken ||
				response.data?.jwt ||
				response.data?.data?.token ||
				response.data?.data?.accessToken ||
				''

			if (token) {
				window.localStorage.setItem(AUTH_TOKEN_KEY, token)
			}

			const sessionData = {
				email: validation.data.email,
				loggedInAt: new Date().toISOString(),
				token,
				response: response.data,
			}

			window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData))

			if (formData.rememberMe) {
				window.localStorage.setItem(REMEMBERED_EMAIL_KEY, validation.data.email)
			} else {
				window.localStorage.removeItem(REMEMBERED_EMAIL_KEY)
			}

			console.log(response.data)
			window.location.href = '/home'
		} catch (error) {
			console.error(error)
			alert('Login failed')
		}
	}

	return (
			<motion.main
				className="auth-page auth-page--login"
				initial="hidden"
				animate="visible"
				variants={shellVariants}
			>
				<motion.section className="auth-shell" aria-label="Login form" variants={shellVariants}>
					<motion.div className="auth-visual" variants={panelVariants}>
					<p className="auth-kicker">Welcome back</p>
					<h1>Sign in to continue</h1>
					<p>
						Pick up where you left off and get back into your workspace without extra steps.
					</p>

					<div className="auth-points" aria-hidden="true">
						<div>
							<span>01</span>
							<p>Fast access to your dashboard and saved activity.</p>
						</div>
						<div>
							<span>02</span>
							<p>Secure sign in with a clean, focused layout.</p>
						</div>
					</div>
					</motion.div>

					<motion.div className="auth-form-panel" variants={panelVariants}>
					<a className="auth-brand" href="/">
						<span aria-hidden="true" />
						<strong>Northstar</strong>
					</a>

					<div className="auth-header">
						<p className="auth-kicker auth-kicker--muted">Login</p>
						<h2>Enter your credentials</h2>
						<p>Use your email and password to access your account.</p>
					</div>

					<form className="auth-form" onSubmit={handleSubmit}>
						<label htmlFor="email">Email address</label>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="name@example.com"
							value={formData.email}
							onChange={handleChange}
							autoComplete="email"
							aria-invalid={Boolean(errors.email)}
							aria-describedby={errors.email ? 'email-error' : undefined}
						/>
						{errors.email ? <p className="field-error" id="email-error">{errors.email}</p> : null}

						<div className="password-row">
							<label htmlFor="password">Password</label>
							<button
								type="button"
								className="text-button"
								onClick={() => setShowPassword((current) => !current)}
								aria-pressed={showPassword}
							>
								{showPassword ? 'Hide' : 'Show'}
							</button>
						</div>
						<input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="Enter your password"
							value={formData.password}
							onChange={handleChange}
							autoComplete="current-password"
							aria-invalid={Boolean(errors.password)}
							aria-describedby={errors.password ? 'password-error' : undefined}
						/>
						{errors.password ? <p className="field-error" id="password-error">{errors.password}</p> : null}

						<div className="login-options">
							<label className="checkbox-row" htmlFor="rememberMe">
								<input
									id="rememberMe"
									name="rememberMe"
									type="checkbox"
									checked={formData.rememberMe}
									onChange={handleChange}
								/>
								<span>Remember me</span>
							</label>

							<a href="#" className="text-button">
								Forgot password?
							</a>
						</div>

						<button type="submit" className="primary-button">
							Sign in
						</button>
					</form>

					<div className="signup-callout">
						<div>
							<p className="auth-kicker auth-kicker--muted">New here?</p>
							<h3>Create an account in a few seconds</h3>
							<p>If you do not have an account yet, use the signup page to get started.</p>
						</div>
						<a className="signup-button" href="/signup">
							Create account
						</a>
					</div>

					<p className="signup-link-inline">
						Don&apos;t have an account? <a href="/signup">Sign up</a>
					</p>
					</motion.div>
				</motion.section>
			</motion.main>
	)
}

export default Login
