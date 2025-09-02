import { useContext, useState, createContext, useEffect } from "react";

export const ProContext = createContext(false);
export function ProContextProvider({ children }) {
    const [pro, setPro] = useState(() => {
        let isPro = localStorage.getItem("isInstaMailProUser");
        if (isPro) {
            return isPro;
        } else {
            return false;
        }
    });

    return (
        <ProContext.Provider value={{ pro, setPro }}>
            {children}
        </ProContext.Provider>
    );
}
