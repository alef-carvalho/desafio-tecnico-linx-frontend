import { createContext } from 'react';
import {AuthContextType} from "../types.ts";

export const AuthContext = createContext({} as AuthContextType);
