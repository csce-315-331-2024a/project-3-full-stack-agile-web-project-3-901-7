// still in implementation modee
import { useNavigate } from "react-router-dom";
import CookieManager from "../utils/CookieManager";
import { User } from "../types/dbTypes";

const AdminNavbar : React.FC<{userInfo: User}> = ({userInfo}) => {
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
            navigate('/admin/login');
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
              <a href="/admin/roles" className="hover:text-white">
                  edit roles
              </a>
          </button>
          <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 ml-6 rounded-md text-lg font-medium font-ptserif">
              <a href="/manager" className="hover:text-white">
                  manager page
              </a>
          </button>
          <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 m-2 rounded-md text-lg font-medium font-ptserif">
              <a href="/cashier" className="hover:text-white">
                  cashier page
              </a>
          </button>
      </div>
    </nav>
  );
}
  
export default AdminNavbar;