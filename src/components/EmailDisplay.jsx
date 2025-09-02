import { useState } from "react";
import Toaster from "./Toaster.jsx";

export default function EmailDisplay({ email }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!email) return;
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);

            // Reset after 1.5s
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <>
            <div>
                <div className="flex justify-between items-center px-5 border border-solid border-yellow-100 rounded-sm bg-white md:px-10 mt-5 mb-10">
                    <h1 className="text-2xl font-bold max-w-[90%] overflow-auto px-3 py-2">
                        {email || <Loader />}
                    </h1>
                    <button
                        onClick={handleCopy}
                        className="px-3 py-2 rounded-[30%/30%] bg-yellow-300 hover:bg-yellow-200 transition-all duration-300"
                    >
                        <i className="fa fa-copy"></i>
                    </button>
                </div>
            </div>

            {copied && (
                <Toaster
                    icon="fa-solid fa-check"
                    msg="Copied to clipboard successfully!"
                    col="green"
                    tran="flex"
                />
            )}
        </>
    );
}

function Loader() {
    return (
        <div
            className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-yellow-600 rounded-full dark:text-yellow-500"
            role="status"
            aria-label="loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
}