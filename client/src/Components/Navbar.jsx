import './Navbar.css'

function Navbar({ searchTerm = '', onSearchChange = () => {} }) {
  return (
    <header className="auth-navbar">
      <a className="auth-brand" href="#top">
        <span aria-hidden="true" />
        <div>
          <strong>Northstar Audio</strong>
          <p>Wireless earbuds store</p>
        </div>
      </a>

      <label className="auth-search" htmlFor="navbar-search">
        <span className="auth-search-icon" aria-hidden="true">
          Search
        </span>
        <input
          id="navbar-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search earbuds"
        />
      </label>

      <nav className="auth-nav" aria-label="Store navigation">
        <a href="#featured">Featured</a>
        <a href="#collections">Collections</a>
        <a href="#deals">Deals</a>
      </nav>
    </header>
  )
}

export default Navbar
