import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'

import { SignInButton } from "./index"

jest.mock('next-auth/client')

describe('SignInButton component', () => {
  const useSessionMocked = jest.mocked(useSession)

  it('renders correctly when user is not authentucated', () => {

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SignInButton />)

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authentucated', () => {
    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com'
        },
        expires: 'fake-expires'
      },
      false
    ] as any)


    render(<SignInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})