import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"

import Post, { getStaticProps } from "../../pages/posts/preview/[slug]"
import { getPrismiClient } from "../../services/prismic"

const post =
{
  slug: 'my-new-post',
  title: 'My new post',
  content: '<p>Post excerpt</>',
  updatedAt: '10 de Abril'
}

jest.mock('next-auth/client')
jest.mock('../../services/prismic')
jest.mock('next/router')

describe('Post preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    render(<Post post={post} />)

    expect(screen.getByText('My new post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  })

  it('redirects user to full post when user is subscribed', async () => {
    const getSessionMocked = jest.mocked(useSession)
    const useRouterMocked = jest.mocked(useRouter)
    const pushMock = jest.fn()

    getSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false
    ] as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as never)

    render(<Post post={post} />)

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
  })

  it('loads inital data', async () => {
    const getPrismicClientMoked = jest.mocked(getPrismiClient)

    getPrismicClientMoked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post content' }
          ]
        },
        last_publication_date: '04-01-2021'
      })
    } as never)

    const response = await getStaticProps({
      req: {
        cookies: {}
      },
      params: {
        slug: 'my-new-post'
      }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    )
  })

})