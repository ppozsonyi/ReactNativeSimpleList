export interface ApiData {
    status: boolean;
    message: string;
    data: Data;
}

export interface Data {
    items: Item[];
}

export interface Item {
    title: string;
    artist: string;
    label: string;
    year: number;
}