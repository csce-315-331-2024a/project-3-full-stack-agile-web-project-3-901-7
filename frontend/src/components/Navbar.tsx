export default function Navbar() {
    return (
        <nav className="text-black p-2 flex justify-between items-center shadow-md">
            <div className="flex items-center">
                <div className="square-black"><img src="./logo.png"></img></div>
                <span className="font-bold text-lg ml-2 font-ptserif">Welcome to Rev's Grill</span>
            </div>
            <div className="flex items-center">
                <button className="bg-black hover:bg-gray-600 text-white px-2 py-1 ml-2 rounded-md text-sm"><a href="/menu" className="text-gray-300 hover:text-wh px-3 py-1 rounded-md text-sm font-medium">view menu</a></button>
                <button className="bg-black hover:bg-gray-600 text-white px-2 py-1 ml-2 rounded-md text-sm"><a href="/order" className="text-gray-300 hover:text-white px-3 py-1 rounded-md text-sm font-medium">start order</a></button>
                <button className="bg-black hover:bg-gray-600 text-white px-2 py-1 ml-2 rounded-md text-sm"><a href="/login" className="text-gray-300 hover:text-white px-3 py-1 rounded-md text-sm font-medium">login</a></button>
                <button className="bg-black hover:bg-gray-600 text-white px-2 py-1 ml-2 rounded-md text-sm">EN</button>
                <button className="bg-black hover:bg-gray-600 text-white px-2 py-1 ml-2 rounded-md text-sm">+</button>
            </div>
        </nav>
    )
}