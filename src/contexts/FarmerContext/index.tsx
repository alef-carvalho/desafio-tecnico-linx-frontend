import React, {createContext, useContext, useEffect, useState} from "react";
import {sendDeleteAsync, sendGetAsync, sendPostAsync, sendPutAsync} from "../../infra/Api";
import {Farmer} from "../../infra/Entities/farmer.entity.ts";

export interface FarmerContextProps {
    farmer?: Farmer;
    farmers: Farmer[];
    setFarmer: React.Dispatch<React.SetStateAction<Farmer | undefined>>;
    setFarmers?: React.Dispatch<React.SetStateAction<Farmer[]>>;
    fetchFarmers: () => void;
    createFarmer: (farmer: Partial<Farmer>) => Promise<Farmer>;
    updateFarmer: (id: number, data: Partial<Farmer>) => Promise<void>;
    deleteFarmer: (id: number) => Promise<void>;

}

interface FarmerContextProviderProps {
    children: React.ReactNode;
}

const FarmerContext = createContext<FarmerContextProps>({
    farmers: [],
    fetchFarmers: () => {},
    setFarmer: () => {},
    setFarmers: () => {},
    createFarmer: async (farmer: Partial<Farmer>) => ({} as Farmer),
    updateFarmer: async (id: number, data: Partial<Farmer>) => {},
    deleteFarmer: async (id: number)  => {},
});

export const FarmerContextProvider : React.FC<FarmerContextProviderProps> = ({ children }) => {

    const [farmer, setFarmer] = useState<Farmer>();
    const [farmers, setFarmers] = useState<Farmer[]>([]);

    useEffect(() => {
        fetchFarmers();
    }, []);

    const fetchFarmers = () => sendGetAsync<Farmer[]>("farmers").then((farmers) => setFarmers(farmers));

    const createFarmer = async (farmer: Partial<Farmer>) => sendPostAsync<Farmer>("farmers", farmer);

    const updateFarmer = async (id: number, data: Partial<Farmer>) => sendPutAsync(`farmers/${id}`, data);

    const deleteFarmer = async (id: number) => sendDeleteAsync(`farmers/${id}`);

    return (
        <FarmerContext.Provider value={{ farmer, farmers, fetchFarmers, setFarmer, setFarmers,
            createFarmer,
            updateFarmer,
            deleteFarmer
        }}>
            {children}
        </FarmerContext.Provider>
    )

}

export const useFarmer = () => useContext(FarmerContext);
