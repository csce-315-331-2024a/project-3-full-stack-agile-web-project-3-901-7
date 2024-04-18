import { OrderType } from "./dbTypes";

export const defaultOrder: OrderType = {
    numItems: 0,
    orderInfo: "",
    itemToQuantity: new Map(),
    total: 0,
    date: new Date()
};

export const defaultCategories: {name: string, icon: string}[] = [
    {name: "Burger", icon: "/icons/burger.png"},
    {name: "Chicken", icon: "/icons/chicken.svg"},
    {name: "Side", icon: "/icons/meal.svg"},
    {name: "Salad", icon: "/icons/salad.svg"},
    {name: "Snack", icon: "/icons/appetizer.svg"},
    {name: "Beverage", icon: "/icons/beverages.svg"},
    {name: "Dessert", icon: "/icons/treats.svg"},
    {name: "Seasonal", icon: "/icons/seasonal.svg"}
]