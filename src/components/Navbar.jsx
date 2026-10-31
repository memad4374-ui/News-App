import '../css/Navbar.css'
function Navbar({ categories, selected, onSelect }) {
  return (
    <nav className="nav">
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              className={selected === cat.id ? 'active' : ''}
              onClick={() => onSelect(cat.id)}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
