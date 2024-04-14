import '../../index.css';
import { useEffect, useState } from "react"
import ManagerNavbar from "../../components/ManagerNavbar";
import ManagerSearchbar from '../../components/ManagerSearchbar';
import { Ingredient } from '../../types/dbTypes';

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

        <ManagerSearchbar 
          searchPlaceholder='search ingredient'
          onSearch={setSearchTerm}
          conditions={[
            { title: "Show Low-Stock", callback: setShowLowStock },
          ]}
          actions={[
            { title: "Reorder Stock", callback: handleRestock },
            { title: "Edit Ingredient", callback: () => window.location.href = '/editinventory' },
          ]}
        />
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
