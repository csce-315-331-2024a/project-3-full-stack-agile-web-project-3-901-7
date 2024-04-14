import React, { useEffect, useState } from "react";
import ManagerNavbar from "../../../components/ManagerNavbar";
import { Ingredient, Item } from "../../../types/dbTypes";

const itemIngredients = new Set<string>();

const NewMenuItemPage : React.FC<{}> = () => {
  const [item, setItem] = useState<Item>({
    _id: -1,
    name: '',
    price: 0,
    category: '',
    ingredientInfo: '',
    startDate: new Date(),
    endDate: new Date(),
    picture: '',
    itemDesc: '',
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    itemIngredients.clear();

    async function fetchIngredients() {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/ingredient/findAll");
      const data = await response.json();
      setIngredients(data);
    }

    async function fetchCategories() {
      function findUnique(value : string, index : number, array : string[]) {
        return array.indexOf(value) === index;
      }

      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAll");
      const items = await response.json() as Item[];
      const categories = items.map(item => item.category).filter(findUnique);

      setCategories(categories);
    }

    fetchIngredients();
    fetchCategories();
  }, []);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleCategoryChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setItem(prevItem => ({
        ...prevItem,
        category: value,
      }));
    }
  };

  const handleIngredientChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      itemIngredients.add(value);
    }
    else {
      itemIngredients.delete(value);
    }

    let ingredientsList : string[] = [];
    for (let ingName of itemIngredients) {
      ingredientsList.push(ingName);
    }

    setItem(prevItem => ({
      ...prevItem,
      ingredientInfo: ingredientsList.join(','),
    }));
  };

  async function postNewItem(item : Item) {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/insert", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    console.log(response.json());
    window.location.href = '/editmenu';
  }

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();

    if (!item.category || !item.ingredientInfo)
      return;
    
    postNewItem(item);
  };

  return (
    <>
      <ManagerNavbar />
      <div className="pl-8 pr-8 pb-8 pt-4">
          <h1 className="font-ptserif text-black mb-4">Create New Item</h1>
          <form onSubmit={handleSubmit}>
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
                    value={item.endDate.toString()}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
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
                <div className="grid grid-cols-4 gap-4">
                  {ingredients.map(ingredient => (
                    <label key={ingredient._id} className="flex items-center">
                      <input
                        type="checkbox"
                        name="ingredients"
                        value={ingredient.name}
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
                onClick={() => {window.location.href = '/editmenu'}}
                className="border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black font-ptserif hover:bg-black hover:text-white"
                >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black font-ptserif hover:bg-black hover:text-white"
                >
                Create Item
              </button>
            </div>
          </form>
        </div>
    </>
  );
}

export default NewMenuItemPage;