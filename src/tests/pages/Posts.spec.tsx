import { render, screen } from "@testing-library/react"
import { mocked } from "ts-jest/utils"

import { stripe } from "../../services/stripe"
import Posts, { getStaticProps } from "../../pages/posts"
import { getPrismiClient } from "../../services/prismic"

const posts = [
  {
    slug: 'my-new-post',
    title: 'My new post',
    excerpt: 'Post excerpt',
    updatedAt: '10 de Abril'
  }
]
jest.mock('../../services/prismic')

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My new post')).toBeInTheDocument()
  })

  it('loads initial data', async () => {

    const getPrismicClientMocked = jest.mocked(getPrismiClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My new post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ]
            },
            last_publication_date: '04-01-2021'
          }
        ]
      })
    } as never)


    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new post',
              excerpt: 'Post excerpt',
              updatedAt: '01 de abril de 2021'
            }
          ]
        }
      })
    )
  })

})