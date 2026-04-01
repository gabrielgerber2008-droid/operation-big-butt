import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-obs/90 backdrop-blur-md border-b border-obs-4">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl leading-none">🍑</span>
          <span className="font-black text-sm tracking-widest uppercase text-gold group-hover:text-gold-light transition-colors">
            OBB
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/" label="Home" active={pathname === '/'} />
          <NavLink to="/history" label="History" active={pathname === '/history'} />
        </nav>
      </div>
    </header>
  )
}

const NavLink = ({
  to,
  label,
  active,
}: {
  to: string
  label: string
  active: boolean
}) => (
  <Link
    to={to}
    className={`text-xs font-semibold tracking-wide px-3 py-1.5 rounded-lg transition-colors ${
      active ? 'text-gold bg-gold/10' : 'text-white/50 hover:text-white'
    }`}
  >
    {label}
  </Link>
)
