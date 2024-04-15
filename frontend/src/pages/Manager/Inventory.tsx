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

interface EditableCellProps {
    value: string | number;
    onEdit: (id: number, field: keyof Ingredient, newValue: string | number) => void;
    field: keyof Ingredient;
    ingredientId: number;
    placeholder?: string;
    isEditable?: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
    value,
    onEdit,
    field,
    ingredientId,
    placeholder = "",
    isEditable = true  // Ensuring this allows entering edit mode
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value.toString());

    const handleEditStart = () => {
        if (isEditable) {  // Only allow editing if editable
            setIsEditing(true);
        }
    };

    const handleBlur = () => {
        if (currentValue !== value.toString()) {
            onEdit(ingredientId, field, ['quantity', 'minQuantity', 'unitPrice'].includes(field) ? Number(currentValue) : currentValue);
        }
        setIsEditing(false);
    };

    useEffect(() => {
        setCurrentValue(value.toString());  // Update internal state when external value changes
    }, [value]);

    return (
        <td className="py-4 px-6 border border-black font-ptserif">
            {isEditing ? (
                <input
                    type="text"
                    autoFocus
                    className="font-ptserif p-1 w-full"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleBlur();
                        }
                    }}
                />
            ) : (
                <span onDoubleClick={handleEditStart}>
                    {value || placeholder}
                </span>
            )}
        </td>
    );
};



const Inventory = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [showLowStock, setShowLowStock] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newIngredient, setNewIngredient] = useState<Ingredient>({
        _id: -1,
        name: 'Enter name',
        quantity: 0,
        minQuantity: 0,
        unitPrice: 0.00,
        supplier: 'Enter supplier',
    });

    const handleAddClick = () => {
        setIsAddingNew(true);
        setNewIngredient({
            _id: -1, // Temporary ID until saved
            name: '',
            quantity: 0,
            minQuantity: 0,
            unitPrice: 0,
            supplier: '',
        });
    };
    

  const handleEdit = async (id: number, field: keyof Ingredient, newValue: string | number) => {
    // Find the ingredient that is being edited
    const ingredientToEdit = ingredients.find(ingredient => ingredient._id === id);
    console.log(ingredientToEdit);
    console.log(id, field, newValue);

    if (ingredientToEdit) {
        console.log("ingredientToEdit", ingredientToEdit);
        const updatedIngredient = { ...ingredientToEdit, [field]: newValue };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ingredient/edit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedIngredient),
            });
            const data = await response.json();

            if (!data.success) {
                throw new Error('Failed to update the ingredient');
            }

            setIngredients(ingredients.map(ingredient =>
                ingredient._id === id ? updatedIngredient : ingredient
            ));
        } catch (error) {
            console.error('Fetch error:', error);
            setIngredients(ingredients);
        }
    }
  };

  const handleAddIngredient = async () => {
    if (newIngredient) {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ingredient/insert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIngredient),
      });

      const data = await response.json();
      if (response.ok && data.ingredientId) {
        setIngredients([...ingredients, { ...newIngredient, _id: data.ingredientId }]);
        setIsAddingNew(false);
      } else {
        alert("Failed to add ingredient");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  
  const handleDeleteIngredient = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ingredient/deleteById?ingredientId=${id}`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        setIngredients(ingredients.filter((ingredient) => ingredient._id !== id));
      } else {
        throw new Error('Failed to delete the ingredient');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleCancelNewIngredient = () => {
    setIsAddingNew(false);
  };


  const handleSaveNewIngredient = async () => {
    const ingredientToSave = {
      name: newIngredient.name,
      quantity: Number(newIngredient.quantity),
      minQuantity: Number(newIngredient.minQuantity),
      unitPrice: Number(newIngredient.unitPrice),
      supplier: newIngredient.supplier,
    };
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ingredient/insert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredientToSave)
      });
      const data = await response.json();
      if (data.success) {
        setIngredients([...ingredients, { ...ingredientToSave, _id: data.ingredientId }]);
        //resetNewIngredient();  // Reset input fields after successful save
      } else {
        throw new Error('Failed to save new ingredient');
      }
    } catch (error) {
      console.error('Error saving new ingredient:', error);
      alert('Failed to save new ingredient');
    }
  };
  
  

  useEffect(() => {

    async function fetchIngredients() {
        console.log(import.meta.env.VITE_BACKEND_URL);
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
  onClick={handleAddClick}
  className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black hover:bg-black hover:text-white font-ptserif"
    >
    +
    </button>
    

    </div>
        </div>
      <div>
        
      </div>
      <div className="mt-4 ml-4 mr-64 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 380px)' }}>
        <table className="overflow-scroll w-full text-sm text-center text-black border border-black font-ptserif">
          <thead className="text-m text-black bg-gray-50 font-ptserif">
            <tr>
              <th scope="col" className="w-20 py-3 px-6 border border-black font-ptserif">
                Ingredient ID
              </th>
              <th scope="col" className="w-32 py-3 px-6 border border-black font-ptserif">
                Name
              </th>
              <th scope="col" className="w-32 py-3 px-6 border border-black font-ptserif">
                Quantity
              </th>
              <th scope="col" className="w-32 py-3 px-6 border border-black font-ptserif">
                Min Quantity
              </th>
              <th scope="col" className="w-32 py-3 px-6 border border-black font-ptserif">
                Unit Price
              </th>
              <th scope="col" className="w-32 py-3 px-6 border border-black font-ptserif">
                Supplier
              </th>
              <th scope="col" className="w-32 py-3 px-6 border border-black font-ptserif">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
          {isAddingNew && newIngredient && (
              <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  New
                </td>
                <EditableCell value={newIngredient.name} onEdit={(id, field, value) => setNewIngredient({ ...newIngredient, name: value as string })} field="name" ingredientId={newIngredient._id} placeholder="Enter name"/>
                <EditableCell value={newIngredient.quantity} onEdit={(id, field, value) => setNewIngredient({ ...newIngredient, quantity: Number(value) })} field="quantity" ingredientId={newIngredient._id}  placeholder="Enter quantity"/>
                <EditableCell value={newIngredient.minQuantity} onEdit={(id, field, value) => setNewIngredient({ ...newIngredient, minQuantity: Number(value) })} field="minQuantity" ingredientId={newIngredient._id}  placeholder="Enter min quantity"/>
                <EditableCell value={newIngredient.unitPrice} onEdit={(id, field, value) => setNewIngredient({ ...newIngredient, unitPrice: Number(value) })} field="unitPrice" ingredientId={newIngredient._id}  placeholder="Enter unit price"/>
                <EditableCell value={newIngredient.supplier} onEdit={(id, field, value) => setNewIngredient({ ...newIngredient, supplier: value as string })} field="supplier" ingredientId={newIngredient._id} placeholder="Enter supplier" />
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button onClick={handleSaveNewIngredient} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Save
                  </button>
                  <button onClick={handleCancelNewIngredient} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                </td>
              </tr>
            )}
            {filteredIngredients.map((ingredient) => (
              <tr key={ingredient._id} className="bg-white border-b">
                <th scope="row" className="py-4 px-6 font-medium text-black whitespace-nowrap border border-black font-ptserif">
                  {ingredient._id}
                </th>
                <EditableCell
                    value={ingredient.name}
                    onEdit={handleEdit}
                    field="name"
                    ingredientId={ingredient._id}
                />
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
                <td className="py-4 px-6 border border-black font-ptserif">
                <button onClick={() => handleDeleteIngredient(ingredient._id)} className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black hover:bg-black hover:text-white font-ptserif">
                    -
                </button>
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
// return (
//     <div className="p-4">
//       <ManagerNavbar />
//       <div className="flex flex-col items-center">
//         <div className="pl-4 pr-64 mt-8 mb-4 flex flex-col sm:flex-row items-center justify-between w-full">
//           <div className="relative flex-grow">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <img src="icons/search-icon.png" alt="Search" className="w-5 h-5" />
//             </div>
//             <input
//               type="text"
//               placeholder="search item"
//               className="text-xl font-ptserif block w-full pl-10 pr-3 py-2 border-b-2 border-black bg-transparent placeholder-gray-500 focus:outline-none focus:border-black focus:ring-0"
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button onClick={() => setShowLowStock(!showLowStock)}
//             className={`ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium font-ptserif ${showLowStock ? 'bg-black text-white' : 'bg-white text-black'}`}>
//             Show Low-Stock
//           </button>
//           <button onClick={handleRestock}
//             className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black font-ptserif hover:bg-black hover:text-white">
//             Reorder Stock
//           </button>
//           <button onClick={() => setNewIngredient({ _id: -1, name: '', quantity: 0, minQuantity: 0, unitPrice: 0, supplier: '' })}
//             className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black hover:bg-black hover:text-white font-ptserif">
//             +
//           </button>
//         </div>
//       </div>
//       <div className="mt-4 ml-4 mr-64 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 380px)' }}>
//         <table className="w-full text-sm text-center text-black border border-black">
//           <thead>
//             <tr>
//               <th className="py-3 px-6 border border-black">Ingredient ID</th>
//               <th className="py-3 px-6 border border-black">Name</th>
//               <th className="py-3 px-6 border border-black">Quantity</th>
//               <th className="py-3 px-6 border border-black">Min Quantity</th>
//               <th className="py-3 px-6 border border-black">Unit Price</th>
//               <th className="py-3 px-6 border border-black">Supplier</th>
//               <th className="py-3 px-6 border border-black">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {ingredients.map((ingredient) => (
//               <tr key={ingredient._id}>
//                 <td className="py-4 px-6 border border-black">{ingredient._id}</td>
//                 <EditableCell value={ingredient.name} onEdit={handleEdit} field="name" ingredientId={ingredient._id} />
//                 <EditableCell value={ingredient.quantity} onEdit={handleEdit} field="quantity" ingredientId={ingredient._id} />
//                 <EditableCell value={ingredient.minQuantity} onEdit={handleEdit} field="minQuantity" ingredientId={ingredient._id} />
//                 <EditableCell value={ingredient.unitPrice} onEdit={handleEdit} field="unitPrice" ingredientId={ingredient._id} />
//                 <EditableCell value={ingredient.supplier} onEdit={handleEdit} field="supplier" ingredientId={ingredient._id} />
//                 <td className="py-4 px-6 border border-black">
//                   <button onClick={() => handleDeleteIngredient(ingredient._id)} className="text-red-500 hover:text-red-700">Delete</button>
//                 </td>
//               </tr>
//             ))}
//             {newIngredient && (
//                 <tr>
//                     <td className="py-4 px-6 border border-black">New</td>
//                     <EditableCell value={newIngredient.name} onEdit={(field, value) => setNewIngredient({ ...newIngredient, name: value })} field="name" ingredientId={-1} placeholder="Enter name" isEditable={true} />
//                     <EditableCell value={newIngredient.quantity} onEdit={(field, value) => setNewIngredient({ ...newIngredient, quantity: Number(value) })} field="quantity" ingredientId={-1} placeholder="0" isEditable={true} />
//                     <EditableCell value={newIngredient.minQuantity} onEdit={(field, value) => setNewIngredient({ ...newIngredient, minQuantity: Number(value) })} field="minQuantity" ingredientId={-1} placeholder="0" isEditable={true} />
//                     <EditableCell value={newIngredient.unitPrice} onEdit={(field, value) => setNewIngredient({ ...newIngredient, unitPrice: Number(value) })} field="unitPrice" ingredientId={-1} placeholder="0.00" isEditable={true} />
//                     <EditableCell value={newIngredient.supplier} onEdit={(field, value) => setNewIngredient({ ...newIngredient, supplier: value })} field="supplier" ingredientId={-1} placeholder="Enter supplier" isEditable={true} />
//                     <td className="py-4 px-6 border border-black">
//                         <button onClick={handleAddIngredient} className="text-green-500 hover:text-green-700">Save</button>
//                         <button onClick={() => setIsAddingNew(false)} className="text-red-500 hover:text-red-700 ml-2">Cancel</button>
//                     </td>
//                 </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Inventory;
