import '../../index.css';
// // import { useEffect, useState } from "react"
// // import Navbar from "../components/Navbar";
// import React, { useState, useEffect } from 'react';
// interface Ingredient {
//   _id: number;
//   name: string;
//   quantity: number;
//   minQuantity: number;
//   unitPrice: number;
//   supplier: string;
// }

// const Inventory = () => {
//   // Use the Ingredient interface to type the state
//   const [ingredients, setIngredients] = useState<Ingredient[]>([]);
//   const [showLowStock, setShowLowStock] = useState(false);

//   useEffect(() => {
//     fetchIngredients();
//   }, []);

//   const fetchIngredients = async () => {
//     try {
//       // Replace the URL with your actual API endpoint
//       const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/ingredient/findAll");
//       const data = await response.json();
//       setIngredients(data);
//     } catch (error) {
//       console.error('Error fetching ingredients', error);
//     }
//   };

//   const filteredIngredients = showLowStock
//     ? ingredients.filter(ingredient => ingredient.quantity <= ingredient.minQuantity)
//     : ingredients;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Inventory Page</h1>
//       <div>
//         <label htmlFor="showLowStock" className="inline-flex items-center">
//           <input
//             type="checkbox"
//             id="showLowStock"
//             checked={showLowStock}
//             onChange={e => setShowLowStock(e.target.checked)}
//             className="mr-2"
//           />
//           Show Low-Stock Only
//         </label>
//       </div>
//       <div className="mt-4">
//         <table className="w-full">
//           <thead>
//             <tr>
//               <th>Item ID</th>
//               <th>Name</th>
//               <th>Quantity</th>
//               <th>Min Quantity</th>
//               <th>Unit Price</th>
//               <th>Supplier</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredIngredients.map((ingredient) => (
//               <tr key={ingredient._id}>
//                 <td>{ingredient._id}</td>
//                 <td>{ingredient.name}</td>
//                 <td>{ingredient.quantity}</td>
//                 <td>{ingredient.minQuantity}</td>
//                 <td>${ingredient.unitPrice.toFixed(2)}</td>
//                 <td>{ingredient.supplier}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Inventory;

import React, { useState, useEffect } from 'react';

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

  // Test data
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
    // Directly use the test data
    setIngredients(exampleData);
  }, []);

  const filteredIngredients = showLowStock
    ? ingredients.filter(ingredient => ingredient.quantity <= ingredient.minQuantity)
    : ingredients;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Page</h1>
      <div>
        <label htmlFor="showLowStock" className="inline-flex items-center">
          <input
            type="checkbox"
            id="showLowStock"
            checked={showLowStock}
            onChange={e => setShowLowStock(e.target.checked)}
            className="mr-2"
          />
          Show Low-Stock Only
        </label>
      </div>
      <div className="mt-4">
        <table className="w-full">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Min Quantity</th>
              <th>Unit Price</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.map((ingredient) => (
              <tr key={ingredient._id}>
                <td>{ingredient._id}</td>
                <td>{ingredient.name}</td>
                <td>{ingredient.quantity}</td>
                <td>{ingredient.minQuantity}</td>
                <td>${ingredient.unitPrice.toFixed(2)}</td>
                <td>{ingredient.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;

