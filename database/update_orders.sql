DROP TABLE OrderItem_Junction;
DROP TABLE Orders;

CREATE TABLE Orders (
  orderId SERIAL PRIMARY KEY,
  numItems INTEGER,
  total DECIMAL,
  orderInfo VARCHAR,
  dateTime TIMESTAMP,
  status VARCHAR
);

CREATE TABLE OrderItem_Junction (
  orderId INTEGER,
  itemId INTEGER,
  numOfItem INTEGER,
  PRIMARY KEY (orderId, ItemId)
);
