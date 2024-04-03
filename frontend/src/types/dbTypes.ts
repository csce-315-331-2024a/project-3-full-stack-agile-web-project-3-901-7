export interface Item {
    _id: number;
    name: string;
    price: number;
    category: string;
    ingredientInfo: string;
    startDate: Date;
    endDate: Date;
}

export interface OrderType {
    _id: number;
    numItems: number;
    orderInfo: string;
    itemToQuantity: Map<number, number>;
    total: number;
    date: Date;
}