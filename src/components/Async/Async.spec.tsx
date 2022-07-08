import { findByText, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import { Async } from "."

describe('Async tests', () => {
  it('should render async', async () => {
    render(<Async />)

    const buttonNotVisible = screen.getByText('Button not Visible')

    expect(screen.getByText('Hello World')).toBeInTheDocument()

    expect(buttonNotVisible).toBeInTheDocument()

    // this
    expect(await screen.findByText('Button Visible')).toBeInTheDocument()
    // or
    await waitFor(() => {
      return expect(screen.getByText('Button Visible')).toBeInTheDocument()
    })

    await waitFor(() => expect(buttonNotVisible).not.toBeInTheDocument())

    // getByText = sinc
    // findByText = async
    // queryByText = async but dont return error
  })
})