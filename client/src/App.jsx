import './App.css'
import Home from './Pages/Home.jsx'
import Login from './Pages/login.jsx'
import Signup from './Pages/signup.jsx'

function App() {
	const pathname = window.location.pathname.toLowerCase()

	if (pathname === '/home') {
		return <Home />
	}

	if (pathname === '/signup') {
		return <Signup />
	}

	return <Login />

}


export default App
