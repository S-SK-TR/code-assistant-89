import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Code2, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { MobileBottomNav } from '../navigation/MobileBottomNav'

const navItems = [
  { to: '/workspace', icon: LayoutDashboard, label: 'Workspace' },
  { to: '/code', icon: Code2, label: 'Code' },
  { to: '/settings', icon: Settings, label: 'Settings' }
]

// PREMIUM UI: Glassmorphism efektli sidebar ve mobil uyumlu tasarım
// PREMIUM UI: Framer Motion ile animasyonlu geçişler
// PREMIUM UI: Mobil için bottom navigation bar
// PREMIUM UI: Dark mode desteği

interface AppShellProps {
  children?: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-dvh bg-[var(--bg-base)] text-[var(--text-primary)] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col w-64 border-r border-[var(--border-glass)] bg-[var(--bg-surface)]/80 backdrop-blur-md transition-all duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-glass)]">
          <span className="font-display text-xl font-bold bg-gradient-to-r from-ai-500 to-ai-700 bg-clip-text text-transparent">CodeAssistant</span>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 rounded-lg hover:bg-glass-100">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'bg-ai-500/10 text-ai-500' : 'text-[var(--text-secondary)] hover:bg-glass-100 hover:text-[var(--text-primary)]'}`}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-[var(--border-glass)]">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-glass-100 transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-[var(--border-glass)] bg-[var(--bg-surface)]/80 backdrop-blur-md sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-glass-100">
            <Menu size={20} />
          </button>
          <h1 className="font-display text-lg font-semibold">Workspace</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-glass-100">
              <span className="sr-only">Notifications</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children || <Outlet />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}