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

test('updates name in state when input changes', () => {
    
  render(<App />);
  const input = screen.getByTestId('name-input');
  fireEvent.change(input, {target: {value: 'Binit'}});
  expect(input).toHaveValue('Binit'); 

});

test('selects dropdown value and updates state', () => {

  render(<App />);
  const dropdown = screen.getByRole('combobox');
  fireEvent.change(dropdown, {target: {value: 'Medium'}});
  expect(dropdown).toHaveValue('Medium');
  // expect(screen.getByDisplayValue('Medium')).toBeInTheDocument();
  

});