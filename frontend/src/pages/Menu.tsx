import '../index.css';

type MenuItemsType = {
    [key: string]: {
      name: string;
      description: string;
      price: string;
    }[];
  };
  

export default function Menu() {
    const menuItems: MenuItemsType = {
        Burgers: [
            { name: "Cheeseburger", description: "The classic cheeseburger with premium beef and American cheese slices", price: "$4.99" },
            { name: "Bacon Cheeseburger", description: "The classic bacon cheeseburger with premium bacon", price: "$8.99" },
            // ... other burgers
        ],
        Sandwiches: [
            { name: "Grilled Cheese", description: "American sliced cheese between two pieces of white bread", price: "$6.99" },
            { name: "Footlong Romeo", description: "A large footlong sandwich with special home-grown tomatoes", price: "$3.29" },
            // ... other sandwiches
        ],
        // ... other categories
    };

    return (
        <>
            {/* nav bar */}
            
            {/* menu title */}
            <div className="menu">
                <div className="menu-title">
                    <img src="/menu-ribbon-text.svg" alt="Menu Items" className="menu-title-image" />
                </div>
                
                {/* menu categories */}
                <div className="menu-container">
                    {Object.keys(menuItems).map((category) => (
                        <div key={category} className="menu-category">
                            <div className="category-name">
                                <h1>{category}</h1>
                            </div>
                            <ul>
                                {menuItems[category].map((item) => (
                                    <li key={item.name} className="menu-item">
                                        <div className="item-name">{item.name}</div>
                                        <div className="item-description">{item.description}</div>
                                        <div className="item-price">{item.price}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
