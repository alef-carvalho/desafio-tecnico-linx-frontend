import React, {createContext, useContext, useEffect, useState} from "react";
import {sendGetAsync} from "../../infra/Api";
import {Culture} from "../../infra/Entities/culture.entity.ts";

export interface CultureContextProps {
    cultures: Culture[];
    loading: boolean;
    getCultures: () => void;
}

interface CultureContextProviderProps {
    children: React.ReactNode;
}

const CultureContext = createContext<CultureContextProps>({
    cultures: [],
    loading: true,
    getCultures: () => {},
});

export const CultureContextProvider : React.FC<CultureContextProviderProps> = ({ children }) => {

    const [cultures, setCultures] = useState<Culture[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        getCultures();
    }, []);


    const getCultures = () => {
        sendGetAsync<Culture[]>(`cultures`)
            .then((cultures) => setCultures(cultures))
            .finally(() => setLoading(false));
    }

    return (
        <CultureContext.Provider value={{
            cultures,
            loading,
            getCultures,
        }} >
            {children}
        </CultureContext.Provider>
    )

}

export const useCultures = () => useContext(CultureContext);
