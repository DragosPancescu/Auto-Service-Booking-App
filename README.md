# Auto Service Booking Management Web App

## Overview

This web application, built with React and Node.js, allows users to manage bookings with an auto service firm. It provides a seamless experience for both users and the firm to handle bookings efficiently.

## Motivation

The motivation behind creating this application was to learn and gain practical experience with React and Node.js, by building a full-stack web application.
## Features

### User Capabilities

- **User Account Creation & Authentication**
  - Users can create an account and log in to access the app's features.

- **Booking Management**
  - Users can make multiple bookings for auto services.
  - Users can view and manage their current and past bookings.

### Firm Capabilities

- **Account Management**
  - The firm can manage user accounts, including creating, updating, and deleting accounts.
  - The firm can filter user accounts based on various criteria.

- **Booking Management**
  - The firm can create bookings on behalf of users.
  - The firm can view, update, and manage all bookings.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/DragosPancescu/Auto-Service-Booking-App
    cd <repository-directory>
    ```

2. Install frontend dependencies:
    ```bash
    cd client
    npm install
    ```

3. Install backend dependencies:
    ```bash
    cd ../server
    npm install
    ```
4. Create a `.env` file in the `server` directory with the following content:
    ```plaintext
    MYSQL_HOST          = localhost
    MYSQL_USER          = root
    MYSQL_PASSWORD      = your_password
    MYSQL_DATABASE      = your_database
    MYSQL_PORT          = your_mysql_port
    SERVER_PORT         = 5000
    DB_DIALECT          = mysql
    POOL_MAX            = 5
    POOL_MIN            = 0
    POOL_ACQUIRE        = 30000
    POOL_IDLE           = 10000
    ACCESS_TOKEN_SECRET = your_access_token_secret
    ```

### Running the Application

1. Start the backend server:
    ```bash
    cd server
    npm start
    ```

2. Start the frontend development server:
    ```bash
    cd ../client
    npm start
    ```
### Optional: Seeding the Database

If you want some test data, you can run the seeders with these commands:
```bash
cd server
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all
```

