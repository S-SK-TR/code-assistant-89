import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../../../src/components/layout/AppShell'

describe('AppShell Component', () => {
  it('renders desktop sidebar with navigation items', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    expect(screen.getByText('Workspace')).toBeInTheDocument()
    expect(screen.getByText('Code')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('toggles mobile sidebar when menu button is clicked', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    const menuButton = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(menuButton)
    expect(screen.getByText('Sign Out')).toBeInTheDocument()

    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument()
  })

  it('renders mobile bottom navigation', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    expect(screen.getByText('Workspace')).toBeInTheDocument()
    expect(screen.getByText('Code')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders children when provided', () => {
    render(
      <MemoryRouter>
        <AppShell>
          <div>Test Content</div>
        </AppShell>
      </MemoryRouter>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})