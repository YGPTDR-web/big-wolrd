import { Bookmark, Sparkles } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
 
export default function Navbar() {
  return (
    <header className="sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-5 pt-5">
        <div className="glass flex items-center justify-between px-5 py-3 shadow-glass">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-200 to-gold-500 text-ink-900 shadow-gold">
                <Bookmark size={16} strokeWidth={2.2} />
              </div>
              <Sparkles
                size={12}
                className="absolute -right-1 -top-1 animate-glow text-gold-400"
              />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold tracking-wide gold-text">
                Arcanum
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-parchment-200/70">
                World Archive
              </div>
            </div>
          </Link>
 
          <nav className="hidden items-center gap-1 md:flex">
            <NavItem to="/">总览</NavItem>
            <NavItem to="/admin">后台</NavItem>
          </nav>
 
          <div className="flex items-center gap-2 md:hidden">
            <Link to="/" className="btn-ghost px-3 py-1.5 text-xs">
              总览
            </Link>
            <Link to="/admin" className="btn-ghost px-3 py-1.5 text-xs">
              后台
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
 
function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `relative rounded-full px-4 py-1.5 text-sm transition-all ${
          isActive
            ? 'bg-gold-400/15 text-gold-200'
            : 'text-parchment-100/80 hover:text-gold-200'
        }`
      }
    >
      {children}
    </NavLink>
  );
}