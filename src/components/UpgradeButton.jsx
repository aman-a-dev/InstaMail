import { ProContext } from "../context/ProContext.jsx";
import { useContext } from "react";

export default function UpgradeButton({ onUpgrade }) {
    const { pro, setPro } = useContext(ProContext);
    const handlePay = () => {
        alert("Not available yet! 😔 ");
        alert(pro);
        // open Chapa payment widget
        // const handler = window.ChapaPay;
        // handler?.({
        //     public_key: "CHAPUBK_TEST-cHEPfO9MQtLmxFfyN8rU1wMLgmuAP47N", // replace with your Chapa key
        //     tx_ref: "txn_" + Date.now(),
        //     amount: 5,
        //     currency: "USD",
        //     callback_url: window.location.href,
        //     onClose: () => console.log("Payment closed"),
        //     onSuccess: () => {
        //         alert("Payment successful! Premium activated.");
        //         onUpgrade();
        //     }
        // });
    };

    return (
        <details class='[&:open>summary]:ring-2 relative m-3'>
            <summary class='ring-yellow-400 list-none bg-yellow-400 w-10 h-10 rounded-[30%/30%] flex items-center justify-center'>
                <i class='fa-solid fa-crown'></i>
            </summary>
            <div
                className='shadow-lg absolute left-[15%] top-[40%] p-3 rounded w-[300px] md:left-[5%] md:w-max'
                style={{
                    backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #FFC424 100%)
      `,
                    backgroundSize: "100% 100%"
                }}
            >
                <div className='flex text-center text-2xl py-2 gap-3'>
                    <h2 className='font-extralight'>
                        <i class='fa-solid fa-star'></i>
                        Features
                    </h2>
                    <span class='text-3xl font-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-700 bg-clip-text text-transparent'>
                        $3/24hr
                    </span>
                </div>
                <ul>
                    <li className='flex gap-1 items-center'>
                        <i class='fa-regular fa-circle-check'></i>
                        <span>
                            Your email will work for 24 hours instead of 10 min.
                        </span>
                    </li>
                    <li className='flex gap-1 items-center'>
                        <i class='fa-regular fa-circle-check'></i>
                        <span>Get faster email inbox.</span>
                    </li>
                    <li className='flex gap-1 items-center'>
                        <i class='fa-regular fa-circle-check'></i>
                        <span>No ads.</span>
                    </li>
                </ul>
                <button
                    onClick={handlePay}
                    className='m-3 w-[90%] text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-1000'
                >
                    <span>Upgrade to Premium</span>
                    <i class=''></i>
                </button>
            </div>
        </details>
    );
}
