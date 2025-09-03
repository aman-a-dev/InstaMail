import { useEffect } from "react";

export default function AdSenseBanner({ adSlot, adFormat = "auto", adLayout = "" }) {
    useEffect(() => {
        try {
            // Wait for the adsbygoogle to be available
            if (window.adsbygoogle) {
                window.adsbygoogle.push({});
            }
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <div className="ad-container my-4">
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-5123190684625680"
                data-ad-slot={adSlot || "1234567890"}
                data-ad-format={adFormat}
                data-ad-layout={adLayout}
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
}