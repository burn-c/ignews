import { render, screen, fireEvent } from '@testing-library/react'

import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import { SubscribeButton } from "./index"

jest.mock('next-auth/client')
jest.mock('next/router')

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user sign in when not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    const signInMocked = jest.mocked(signIn)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled
  })

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = jest.mocked(useRouter)
    const useSessionMocked = jest.mocked(useSession)

    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'Jonh Doe',
          email: 'jonh@doe.com'
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires'
      },
      false
    ])

    useRouterMocked.mockImplementationOnce(() => ({ push: pushMocked } as any))

    render(<SubscribeButton />)

    const subscriptionButton = screen.getByText('Subscribe now')

    fireEvent.click(subscriptionButton)

    expect(pushMocked).toHaveBeenCalledWith('/posts')
  })
})