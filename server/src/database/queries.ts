const QUERIES = {
  CREATE_TABLES: {
    CREATE_USERS_TABLE: `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    lives_in ENUM("owners","clients","waiters","chefs"),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (email)
)
`,
    CREATE_OWNERS_TABLE: `
  CREATE TABLE IF NOT EXISTS owners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (email)
)
`,

    CREATE_CLIENTS_TABLE: `
  CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (email)
)
`,

    CREATE_RESTAURANTS_TABLE: `
  CREATE TABLE IF NOT EXISTS restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    tele VARCHAR(255),
    description VARCHAR(255),
    owner_id INT,
    tables_number INT,
    FOREIGN KEY (owner_id) REFERENCES owners(id),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`,

    CREATE_REVIEWS_TABLE: `
  CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating INT NOT NULL,
    comment VARCHAR(255),
    client_id INT, 
    restaurant_id INT,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
)
`,
    CREATE_plates_TABLE: `
  CREATE TABLE IF NOT EXISTS plates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    ingredients VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    restaurant_id INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
)
`,
    CREATE_RESERVATIONS_TABLE: `
  CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME,
    guests INT,
    client_id INT,
    restaurant_id INT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (client_id) REFERENCES clients(id)
)
`,

    CREATE_STATISTICS_TALBE: `
  CREATE TABLE IF NOT EXISTS statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME,
    bookings INT NOT NULL,
    revenues INT NOT NULL,
    restaurant_id INT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
)
`,
    // is_available : make a switch in the waiter dashboard
    CREATE_WAITERS_TABLE: `
  CREATE TABLE IF NOT EXISTS waiters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_available BOOL NOT NULL DEFAULT 0, 
    restaurant_id INT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    UNIQUE (email)
)
`,
    CREATE_CHEFS_TABLE: `
  CREATE TABLE IF NOT EXISTS chefs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_available BOOL NOT NULL DEFAULT 0, 
    restaurant_id INT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    UNIQUE (email)
)
`,
    CREATE_COMMANDS_TABLE: `
  CREATE TABLE IF NOT EXISTS commands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    is_cooked BOOL DEFAULT 0,
    is_served BOOL DEFAULT 0,
    is_payed BOOL DEFAULT 0,
    plate_id INT,
    waiter_id INT,
    chef_id INT,
    restaurant_id INT,
    FOREIGN KEY (plate_id) REFERENCES plates(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (waiter_id) REFERENCES waiters(id),
    FOREIGN KEY (chef_id) REFERENCES chefs(id)
)
`,
  },
};

export default QUERIES;
