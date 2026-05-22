import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Code2, Settings } from 'lucide-react'

const navItems = [
  { to: '/workspace', icon: LayoutDashboard, label: 'Workspace' },
  { to: '/code', icon: Code2, label: 'Code' },
  { to: '/settings', icon: Settings, label: 'Settings' }
]

export function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[var(--bg-surface)]/90 backdrop-blur-md border-t border-[var(--border-glass)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) => `flex-1 flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${isActive ? 'text-ai-500' : 'text-[var(--text-secondary)]'}`}
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}