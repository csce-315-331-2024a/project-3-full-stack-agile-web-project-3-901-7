import { render } from '@testing-library/react';
import { ConfirmationPopup } from '../components/Confirmation';
import { User } from '../types/dbTypes';
import { vi } from "vitest";

function confirmUser(user: User): string {
    return `Your username is: ${user.name}`;
  }

describe('greetUser function', () => {
  it('should greet the user by name', () => {
    const user: User = {
      _id: 1,
      email: 'johndoe@test.org',
      name: 'John Doe',
      given_name: 'John',
      family_name: 'Doe',
      picture: 'profile.png',
    };
    expect(confirmUser(user)).toBe('Your username is: John Doe');
  });
});

describe("Testing Confirmation Component", () => {
  const onConfirm = vi.fn();
  const onCancel = vi.fn();
  const message = "testing";
  it("renders confirmation popup correctly", () => {
      render(<ConfirmationPopup active={false} message={message} onConfirm={onConfirm} onCancel={onCancel}/>)
  })
  it("renders confirmation popup when active", () => {
    render(<ConfirmationPopup active={true} message={message} onConfirm={onConfirm} onCancel={onCancel}/>)
  })
})

// const testItem = {
//   _id: 4,
//   name: "Test Name 4",
//   price: 40,
//   category: "Burger",
//   ingredientInfo: "salt",
//   startDate: new Date(),
//   endDate: null,
//   picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
//   itemDesc: "Test Description 4",
// }
// const testIngredients = [  
//   {
//       _id: 14,
//       name: "salt",
//       quantity: 490,
//       minQuantity: 50,
//       unitPrice: 0.99,
//       supplier: "SeasoningSupplier"
//   }
// ]
// const testItems = [
//   {
//       _id: 1,
//       name: "Test Name 1",
//       price: 10,
//       category: "Burger",
//       ingredientInfo: "bacon,cheese",
//       startDate: new Date(),
//       endDate: null,
//       picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
//       itemDesc: "Test Description 1",
//   },
//   {
//       _id: 2,
//       name: "Test Name 2",
//       price: 20,
//       category: "Burger",
//       ingredientInfo: "bacon,cheese",
//       startDate: new Date(),
//       endDate: null,
//       picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
//       itemDesc: "Test Description 2",
//   },
//   {
//       _id: 3,
//       name: "Chicken",
//       price: 30,
//       category: "Test Category 3",
//       ingredientInfo: "bacon,cheese",
//       startDate: new Date(),
//       endDate: null,
//       picture: "https://clipart-library.com/images_k/transparent-cheeseburger/transparent-cheeseburger-12.png",
//       itemDesc: "Test Description 3",
//   }
// ]

// describe("Menu Page Tests", () => {
//   it("fetching data", () => {
//       vi.clearAllMocks();
//       mockFetch.mockResolvedValueOnce({
//           json: async () => testItem
//       }).mockResolvedValueOnce({
//           json: async () => testIngredients
//       }).mockResolvedValueOnce({
//           json: async () => testItems
//       })
//       customRender(<NewMenuItemPage itemId={4}/>);
//   })
// })