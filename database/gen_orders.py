import random
from datetime import datetime, timedelta

items = {
    1: {'name': 'Bacon Cheeseburger', 'price': 8.29},
    2: {'name': 'Black Bean Burger', 'price': 7.59},
    3: {'name': 'Cheeseburger', 'price': 6.89},
    4: {'name': 'Gig ''em Patty Melt', 'price': 7.59},
    5: {'name': 'Classic Hamburger', 'price': 6.89},
    6: {'name': 'Aggie Chicken Club', 'price': 8.39},
    7: {'name': 'Rev''s Grilled Chicken Sandwich', 'price': 8.39},
    8: {'name': 'Spicy Chicken Sandwich', 'price': 8.39},
    9: {'name': 'Chicken Caesar Salad', 'price': 8.29},
    10: {'name': 'Double Scoop Ice Cream', 'price': 3.29},
    11: {'name': 'Aggie Shakes', 'price': 4.49},
    12: {'name': 'Cookie Ice Cream Sundae', 'price': 4.69},
    13: {'name': 'Root Beer Float', 'price': 5.49},
    14: {'name': 'French Fries', 'price': 1.99},
    15: {'name': 'Chicken Tenders', 'price': 4.99},
    16: {'name': 'Water', 'price': 1.79},
    17: {'name': 'Pepsi', 'price': 1.99},
    18: {'name': 'Corn Dog', 'price': 4.99},
    19: {'name': 'Hot Dog', 'price': 4.99},
    20: {'name': 'Kettle Chips', 'price': 0.99},
}

start_date = datetime.now() - timedelta(weeks=104)
end_date = datetime.now()

target_revenue = 2000000000
curr_revenue = 0

peak_days = [5, 35, 65, 95]

sql_commands_order = "INSERT INTO Orders (numItems, total, orderInfo, dateTime, status) VALUES "
sql_commands_junc = "INSERT INTO OrderItem_Junction (orderId, itemId, numOfItem) VALUES "

order_id = 0

while ((start_date <= end_date) and (curr_revenue <= target_revenue)):
    num_orders = random.randint(0, 200)  
    if start_date.weekday() in peak_days:
        num_orders *= 2 

    for i in range(num_orders):
        order_date = start_date + timedelta(seconds=random.randint(0, 86399))
        num_unique_items = random.randint(1, 5)
        num_total_items = 0

        item_ids = random.sample(list(items.keys()), num_unique_items)
        item_names = []

        total_cost = 0
        iteminfarr = []
        iteminf = ""
        
        for item_id in item_ids:
            num_items = random.randint(1, 4)
            num_total_items += num_items

            item_name = items[item_id]['name']
            item_price = items[item_id]['price']

            item_names.append(item_name)
            
            total_cost += item_price * num_items
            curr_revenue += item_price * num_items
            
            sql_commands_junc += f"({order_id+i+1}, {item_id}, {num_items}),\n"
            iteminf = item_name + "(" + str(num_items) + ")"
            iteminfarr.append(iteminf)

        sql_commands_order += f"({num_total_items}, {total_cost}, '{','.join(iteminfarr)}', TIMESTAMP '{order_date.strftime('%Y-%m-%d %H:%M:%S')}', 'completed'),\n"

    order_id += num_orders
    start_date += timedelta(days=1)

print(f'Total revenue: {curr_revenue}')
with open("orders_data.sql", "w") as f:
    f.write(sql_commands_order)

with open("orders_data_junc.sql", "w") as f:
    f.write(sql_commands_junc)

print("SQL commands generated and written to 'orders_data.sql'")