import './App.css'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Addproduct from './Pages/Addproduct.jsx'

function App() {
	const pathname = window.location.pathname.toLowerCase()

	if (pathname === '/home') {
		return <Home />
	}

	if (pathname === '/signup') {
		return <Signup />
	}

	if (pathname === '/addproduct') {
		return <Addproduct />
	}

	return <Login />

}


export default App
