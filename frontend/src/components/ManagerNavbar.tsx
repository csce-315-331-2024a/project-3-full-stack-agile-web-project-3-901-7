// export default function ManagerNavbar() {
//     function changeLang() {
//         console.log("language change");
//         //
//     }

//     return (
//         <nav className="text-black pb-2 shadow-sm border-hidden rounded px-3">
//             <div className="flex flex-col sm:flex-row justify-between items-center">
//                 <div className="flex items-center">
//                     <div className="square-black border-black border-[2px] rounded">
//                         <img src="./logo.png" alt="Logo"></img>
//                     </div>
//                     <span className="font-bold text-4xl ml-2 font-ptserif">
//                         Welcome 'Manager's Name'
//                     </span>
//                 </div>
//                 <div className="flex flex-col sm:flex-row items-center sm:items-end">
//                     <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
//                         <a href="/menu" className="hover:text-white">
//                             create order
//                         </a>
//                     </button>
//                     <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
//                         <a href="/order" className="hover:text-white">
//                             order history
//                         </a>
//                     </button>
//                     <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
//                         <a href="/login" className="hover:text-white">
//                             update items
//                         </a>
//                     </button>
//                     <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
//                         <a href="/login" className="hover:text-white">
//                             reports
//                         </a>
//                     </button>
//                     <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
//                         <a href="/login" className="hover:text-white">
//                             inventory
//                         </a>
//                     </button>
//                     <button
//                         onClick={changeLang}
//                         className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif"
//                     >
//                         EN
//                     </button>
//                     <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
//                         +
//                     </button>
//                 </div>
//             </div>
//         </nav>
//     );
// }

export default function Navbar() {
    function changeLang() {
      console.log("language change");
      // Additional logic for changing language here
    }
  
    return (
      <nav className="text-black pb-2 shadow-sm border-hidden rounded px-3">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center">
            <div className="square-black border-black border-[2px] rounded">
              <img src="./logo.png" alt="Logo" className="block" />
            </div>
            <span className="font-bold text-4xl ml-2 font-ptserif">
              Welcome managerName
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-end">
            {/* Buttons here */}
            
            <div className="border-[1px] border-black px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif">
              managerName
            </div>
          </div>
        </div>
        {/* Rest of the buttons */}
        <div className="mt-4 flex flex-wrap justify-start">
            <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
                <a href="/menu" className="hover:text-white">
                    create order
                </a>
            </button>
            <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
                <a href="/order" className="hover:text-white">
                    order history
                </a>
            </button>
            <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
                <a href="/login" className="hover:text-white">
                    update items
                </a>
            </button>
            <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
                <a href="/login" className="hover:text-white">
                    reports
                </a>
            </button>
            <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
                <a href="/login" className="hover:text-white">
                    inventory
                </a>
            </button>
        </div>
      </nav>
    );
  }
  
