// still in implementation modee
import { useNavigate } from "react-router-dom";
import CookieManager from "../utils/CookieManager";
import { User } from "../types/dbTypes";

const CashierNavbar : React.FC<{userInfo: User}> = ({userInfo}) => {
  const navigate = useNavigate();

  return (
    <nav className="text-black pb-2 shadow-sm border-hidden rounded px-3">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="square-black border-black border-[2px] rounded">
            <img src="/logo.png" alt="Logo" className="block" />
          </div>
          <span className="font-bold text-4xl ml-2 font-ptserif">
            Welcome {userInfo.given_name}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-end">
        {/* Profile Button */}
        <button
          onClick={() => {
            CookieManager.delete('tokenResponse');
            navigate('/cashier/login');
          }}
          className="flex items-center border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif"
        >
          <img
            src={userInfo.picture || "/icons/profile.png"} 
            alt="Profile"
            className="w-6 h-6 mr-2"
          />
          {userInfo.name}
        </button>

        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-start">
          <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
              <a href="/order" className="hover:text-white">
                  create order
              </a>
          </button>
          <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
              <a href="/kitchen" className="hover:text-white">
                  kitchen
              </a>
          </button>
      </div>
    </nav>
  );
}
  
export default CashierNavbar;