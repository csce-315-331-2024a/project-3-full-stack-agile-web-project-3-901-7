import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full p-8 relative bg-white">
            <Navbar />
            <div className="text-center mt-20">
                <h1 className="font-bold text-4xl font-ptserif mb-8">Welcome to Rev's Grill!</h1>
                <div className="flex justify-center gap-4">
                    <button
                        className="border-[2px] border-black bg-white hover:bg-black hover:text-white px-6 py-3 rounded-md text-lg font-medium font-ptserif transition-colors duration-200"
                        onClick={() => navigate('/menu')}
                    >
                        I am a customer
                    </button>
                    <button
                        className="border-[2px] border-black bg-white hover:bg-black hover:text-white px-6 py-3 rounded-md text-lg font-medium font-ptserif transition-colors duration-200"
                        onClick={() => navigate('/cashier/login')}
                    >
                        I am a cashier
                    </button>
                    <button
                        className="border-[2px] border-black bg-white hover:bg-black hover:text-white px-6 py-3 rounded-md text-lg font-medium font-ptserif transition-colors duration-200"
                        onClick={() => navigate('/manager/login')}
                    >
                        I am a manager
                    </button>
                    <button
                        className="border-[2px] border-black bg-white hover:bg-black hover:text-white px-6 py-3 rounded-md text-lg font-medium font-ptserif transition-colors duration-200"
                        onClick={() => navigate('/admin/login')}
                    >
                        I am an administrator
                    </button>
                </div>
            </div>
            <div className="mt-12 text-center">
                <p className="text-lg font-ptserif mb-4">
                    This is team 901-7's (Bogo sort Enjoyers) Project 3. The landing page is currently work in progrss. You can view the README for our project below:
                </p>
                <a href="https://github.com/csce-315-331-2024a/project-3-full-stack-agile-web-project-3-901-7/blob/main/README.md" 
                   className="text-blue-600 hover:text-blue-800 transition-colors duration-200" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    View README
                </a>
            </div>
        </div>
    );
}
