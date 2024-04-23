import '../../index.css';
import { useEffect, useState } from "react"
import ManagerNavbar from "../../components/ManagerNavbar";
import ManagerSearchbar from '../../components/ManagerSearchbar';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import DataValidationWarning from '../../components/DataValidationWarning';
import ConfirmationPopup from '../../components/ConfirmationPopup';
import { Ingredient, User } from '../../types/dbTypes';
import { getUserAuth } from '../Login';

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
    isEditable = true  
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
        setCurrentValue(value.toString());  
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
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [warningMessage, setWarningMessage] = useState<string>('');
    const [confirmation, setConfirmation] = useState<'add' | 'edit' | null>(null);
  

    const [newIngredient, setNewIngredient] = useState<Ingredient>({
        _id: -1,
        name: 'Enter name',
        quantity: 0,
        minQuantity: 0,
        unitPrice: 0.00,
        supplier: 'Enter supplier',
    });
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    useEffect(() => {
      getUserAuth('manager')
        .then(setUserProfile)
        .catch(console.error);
    }, [])

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
        const tableElement = document.getElementById("inventory-table");
        if (tableElement) {
          tableElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    

    const handleEdit = async (id: number, field: keyof Ingredient, newValue: string | number) => {
        const ingredientToEdit = ingredients.find(ingredient => ingredient._id === id);

        if (ingredientToEdit) {
            // Check if the entered value meets the specified constraints
            if ((field === 'quantity' || field === 'minQuantity') && (isNaN(Number(newValue)) || Number(newValue) < 0 || !Number.isInteger(Number(newValue)))) {
                setWarningMessage(`Please enter a positive integer for ${field}`);
                setShowWarning(true);
                return;
            } else if (field === 'unitPrice' && (isNaN(Number(newValue)) || Number(newValue) <= 0)) {
                setWarningMessage('Please enter a positive number for unit price');
                setShowWarning(true);
                return;
            }

            const updatedIngredient = { ...ingredientToEdit, [field]: newValue };

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ingredient/edit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedIngredient),
                });
                const data = await response.json();

                setIngredients(ingredients.map(ingredient =>
                    ingredient._id === id ? updatedIngredient : ingredient
                ));
                
                setConfirmation('edit');
                
            } catch (error) {
                console.error('Fetch error:', error);
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
    setConfirmDeleteId(id);
    
  };

  const handleCancelNewIngredient = () => {
    setIsAddingNew(false);
  };


  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (confirmDeleteId !== null) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ingredient/deleteById?ingredientId=${confirmDeleteId}`, {
          method: 'POST',
        });
        const data = await response.json();
        if (data) {
          setIngredients(ingredients.filter((ingredient) => ingredient._id !== confirmDeleteId));
          setConfirmDeleteId(null);
        } else {
          throw new Error('Failed to delete the ingredient');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setConfirmDeleteId(null);
      }
    }
  };



  const handleSaveNewIngredient = async () => {
    if (!newIngredient.name.trim()) {
      setShowWarning(true);
      setWarningMessage("Name cannot be empty");
      return;
    }
    if (newIngredient.quantity < 0 || !Number.isInteger(newIngredient.quantity)) {
      setShowWarning(true);
      setWarningMessage("Quantity must be a positive integer");
      return;
    }
    if (newIngredient.minQuantity < 0 || !Number.isInteger(newIngredient.minQuantity)) {
      setShowWarning(true);
      setWarningMessage("Min quantity must be a positive integer");
      return;
    }
    if (isNaN(newIngredient.unitPrice) || newIngredient.unitPrice <= 0) {
      setShowWarning(true);
      setWarningMessage("Unit price must be a positive number");
      return;
    }
  
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
      if (response.ok && data.ingredientId) {
        setIngredients([...ingredients, { ...ingredientToSave, _id: data.ingredientId }]);
        setIsAddingNew(false);
      } else {
        alert("Failed to add ingredient");
      }
    } catch (error) {
      console.error('Error saving new ingredient:', error);
      alert('Failed to save new ingredient');
    }
  };


  const handleCancelConfirmation = () => {
      setConfirmation(null); 
  };

  

  useEffect(() => {
    async function fetchIngredients() {
      console.log(import.meta.env.VITE_BACKEND_URL);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ingredient/findAll`);
        const data = await response.json();
        if (response.ok) {
          const sortedData = data.sort((a: Ingredient, b: Ingredient) => a._id - b._id);
          setIngredients(sortedData);
        } else {
          throw new Error('Failed to fetch ingredients');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
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

  return (userProfile &&
    <div className="p-4">
      <ManagerNavbar userInfo={userProfile}/>
      <ManagerSearchbar 
        searchPlaceholder='search ingredient'
        onSearch={setSearchTerm}
        conditions={[
          { title: "Show Low-Stock", callback: setShowLowStock },
        ]}
        actions={[
          { title: "Reorder Stock", callback: handleRestock },
          { title: "+", callback: handleAddClick },
        ]}
      />
    <div>

    {confirmDeleteId !== null && (
        <DeleteConfirmation
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      {showWarning && (
          <DataValidationWarning message={warningMessage} onCancel={() => setShowWarning(false)} />
      )}
      {confirmation && (
          <ConfirmationPopup action={confirmation} onClose={() => setConfirmation(null)} />
      )}
        
      </div>
      <div className="mt-4 ml-4 mr-64 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 380px)' }}>
        <table id="inventory-table" className="overflow-scroll w-full text-sm text-center text-black border border-black font-ptserif">
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {isAddingNew && newIngredient && (
              <tr>
                <td className="px-5 py-5 border-b border-black bg-white text-sm">
                  New
                </td>
                <EditableCell value={newIngredient.name} onEdit={(id, field, value) => setNewIngredient({ ...newIngredient, name: value as string })} field="name" ingredientId={newIngredient._id} placeholder="Enter name"/>
                <EditableCell value={newIngredient.quantity} onEdit={(id, field, value) => setNewIngredient({ ...newIngredient, quantity: Number(value) })} field="quantity" ingredientId={newIngredient._id}  placeholder="0"/>
                <EditableCell value={newIngredient.minQuantity} onEdit={(id, field, value) => setNewIngredient({ ...newIngredient, minQuantity: Number(value) })} field="minQuantity" ingredientId={newIngredient._id}  placeholder="0"/>
                <EditableCell value={newIngredient.unitPrice} onEdit={(id, field, value) => setNewIngredient({ ...newIngredient, unitPrice: Number(value) })} field="unitPrice" ingredientId={newIngredient._id}  placeholder="0.00"/>
                <EditableCell value={newIngredient.supplier} onEdit={(id, field, value) => setNewIngredient({ ...newIngredient, supplier: value as string })} field="supplier" ingredientId={newIngredient._id} placeholder="Enter supplier" />
                <td className="px-5 py-5 border-b border-black bg-white text-sm">
                  <button onClick={handleSaveNewIngredient} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 mr-2 rounded">
                    Save
                  </button>
                  <button onClick={handleCancelNewIngredient} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
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
                <EditableCell
                    value={ingredient.quantity}
                    onEdit={handleEdit}
                    field="quantity"
                    ingredientId={ingredient._id}
                />
                <EditableCell
                    value={ingredient.minQuantity}
                    onEdit={handleEdit}
                    field="minQuantity"
                    ingredientId={ingredient._id}
                />
                <EditableCell
                    value={ingredient.unitPrice}
                    onEdit={handleEdit}
                    field="unitPrice"
                    ingredientId={ingredient._id}
                />
                <EditableCell
                    value={ingredient.supplier}
                    onEdit={handleEdit}
                    field="supplier"
                    ingredientId={ingredient._id}
                />
                <td className="py-4 px-6 border border-black font-ptserif">
                <button onClick={() => handleDeleteIngredient(ingredient._id)} className=" border-2 border-black px-2 rounded-md text-lg font-medium bg-white text-black hover:bg-black hover:text-white font-ptserif">
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