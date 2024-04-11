import '../../index.css';
import { useEffect, useState } from "react"
import ManagerNavbar from "../../components/ManagerNavbar";

interface Ingredient {
  _id: number;
  name: string;
  quantity: number;
  minQuantity: number;
  unitPrice: number;
  supplier: string;
}

const Inventory = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showLowStock, setShowLowStock] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const exampleData: Ingredient[] = [
    {
    _id: 1,
      name: "Flour",
      quantity: 50,
      minQuantity: 10,
      unitPrice: 2.5,
      supplier: "Supplier A",
    },
    {
      _id: 2,
      name: "Sugar",
      quantity: 5,
      minQuantity: 10,
      unitPrice: 1.5,
      supplier: "Supplier B",
    },
    {
      _id: 3,
      name: "Eggs",
      quantity: 30,
      minQuantity: 20,
      unitPrice: 0.2,
      supplier: "Supplier C",
    },
  ];

  useEffect(() => {
    setIngredients(exampleData);
  }, []);

  // Function to filter ingredients based on the search term
  const filterIngredients = (searchTerm: string) => {
    return ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleRestock = () => {
    const restockedIngredients = ingredients.map(ingredient => {
      if (ingredient.quantity < ingredient.minQuantity) {
        return { ...ingredient, quantity: ingredient.minQuantity };
      }
      return ingredient;
    });
    setIngredients(restockedIngredients);
  };

  const filteredIngredients = ingredients
    .filter(ingredient => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(ingredient => !showLowStock || ingredient.quantity <= ingredient.minQuantity);

  return (
    <div className="p-4">
        <ManagerNavbar/>
        <div className="flex flex-col items-center">
      {/* <h1 className="text-2xl font-bold mb-4">Inventory Page</h1> */}
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between w-full">
  <div className="relative flex-grow">
    {/* Search Icon */}
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <img src="icons/search-icon.png" alt="Search" className="w-5 h-5" />
    </div>
    {/* Search Input */}
    <input
      type="text"
      placeholder="search item"
      className="block w-full pl-10 pr-3 py-2 border-b-2 border-black bg-transparent placeholder-gray-500 focus:outline-none focus:border-black focus:ring-0"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  {/* Show Low-Stock Button */}
  <button
    onClick={() => setShowLowStock(!showLowStock)}
    className={`ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium ${
      showLowStock ? 'bg-black text-white' : 'bg-white text-black'
    }`}
  >
    Show Low-Stock
  </button>
  {/* Reorder Stock Button */}
  <button
    onClick={handleRestock}
    className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black"
  >
    Reorder Stock
  </button>
</div>
        </div>
      <div>
        
      </div>
      <div className="mt-4">
        <table className="w-full text-sm text-center text-black border border-black">
          <thead className="text-s text-black uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6 border border-black">
                Item ID
              </th>
              <th scope="col" className="py-3 px-6 border border-black">
                Name
              </th>
              <th scope="col" className="py-3 px-6 border border-black">
                Quantity
              </th>
              <th scope="col" className="py-3 px-6 border border-black">
                Min Quantity
              </th>
              <th scope="col" className="py-3 px-6 border border-black">
                Unit Price
              </th>
              <th scope="col" className="py-3 px-6 border border-black">
                Supplier
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.map((ingredient) => (
              <tr key={ingredient._id} className="bg-white border-b">
                <th scope="row" className="py-4 px-6 font-medium text-black whitespace-nowrap border border-black">
                  {ingredient._id}
                </th>
                <td className="py-4 px-6 border border-black">
                  {ingredient.name}
                </td>
                <td className="py-4 px-6 border border-black">
                  {ingredient.quantity}
                </td>
                <td className="py-4 px-6 border border-black">
                  {ingredient.minQuantity}
                </td>
                <td className="py-4 px-6 border border-black">
                  ${ingredient.unitPrice.toFixed(2)}
                </td>
                <td className="py-4 px-6 border border-black">
                  {ingredient.supplier}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
