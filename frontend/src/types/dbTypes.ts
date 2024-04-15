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

export interface OrderType {
    numItems: number;
    orderInfo: string;
    itemToQuantity: Map<number, number>;
    total: number;
    date: Date;
}

export type Ingredient = {
    _id: number;
    name: string;
    quantity: number;
    minQuantity: number;
    unitPrice: number;
    supplier: string;
};

export type Order = {
    _id: number;
    numItems: number;
    dateTime: Date;
    total: number;
    orderInfo: string;
    itemToQuantity: Map<number, number>;
};

export type SalesData = {
    itemName: string;
    totalSales: number;
};

export type InventoryUsage = {
    ingredientName: string;
    totalUsed: number;
};

export type ExcessData = {
    ingredient: Ingredient;
    percentageConsumed: number;
};

export type PairItems = {
    item1: Item;
    item2: Item;
    frequency: number;
};