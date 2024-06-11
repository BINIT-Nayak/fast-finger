import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import App from "../App"

// test('demo', () => {
//     expect(true).toBe(true)
// })

test("Renders the main page", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeInTheDocument();
})
