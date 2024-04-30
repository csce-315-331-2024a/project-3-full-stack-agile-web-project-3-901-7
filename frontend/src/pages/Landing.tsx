import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Loading from '../components/Loading';

/**
 * Interface for an item in the menu.
 */
interface Item {
    _id: number;
    name: string;
    price: number;
    category: string;
    ingredientInfo: string;
    startDate: Date;
    endDate: Date;
    picture: string;
    itemDesc: string;
}

/**
 * Landing page component.
 */
const Landing: React.FC = () => {

    const navigate = useNavigate();
    const [menuItems, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        /**
         * Fetches the available menu items from the backend.
         */
        async function fetchItems() {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAllAvailable");
            const data = await response.json();
            setItems(data);
            setIsLoading(false);
        }

        fetchItems();
    }, []);

    if (isLoading) {
        return <Loading/>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: '0px',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: '0px',
                },
            },
        ],
    };

    return (
        <div className="w-full h-full p-8 relative dark:bg-black dark:text-white border-black dark:border-white">
            <Navbar />
            <div className="text-center mt-20">
                <h1 className="font-bold text-4xl font-ptserif mb-8">Welcome to Rev's Grill!</h1>
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        className="border-[2px] hover:bg-black hover:text-white px-6 py-3 rounded-md text-lg font-medium font-ptserif transition-colors duration-200"
                        onClick={() => navigate('/menu')}
                    >
                        I am a customer
                    </button>
                    <button
                        className="border-[2px] hover:bg-black hover:text-white dark:border-white px-6 py-3 rounded-md text-lg font-medium font-ptserif transition-colors duration-200"
                        onClick={() => navigate('/cashier/login')}
                    >
                        I am a cashier
                    </button>
                    <button
                        className="border-[2px] hover:bg-black hover:text-white px-6 py-3 rounded-md text-lg font-medium font-ptserif transition-colors duration-200"
                        onClick={() => navigate('/manager/login')}
                    >
                        I am a manager
                    </button>
                    <button
                        className="border-[2px] hover:bg-black hover:text-white px-6 py-3 rounded-md text-lg font-medium font-ptserif transition-colors duration-200"
                        onClick={() => navigate('/admin/login')}
                    >
                        I am an administrator
                    </button>
                </div>
                <div className="mx-auto max-w-screen-lg">
                    <Slider {...settings}>
                        {menuItems.map(item => (
                            <div key={item._id}>
                                <img src={item.picture} alt={item.name} className="mx-auto h-64 object-cover" />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="mx-auto max-w-screen-xl mt-12 text-center"> 
                <h2 className="font-bold font-ptserif text-2xl mb-4">About Us</h2>
                <p className="text-lg font-ptserif mb-4">
                    Rev American Grill is a Texas A&M University dining staple, serving up delicious American cuisine with a Texas twist. Whether you're craving juicy burgers, mouthwatering BBQ, or refreshing salads, we have something for everyone. Our commitment to quality ingredients and exceptional service has made us a favorite among Aggies and visitors alike.
                </p>
                <p className="text-lg font-ptserif">
                    Come join us at Rev's Grill for a taste of Texas hospitality and a dining experience you won't forget!
                </p>
            </div>
            <div className="mx-auto max-w-screen-md mt-12 text-center"> 
                <p className="text-lg font-ptserif mb-4">
                    This is team 901-7's (Bogo sort Enjoyers) Project 3. You can view the README for our project below:
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

export default Landing;