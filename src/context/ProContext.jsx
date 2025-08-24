import { useContext, useState, createContext } from "react";

export const ProContext = createContext(false);
export function ProContextProvider({ children }) {
    const [pro, setPro] = useState(false);

    return (
        <ProContext.Provider value={{ pro, setPro }}>
            {children}
        </ProContext.Provider>
    );
}
