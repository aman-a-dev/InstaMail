import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import Toaster from "./Toaster.jsx";
export default function EmailDisplay({ email }) {
    const [copied, setCopied] = useState(false);
    setTimeout(() => {
        if (copied) {
            setCopied(!copied);
        }
    }, 1500);
    return (
        <>
            <div>
                <div className='flex justify-between items-center px-5 border border-solid border-yellow-100 rounded-sm bg-white md:px-10 mt-5 mb-10'>
                    <h1 className='text-2xl font-bold max-w-[90%] overflow-auto px-3 py-2'>
                        {email || "Loading..."}
                    </h1>
                    <CopyToClipboard
                        text={email}
                        onCopy={() => setCopied(true)}
                    >
                        <button className='px-3 py-2 rounded-[30%/30%] bg-yellow-300 hover:bg-yellow-200 transition-all duration-300'>
                            <i className='fa fa-copy'></i>
                        </button>
                    </CopyToClipboard>
                </div>
            </div>

            {copied && (
                <Toaster
                    icon='fa-solid fa-check'
                    msg='Copyed to clipboard successful!'
                    col='green'
                    tran={copied ? "flex" : "hidden"}
                />
            )}
        </>
    );
}

function Loader() {
    return (
        <div
            class='animate-spin inline-block size-6 border-3 border-current border-t-transparent text-yellow-600 rounded-full dark:text-yellow-500'
            role='status'
            aria-label='loading'
        >
            <span class='sr-only'>Loading...</span>
        </div>
    );
}
