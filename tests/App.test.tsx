import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../src/App'

describe('App Component', () => {
  it('renders AppShell component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Workspace')).toBeInTheDocument()
  })

  it('navigates to /workspace by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Workspace')).toBeInTheDocument()
  })

  it('handles invalid routes by redirecting to /workspace', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Workspace')).toBeInTheDocument()
  })
})