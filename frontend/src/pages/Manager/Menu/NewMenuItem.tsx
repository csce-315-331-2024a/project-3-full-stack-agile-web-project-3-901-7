import React, { useEffect, useState } from "react";
import { Ingredient, Item, User } from "../../../types/dbTypes";
import { getUserAuth } from "../../Login";
import { ConfirmationPopup, IConfirmationPopupProps } from '../../../components/Confirmation';
import Navbar from "../../../components/Navbar";

const itemIngredients = new Set<string>();

/**
 * Represents the NewMenuItemPage component.
 */
const NewMenuItemPage: React.FC<{ itemId?: number }> = ({ itemId }) => {
  /**
   * Represents the item state.
   */
  const [item, setItem] = useState<Item>({
    _id: -1,
    name: '',
    price: 0,
    category: '',
    ingredientInfo: '',
    startDate: new Date(),
    endDate: null,
    picture: '',
    itemDesc: '',
  });

  /**
   * Represents the ingredients state.
   */
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  /**
   * Represents the categories state.
   */
  const [categories, setCategories] = useState<string[]>([]);

  /**
   * Represents the userProfile state.
   */
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

  /**
   * Represents the popupState state.
   */
  const [popupState, setPopupState] = useState<IConfirmationPopupProps>({
    message: '',
    active: false,
    onConfirm() { },
    onCancel() {
      setPopupState(prevState => ({ ...prevState, active: false }));
    },
  });

  /**
   * Gets the confirmation for an action.
   * @param message - The confirmation message.
   * @param onConfirm - The callback function to execute on confirmation.
   */
  const getConfirmation = (message: string, onConfirm: () => void) => {
    setPopupState(prevState => ({
      ...prevState, active: true, message, onConfirm,
    }));
  }

  useEffect(() => {
    getUserAuth('manager')
      .then(setUserProfile)
      .catch(console.error);
  }, [])

  useEffect(() => {
    itemIngredients.clear();

    async function fetchItem(itemId: number) {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findOneById?itemId=" + itemId);
      const prevItem = await response.json() as Item;

      itemIngredients.clear();
      for (const ingName of prevItem.ingredientInfo.split(',')) {
        itemIngredients.add(ingName);
      }

      setItem(prevItem);
    }

    async function fetchIngredients() {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/ingredient/findAll");
      const data = await response.json() as Ingredient[];
      setIngredients(data);
    }

    async function fetchCategories() {
      function findUnique(value: string, index: number, array: string[]) {
        return array.indexOf(value) === index;
      }

      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAll");
      const items = await response.json() as Item[];
      const categories = items.map(item => item.category).filter(findUnique);

      setCategories(categories);
    }

    if (itemId)
      fetchItem(itemId);

    fetchIngredients();
    fetchCategories();
  }, []);

  /**
   * Handles the change event of an input element.
   * @param e - The change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  /**
   * Handles the change event of a category input element.
   * @param e - The change event.
   */
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setItem(prevItem => ({
        ...prevItem,
        category: value,
      }));
    }
  };

  /**
   * Handles the change event of an ingredient input element.
   * @param e - The change event.
   */
  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      itemIngredients.add(value);
    }
    else {
      itemIngredients.delete(value);
    }

    const ingredientsList: string[] = [];
    for (const ingName of itemIngredients) {
      ingredientsList.push(ingName);
    }

    setItem(prevItem => ({
      ...prevItem,
      ingredientInfo: ingredientsList.join(','),
    }));
  };

  /**
   * Validates an item.
   * @param item - The item to validate.
   * @returns True if the item is valid, false otherwise.
   */
  function validateItem(item: Item) {
    if (!item.category) return false;
    if (!item.ingredientInfo) return false;
    if (!item.name) return false;
    if (item.price < 0) return false;
    if (!item.picture) return false;
    if (!item.startDate || item.startDate > new Date()) return false;
    return true;
  }

  /**
   * Posts a new item to the backend.
   * @param item - The item to post.
   */
  async function postNewItem(item: Item) {
    await fetch(import.meta.env.VITE_BACKEND_URL + "/item/insert", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    window.location.href = '/manager/menu';
  }

  /**
   * Posts an updated item to the backend.
   * @param item - The item to update.
   */
  async function postUpdateItem(item: Item) {
    await fetch(import.meta.env.VITE_BACKEND_URL + "/item/edit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    window.location.href = '/manager/menu';
  }

  /**
   * Deletes an item from the backend.
   * @param item - The item to delete.
   */
  async function postDeleteItem(item: Item) {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/deleteById?itemId=" + item._id, {
      method: 'POST',
    });

    console.log(response.json());
    window.location.href = '/manager/menu';
  }

  /**
   * Handles an action on the item.
   * @param actionType - The type of action.
   */
  const handleAction = (actionType: string) => {
    if (actionType !== 'delete' && !validateItem(item))
      return;

    getConfirmation(`Are you sure you want to ${actionType} item "${item.name}"?`, () => {
      if (!item.category || !item.ingredientInfo || !item.name || !item.picture || !item.price || !item.startDate || !item.itemDesc)
        return;

      if (actionType === 'create') {
        postNewItem(item);
      }
      else if (actionType === 'delete') {
        if (item._id)
          postDeleteItem(item);
      }
      else if (actionType === 'update') {
        if (item._id)
          postUpdateItem(item);
      }
    });
  };

  return (userProfile &&
    <>
      <Navbar userInfo={userProfile} userType="manager"/>

      <ConfirmationPopup {...popupState} />

      <div className="pl-8 pr-8 pb-8 pt-4">
          <h1 className="font-ptserif text-black mb-4">
            {itemId ? `Edit Item "${item.name}"` : 'Create New Item'}
          </h1>
          <form onSubmit={e => e.preventDefault()}>
            <div className="mt-4 ml-4 mr-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 350px)', maxWidth: '1200px' }}>
              <div className="mb-8 mr-8 grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-ptserif mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-ptserif mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-ptserif mb-2">Desription</label>
                  <input
                    type="text"
                    name="itemDesc"
                    value={item.itemDesc}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-ptserif mb-2">Thumbnail Image URL</label>
                  <input
                    type="text"
                    name="picture"
                    value={item.picture}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-ptserif mb-2">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={item.startDate.toString()}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-ptserif mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={(item.endDate || new Date()).toString()}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-ptserif mb-2">Category</label>
                <div className="grid grid-cols-4 gap-4">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="ingredients"
                        value={category}
                        checked={item.category === category}
                        onChange={handleCategoryChange}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-ptserif mb-2">Ingredients</label>
                <div className="grid grid-cols-4 gap-4" key={item.name + "_itemreloadtrigger"}>
                  {ingredients.map(ingredient => (
                    <label key={ingredient._id} className="flex items-center">
                      <input
                        type="checkbox"
                        name="ingredients"
                        value={ingredient.name}
                        checked={itemIngredients.has(ingredient.name)}
                        onChange={handleIngredientChange}
                        className="mr-2"
                      />
                      {ingredient.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>


            <div className="mt-4 pt-4">
              <button
                onClick={() => {window.location.href = '/manager/menu'}}
                className="border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black font-ptserif hover:bg-black hover:text-white"
                >
                Cancel
              </button>

              {
                itemId ? (
                  <>
                    <button
                      onClick={() => handleAction('update')}
                      className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black font-ptserif hover:bg-black hover:text-white"
                    >
                      Update Item
                    </button>
                    <button
                      onClick={() => handleAction('delete')}
                      className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black font-ptserif hover:bg-black hover:text-white"
                    >
                      Delete Item
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleAction('create')}
                    className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black font-ptserif hover:bg-black hover:text-white"
                  >
                    Create Item
                  </button>
                )
              }
            </div>
          </form>
        </div>
    </>
  );
}

export default NewMenuItemPage;