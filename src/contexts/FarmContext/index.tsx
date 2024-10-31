import React, {createContext, useContext, useEffect, useState} from "react";
import {sendDeleteAsync, sendGetAsync, sendPostAsync, sendPutAsync} from "../../infra/Api";
import {Farm} from "../../infra/Entities/farm.entity.ts";
import {useFarmer} from "../FarmerContext";

export interface FarmContextProps {
    farm?: Farm;
    farms: Farm[];
    loading: boolean;
    getFarms: () => void;
    setFarm: React.Dispatch<React.SetStateAction<Farm | undefined>>;
    createFarm: (farm: Partial<Farm>) => Promise<Farm>;
    updateFarm: (id: number, data: Partial<Farm>) => Promise<void>;
    deleteFarm: (id: number) => Promise<void>;
}

interface FarmContextProviderProps {
    children: React.ReactNode;
}

const FarmContext = createContext<FarmContextProps>({
    farms: [],
    loading: true,
    getFarms: () => {},
    setFarm: () => {},
    createFarm: async (farmer: Partial<Farm>) => ({} as Farm),
    updateFarm: async (id: number, data: Partial<Farm>) => {},
    deleteFarm: async (id: number) => {},
});

export const FarmContextProvider : React.FC<FarmContextProviderProps> = ({ children }) => {

    const { farmer } = useFarmer();

    const [farm, setFarm] = useState<Farm>();
    const [farms, setFarms] = useState<Farm[]>([]);

    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        if(farmer) getFarms();
    }, [farmer]);


    const getFarms = () => {
        sendGetAsync<Farm[]>(`farmers/${farmer?.id}/farms`).then((farms) => setFarms(farms)).finally(() => setLoading(false));
    }

    const createFarm = async (data: Partial<Farm>) => sendPostAsync<Farm>(`farmers/${farmer?.id}/farms`, {
        farmer_id: farmer?.id, ...data
    });

    const updateFarm = async (id: number, data: Partial<Farm>) => sendPutAsync(`farmers/${farmer?.id}/farms/${id}`, data);

    const deleteFarm = async (id: number) => sendDeleteAsync(`farmers/${farmer?.id}/farms/${id}`);

    return (
        <FarmContext.Provider value={{
            farm,
            farms,
            loading,
            getFarms,
            setFarm,
            createFarm,
            updateFarm,
            deleteFarm
        }} >
            {children}
        </FarmContext.Provider>
    )

}

export const useFarms = () => useContext(FarmContext);
