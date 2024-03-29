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
            
        ],
        Sandwiches: [
            { name: "Grilled Cheese", description: "American sliced cheese between two pieces of white bread", price: "$6.99" },
            { name: "Footlong Romeo", description: "A large footlong sandwich with special home-grown tomatoes", price: "$3.29" },
            
        ],
    };

    return (
        <>
            {/* nav bar */}
            
            <div className="border-4 border-black my-16 mx-8">
                {/* menu title */}
                <div className="flex flex-col items-center justify-center py-5">
                    <img src="/menu-ribbon-text.svg" alt="Menu Items" className="block my-4 w-1/2" />
                </div>
                
                {/* menu categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-16">
                    {/* {Object.keys(menuItems).map((category) => (
                        <div key={category} className="mb-4">
                            <h1 className="text-4xl font-ptserif font-bold italic border-t-2 border-b-2 border-black py-4 pl-2">{category}</h1>
                            <ul className="divide-y divide-gray-300">
                                {menuItems[category].map((item) => (
                                    <li key={item.name} className="py-2">
                                        <div className="flex justify-between">
                                            <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pl-2">{item.name}</div>
                                            <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pr-2">{item.price}</div>
                                        </div>
                                        <div className="text-gray-700 text-xl font-ptserif pt-2 pb-4 pr-64 pl-2">{item.description}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))} */}

                    {/* Left Column */}
                    <div className="mb-4 md:border-r-2 pr-8 mr-8 border-black">
                        {Object.keys(menuItems).map((category) => (
                            <div key={category} className="mb-4">
                                <h1 className="text-4xl font-ptserif font-bold italic border-t-2 border-b-2 border-black py-4">{category}</h1>
                                <ul className="divide-y divide-gray-300">
                                    {menuItems[category].map((item) => (
                                        <li key={item.name} className="py-2">
                                            <div className="flex justify-between">
                                                <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pl-2">{item.name}</div>
                                                <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pr-2">{item.price}</div>
                                            </div>
                                            <div className="text-gray-700 text-xl font-ptserif pt-2 pb-4 pr-64 pl-2">{item.description}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    
                    {/* Right Column */}
                    <div className="mb-4 md:border-l-2 pl-8 ml-8 border-black">
                        {Object.keys(menuItems).map((category) => (
                                <div key={category} className="mb-4">
                                    <h1 className="text-4xl font-ptserif font-bold italic border-t-2 border-b-2 border-black py-4">{category}</h1>
                                    <ul className="divide-y divide-gray-300">
                                        {menuItems[category].map((item) => (
                                            <li key={item.name} className="py-2">
                                                <div className="flex justify-between">
                                                    <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pl-2">{item.name}</div>
                                                    <div className="text-2xl font-bold font-ptserif pt-4 pb-2 pr-2">{item.price}</div>
                                                </div>
                                                <div className="text-gray-700 text-xl font-ptserif pt-2 pb-4 pr-64 pl-2">{item.description}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

