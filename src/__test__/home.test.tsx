import '@testing-library/jest-dom'
import { fireEvent, render,screen } from "@testing-library/react"
import App from "../App"


test("Start button is rendered",()=>{
    render(<App />);
    const { getByRole } = render(<button />);
  const button = getByRole('button', { name: /start game/i });  

  render(<button />);
  fireEvent.click(button);
  
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Start Game')
})

test("Is name entered or not",()=>{
    render(<App/>);
    const input=screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
})

