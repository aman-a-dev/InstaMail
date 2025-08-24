import { useEffect, useState } from "react";

export default function CountdownTimer({ duration, onExpire }) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) {
            onExpire();
            return;
        }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const format = s => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <p className='text-yellow-400 font-medium text-2xl text-center pb-16 mb-10 md:mb-0 md:text-4xl'>
            <span className='text-black'>
                <div className='relative group inline-block mt-10'>
                    <i className='fa-solid fa-info-circle'></i>
                    <div
                        className='absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
              invisible group-hover:visible opacity-0 group-hover:opacity-100 
              transition-opacity bg-black text-white text-[8px] rounded px-2 py-1 whitespace-nowrap z-10'
                    >
                        The Email in the email panel will be expired after 10
                        minutes.
                    </div>
                </div>
                &#32; Time left:
            </span>
            <span className='font-black'>&#32;&#32;{format(timeLeft)}</span>
        </p>
    );
}
