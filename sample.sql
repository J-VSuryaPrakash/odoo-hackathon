CREATE DATABASE IF NOT EXISTS transitops;
USE transitops;

-- ==========================================================
-- TABLE: roles
-- ==========================================================
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- ==========================================================
-- TABLE: users
-- ==========================================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    role_id INT NOT NULL,
    status ENUM('ACTIVE','INACTIVE','LOCKED') DEFAULT 'ACTIVE',
    failed_attempts INT DEFAULT 0,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
);

-- ==========================================================
-- TABLE: permissions
-- ==========================================================
CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    permission_name VARCHAR(100) NOT NULL UNIQUE,
    module_name VARCHAR(50)
);

-- ==========================================================
-- TABLE: role_permissions
-- ==========================================================
CREATE TABLE role_permissions (
    role_id INT,
    permission_id INT,

    PRIMARY KEY(role_id, permission_id),

    FOREIGN KEY(role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE,

    FOREIGN KEY(permission_id)
        REFERENCES permissions(id)
        ON DELETE CASCADE
);

-- ==========================================================
-- TABLE: login_history
-- ==========================================================
CREATE TABLE login_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    logout_time DATETIME,
    ip_address VARCHAR(50),
    device VARCHAR(100),
    success BOOLEAN,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- ==========================================================
-- TABLE: vehicles
-- ==========================================================
CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_no VARCHAR(30) NOT NULL UNIQUE,
    vehicle_name VARCHAR(100),
    vehicle_type ENUM('Van','Truck','Mini','Trailer','Other'),
    manufacturer VARCHAR(50),
    model VARCHAR(50),
    capacity_kg DECIMAL(10,2),
    purchase_cost DECIMAL(12,2),
    odometer INT DEFAULT 0,
    fuel_type ENUM('Petrol','Diesel','Electric','CNG'),
    purchase_date DATE,

    status ENUM(
        'AVAILABLE',
        'ON_TRIP',
        'IN_SHOP',
        'RETIRED'
    ) DEFAULT 'AVAILABLE',

    region VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- TABLE: vehicle_documents
-- ==========================================================
CREATE TABLE vehicle_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    document_type VARCHAR(50),
    document_number VARCHAR(100),
    expiry_date DATE,
    file_path VARCHAR(255),

    FOREIGN KEY(vehicle_id)
        REFERENCES vehicles(id)
        ON DELETE CASCADE
);

-- ==========================================================
-- TABLE: drivers
-- ==========================================================
CREATE TABLE drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    driver_name VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) UNIQUE,
    license_type ENUM('LMV','HMV'),
    phone VARCHAR(15),
    address TEXT,
    license_expiry DATE,
    joining_date DATE,
    trip_completion_rate DECIMAL(5,2),

    status ENUM(
        'AVAILABLE',
        'ON_TRIP',
        'OFF_DUTY',
        'SUSPENDED'
    ) DEFAULT 'AVAILABLE',

    safety_status ENUM(
        'AVAILABLE',
        'SUSPENDED'
    ) DEFAULT 'AVAILABLE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- TABLE: driver_documents
-- ==========================================================
CREATE TABLE driver_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT,
    document_name VARCHAR(100),
    expiry_date DATE,
    file_path VARCHAR(255),

    FOREIGN KEY(driver_id)
        REFERENCES drivers(id)
        ON DELETE CASCADE
);

-- ==========================================================
-- TABLE: trips
-- ==========================================================
CREATE TABLE trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_no VARCHAR(20) UNIQUE,
    source VARCHAR(100),
    destination VARCHAR(100),

    vehicle_id INT,
    driver_id INT,

    cargo_weight DECIMAL(10,2),
    planned_distance DECIMAL(10,2),
    actual_distance DECIMAL(10,2),

    estimated_time INT,
    actual_time INT,

    dispatch_time DATETIME,
    arrival_time DATETIME,

    status ENUM(
        'DRAFT',
        'DISPATCHED',
        'COMPLETED',
        'CANCELLED'
    ) DEFAULT 'DRAFT',

    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(vehicle_id)
        REFERENCES vehicles(id),

    FOREIGN KEY(driver_id)
        REFERENCES drivers(id),

    FOREIGN KEY(created_by)
        REFERENCES users(id)
);

-- ==========================================================
-- TABLE: trip_status_history
-- ==========================================================
CREATE TABLE trip_status_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT,
    status VARCHAR(30),
    remarks TEXT,
    changed_by INT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(trip_id)
        REFERENCES trips(id)
        ON DELETE CASCADE,

    FOREIGN KEY(changed_by)
        REFERENCES users(id)
);

-- ==========================================================
-- TABLE: maintenance_logs
-- ==========================================================
CREATE TABLE maintenance_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT,
    service_type VARCHAR(100),
    description TEXT,
    cost DECIMAL(10,2),
    service_date DATE,

    status ENUM(
        'ACTIVE',
        'IN_PROGRESS',
        'COMPLETED'
    ),

    performed_by VARCHAR(100),
    next_service_due DATE,

    FOREIGN KEY(vehicle_id)
        REFERENCES vehicles(id)
);

-- ==========================================================
-- TABLE: fuel_logs
-- ==========================================================
CREATE TABLE fuel_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT,
    trip_id INT,

    date DATE,

    liters DECIMAL(10,2),
    price_per_liter DECIMAL(10,2),
    amount DECIMAL(10,2),

    fuel_station VARCHAR(100),
    odometer INT,

    FOREIGN KEY(vehicle_id)
        REFERENCES vehicles(id),

    FOREIGN KEY(trip_id)
        REFERENCES trips(id)
);

-- ==========================================================
-- TABLE: expenses
-- ==========================================================
CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,

    trip_id INT,
    vehicle_id INT,

    expense_type ENUM(
        'TOLL',
        'REPAIR',
        'PARKING',
        'MISC',
        'PENALTY'
    ),

    amount DECIMAL(10,2),
    remarks TEXT,
    expense_date DATE,

    FOREIGN KEY(trip_id)
        REFERENCES trips(id),

    FOREIGN KEY(vehicle_id)
        REFERENCES vehicles(id)
);

-- ==========================================================
-- TABLE: settings
-- ==========================================================
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    depot_name VARCHAR(100),
    currency VARCHAR(10),
    distance_unit VARCHAR(20),

    updated_by INT,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY(updated_by)
        REFERENCES users(id)
);
