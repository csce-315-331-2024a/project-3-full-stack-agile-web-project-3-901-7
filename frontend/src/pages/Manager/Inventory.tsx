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
    // setIngredients(exampleData);

    async function fetchIngredients() {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/ingredient/findAll");
        const data = await response.json();
        setIngredients(data);
    }

    fetchIngredients();
  }, []);

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
      <div className="pl-4 pr-64 mt-8 mb-4 flex flex-col sm:flex-row items-center justify-between w-full">
  <div className="relative flex-grow">
    {/* Search Icon */}
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <img src="icons/search-icon.png" alt="Search" className="w-5 h-5" />
    </div>
    {/* Search Input */}
    <input
      type="text"
      placeholder="search item"
      className="text-xl font-ptserif block w-full pl-10 pr-3 py-2 border-b-2 border-black bg-transparent placeholder-gray-500 focus:outline-none focus:border-black focus:ring-0"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  {/* Show Low-Stock Button */}
  <button
    onClick={() => setShowLowStock(!showLowStock)}
    className={`ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium font-ptserif ${
      showLowStock ? 'bg-black text-white' : 'bg-white text-black'
    }`}
  >
    Show Low-Stock
  </button>
  {/* Reorder Stock Button */}
  <button
    onClick={handleRestock}
    className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black font-ptserif hover:bg-black hover:text-white"
  >
    Reorder Stock
  </button>
  <button
  onClick={() => window.location.href = '/editinventory'}
  className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black hover:bg-black hover:text-white font-ptserif"
>
  Edit Ingredient
</button>

</div>
        </div>
      <div>
        
      </div>
      <div className="mt-4 ml-4 mr-64 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 380px)' }}>
        <table className="overflow-scroll w-full text-sm text-center text-black border border-black font-ptserif">
          <thead className="text-s text-black bg-gray-50 font-ptserif">
            <tr>
              <th scope="col" className="py-3 px-6 border border-black font-ptserif">
                Ingredient ID
              </th>
              <th scope="col" className="py-3 px-6 border border-black font-ptserif">
                Name
              </th>
              <th scope="col" className="py-3 px-6 border border-black font-ptserif">
                Quantity
              </th>
              <th scope="col" className="py-3 px-6 border border-black font-ptserif">
                Min Quantity
              </th>
              <th scope="col" className="py-3 px-6 border border-black font-ptserif">
                Unit Price
              </th>
              <th scope="col" className="py-3 px-6 border border-black font-ptserif">
                Supplier
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.map((ingredient) => (
              <tr key={ingredient._id} className="bg-white border-b">
                <th scope="row" className="py-4 px-6 font-medium text-black whitespace-nowrap border border-black font-ptserif">
                  {ingredient._id}
                </th>
                <td className="py-4 px-6 border border-black font-ptserif">
                  {ingredient.name}
                </td>
                <td className="py-4 px-6 border border-black font-ptserif">
                  {ingredient.quantity}
                </td>
                <td className="py-4 px-6 border border-black font-ptserif">
                  {ingredient.minQuantity}
                </td>
                <td className="py-4 px-6 border border-black font-ptserif">
                  ${ingredient.unitPrice.toFixed(2)}
                </td>
                <td className="py-4 px-6 border border-black font-ptserif">
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
