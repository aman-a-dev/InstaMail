import { useState, useContext } from "react";
import { ProContext } from "../context/ProContext.jsx";
import Toaster from "./Toaster.jsx";

export default function UpgradeButton({ onUpgrade }) {
    const { pro, setPro } = useContext(ProContext);
    const [isLoading, setIsLoading] = useState(false);
    const [toster, setToster] = useState(false);
    const [chapaLoaded, setChapaLoaded] = useState(false);
    const handlePay = () => {
        setIsLoading(true);
        setToster(!toster);
    };
    setTimeout(() => {
        if (toster) {
            setToster(!toster);
        }
    }, 2000);
    return (
        <>
            <Toaster
                icon='fa-solid fa-triangle-exclamation'
                msg='Upgrade to pro is not available now.'
                col='yellow'
                tran={toster ? "flex" : "hidden"}
            />
            <div className='fixed bottom-3 right-3'>
                <details className='[&:open>summary]:ring-2 relative m-3'>
                    <summary className='ring-yellow-400 list-none bg-yellow-400 w-10 h-10 rounded-[30%/30%] flex items-center justify-center cursor-pointer'>
                        <i className='fa-solid fa-crown'></i>
                    </summary>
                    <div
                        className='shadow-lg absolute right-[25%] bottom-[70%] p-3 rounded w-[300px] md:right-[35%] md:w-max bg-white'
                        style={{
                            backgroundImage: `radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #FFC424 100%)`,
                            backgroundSize: "100% 100%"
                        }}
                    >
                        <div className='flex text-center text-2xl py-2 gap-3'>
                            <h2 className='font-extralight'>
                                <i className='fa-solid fa-star'></i>
                                Features
                            </h2>
                            <span className='text-3xl font-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-700 bg-clip-text text-transparent'>
                                $3/24hr
                            </span>
                        </div>
                        <ul className='space-y-2'>
                            <li className='flex gap-1 items-center'>
                                <i className='fa-regular fa-circle-check pr-2'></i>
                                <span>24-hour email validity</span>
                            </li>
                            <li className='flex gap-1 items-center'>
                                <i className='fa-regular fa-circle-check pr-2'></i>
                                <span>Faster email delivery</span>
                            </li>
                            <li className='flex gap-1 items-center'>
                                <i className='fa-regular fa-circle-check pr-2'></i>
                                <span>Ad-free experience</span>
                            </li>
                        </ul>
                        {pro ?
                        
                          <button
                            className='m-3 w-[90%] text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br shadow-lg shadow-yellow-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-1000'
                        >
                            You are pro user
                        </button>
                        
                        :
                        <button
                            onClick={handlePay}
                            className='m-3 w-[90%] text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br shadow-lg shadow-yellow-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-1000'
                        >
                            {isLoading ? "Processing..." : "Upgrade to Premium"}
                        </button>
                        }
                    </div>
                </details>
            </div>
        </>
    );
}
