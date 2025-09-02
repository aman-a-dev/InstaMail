import React, { useContext } from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
    getDomains,
    createAccount,
    getToken,
    fetchMessages
} from "./services/mailtm";
import {
    createEmail,
    getInbox,
    checkEmailStatus
} from "./services/getTestMail";
import EmailDisplay from "./components/EmailDisplay";
import InboxPanel from "./components/InboxPanel";
import CountdownTimer from "./components/CountdownTimer";
import UpgradeButton from "./components/UpgradeButton";
import AdSenseBanner from "./components/AdSenseBanner";
import Nav from "./components/Nav";
import SplitText from "./components/SplitText";
import { ProContextProvider, ProContext } from "./context/ProContext.jsx";

export default function App() {
    const { pro, setPro } = useContext(ProContext);
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [messages, setMessages] = useState([
       /* {
            id: 1,
            from: {
           address:   "Testing the inbox 📥"
            },
            subject:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, nemo corporis temporibus possimus. Placeat iste quae, maiores fuga culpa. Natus accusamus, deserunt itaque numquam velit dolorum illo unde dolores ex!"
        }*/
    ]);
    const [premium, setPremium] = useState(false); // Add this line

    // Initialize 10-min email
    async function initEmail() {
        const domains = await getDomains();
        const domain = domains["hydra:member"][0].domain;
        const address = `user${Date.now()}@${domain}`;
        const password = "tempPass123!";
        await createAccount(address, password);
        const { token } = await getToken(address, password);
        setEmail(address);
        setToken(token);
        setPremium(false); // Reset premium status when creating new temp email
    }

    // Premium Sonjj email
    async function initPremium() {
        try {
            const res = await createEmail();
            setEmail(res.email);
            setPremium(true);
            setPro(true); // Update ProContext
        } catch (error) {
            console.error("Failed to create premium email:", error);
            alert("Failed to upgrade to premium. Please try again.");
        }
    }

    // Fetch inbox
    useEffect(() => {
        if (!token) return;
        const interval = setInterval(async () => {
            const msgs = await fetchMessages(token);
            setMessages(msgs["hydra:member"] || []);
        }, 5000);
        return () => clearInterval(interval);
    }, [token]);

    useEffect(() => {
        initEmail();
    }, []);

    return (
        <>
            <ProContextProvider>
                <div className='min-h-screen w-full relative'>
                    {/* Diagonal Fade Grid Background - Top Right */}
                    <div
                        className='absolute inset-0'
                        style={{
                            backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
                            backgroundSize: "32px 32px",
                            WebkitMaskImage:
                                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
                            maskImage:
                                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
                            zIndex: "-1"
                        }}
                    />

                    <Helmet>
                        <title>TempMail SPA</title>
                        <meta
                            name='description'
                            content='
                            Free temporary email with 10 minutes validity. Premium upgrade available.'
                        />
                    </Helmet>
                    <Nav />

                    <main className='z-20 mb-72'>
                        <div className='flex text-center items-center justify-center flex-col'>
                            <h1 className='w-[75%] text-center font-light text-4xl mb-6 mt-5 md:text-5xl md:w-[80%]'>
                                <SplitText text='Get Fast' /> &#32;
                                <i class='fa-solid fa-bolt-lightning'></i>
                                &#32;
                                <span className='font-black decoration-2 text-yellow-300'>
                                    <SplitText text='100%' />
                                </span>
                                &#32;
                                <SplitText text='working Temporary' /> &#32;
                                <span className='font-black decoration-2 text-yellow-300'>
                                    <SplitText text='Email' />.
                                </span>
                            </h1>
                            <p class='text-gray-400 text-center w-[230px] md:w-[300px]'>
                                No signup No login No personal info just get
                                your email instantly!
                            </p>
                            <h3 className='text-center text-2xl mt-10 md:text-start md:mr-auto md:ml-6'>
                                Your Email &#32;
                                <i class='fa-solid fa-circle-arrow-down'></i>
                            </h3>
                        </div>
                        <div className='md:grid md:grid-cols-2 md:items-center md:justify-center'>
                            <EmailDisplay email={email} />
                            <CountdownTimer
                                duration={pro ? 86400 : 600}
                                onExpire={() =>
                                    pro ? initPremium() : initEmail()
                                }
                            />
                        </div>
                        <InboxPanel messages={messages} />
                        <AdSenseBanner />
                        <UpgradeButton onUpgrade={initPremium} />
                    </main>
                </div>
            </ProContextProvider>
        </>
    );
}
