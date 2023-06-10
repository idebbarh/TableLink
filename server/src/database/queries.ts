const QUERIES = {
  CREATE_TABLES: {
    CREATE_USERS_TABLE: `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('restaurant_owner','client','waiter','chef'),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (email)
  )
`,
    CREATE_RESTAURANTS_TABLE: `
  CREATE TABLE IF NOT EXISTS restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tele VARCHAR(255),
    description VARCHAR(255),
    owner_id INT,
    tables_number INT,
    FOREIGN KEY (owner_id) REFERENCES users(id),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`,

    CREATE_REVIEWS_TABLE: `
  CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating INT NOT NULL,
    comment VARCHAR(255),
    user_id INT, 
    restaurant_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
)
`,
    CREATE_MENUES_TABLE: `
  CREATE TABLE IF NOT EXISTS menues (
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
    user_id INT,
    restaurant_id INT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
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
    user_id INT,
    is_available BOOL, 
    restaurant_id INT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    commands_number INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
`,
    CREATE_CHEFS_TABLE: `
  CREATE TABLE IF NOT EXISTS chefs (
    user_id INT,
    is_available BOOL, 
    restaurant_id INT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    commands_number INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
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
    FOREIGN KEY (plate_id) REFERENCES menues(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (waiter_id) REFERENCES waiters(user_id),
    FOREIGN KEY (chef_id) REFERENCES chefs(user_id)
)
`,
  },
};

export default QUERIES;
