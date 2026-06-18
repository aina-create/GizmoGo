import { useState } from 'react'
import './Login.css'
import axios from "axios";


function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		rememberMe: true,
	})
	const [showPassword, setShowPassword] = useState(false)

	const handleChange = (event) => {
		const { name, type, checked, value } = event.target

		setFormData((current) => ({
			...current,
			[name]: type === 'checkbox' ? checked : value,
		}))
	}

	// const handleSubmit = (event) => {
	// 	event.preventDefault()
	// 	window.location.href = '/home'
	// }
    const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post(
      "https://sample-e-1.onrender.com/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );

    console.log(response.data);
    window.location.href = "/home";
  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
};

	return (
		<main className="auth-page auth-page--login">
			<section className="auth-shell" aria-label="Login form">
				<div className="auth-visual">
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
				</div>

				<div className="auth-form-panel">
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
							required
						/>

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
							required
						/>

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
				</div>
			</section>
		</main>
	)
}

export default Login
