import {Culture} from "./culture.entity.ts";

export interface Farm {
    id: number;
    name: string;
    total_area: number;
    total_agriculture_area: number;
    total_vegetation_area: number;
    cultures: Culture[]
}
