import { ApiData } from "../models/Api";

export const getDataFromEndpoint = async (endpoint: string): Promise<ApiData> => {
    try {
        const response = await fetch(endpoint);
        const data: ApiData = await response.json();
        return data;
    } catch (error) {
        console.debug(error);
    }
}