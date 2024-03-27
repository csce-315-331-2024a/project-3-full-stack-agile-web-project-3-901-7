DROP TABLE Orders;
DROP TABLE Ingredients;
DROP TABLE Items;
DROP TABLE ItemIngredient_Junction;
DROP TABLE OrderItem_Junction;

CREATE TABLE Orders (
  orderId SERIAL PRIMARY KEY,
  numItems INTEGER,
  total DECIMAL,
  orderInfo VARCHAR,
  dateTime TIMESTAMP
);

CREATE TABLE Ingredients (
  ingredientId SERIAL PRIMARY KEY,
  name VARCHAR,
  quantity INT,
  minQuantity INT,
  unitPrice DECIMAL,
  supplier VARCHAR
);

CREATE TABLE Items (
  itemId SERIAL PRIMARY KEY,
  name VARCHAR,
  price DECIMAL,
  category VARCHAR,
  ingredients VARCHAR
  startDate TIMESTAMP,
  endDate TIMESTAMP
);

CREATE TABLE ItemIngredient_Junction (
  itemId INTEGER,
  ingredientId INTEGER,
  PRIMARY KEY (itemId, ingredientId)
);

CREATE TABLE OrderItem_Junction (
  orderId INTEGER,
  itemId INTEGER,
  numOfItem INTEGER,
  PRIMARY KEY (orderId, ItemId)
);