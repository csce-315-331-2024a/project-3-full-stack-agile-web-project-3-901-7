export type UserType = "customer" | "admin" | "manager" | "cashier";

export interface User {
    _id: number;
    email: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
}

export interface Role {
    _id: number;
    email: string;
    type: UserType;
}

export interface Item {
    _id: number;
    name: string;
    price: number;
    category: string;
    ingredientInfo: string;
    startDate: Date;
    endDate: Date | null;
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
    status?: string;
}

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

export interface Worklog {
    log_id: number;
    emp_id: number | null;
    checkin: string;
    checkout: string;
    comments: string;
}

export interface Routes {
    name: string;
    path: string;
}