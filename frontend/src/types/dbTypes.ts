export interface Item {
    _id: number;
    name: string;
    price: number;
    category: string;
    ingredientInfo: string;
    startDate: Date;
    endDate: Date;
    picture: string;
    itemDesc: string;
}

export interface Ingredient {
    _id: number;
    name: string;
    quantity: number;
    minQuantity: number;
    unitPrice: number;
    supplier: string;
}

export interface OrderType {
    numItems: number;
    orderInfo: string;
    itemToQuantity: Map<number, number>;
    total: number;
    date: Date;
}