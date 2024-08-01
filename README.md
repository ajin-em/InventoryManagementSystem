# Inventory Management System

This is an Inventory Management System with a backend built using Django and PostgreSQL, and a frontend built using React, Vite, and Tailwind CSS. The application includes features such as user registration, login, product creation (including variants and subvariants), editing (including stock management), deleting, and product listing.

## Hosted Application

You can access the hosted application [here](https://inventory-management-system-steel.vercel.app/).

## Features

- User Registration
- User Login
- Product Creation (including variants and subvariants)
- Product Editing (including stock management)
- Product Deletion
- Product Listing

## Backend

- Framework: Django
- Database: PostgreSQL

## Frontend

- Framework: React
- Build Tool: Vite
- Styling: Tailwind CSS

## Installation Guide

### Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/ajin-em/InventoryManagementSystem.git
   cd InventoryManagementSystem/backend
2. **Create a virtual environment**
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
3. **Install dependencies**
    pip install -r requirements.txt
4. **Configure PostgreSQL**
    CREATE DATABASE inventory_management;
    CREATE USER inventory_user WITH PASSWORD 'yourpassword';
    ALTER ROLE inventory_user SET client_encoding TO 'utf8';
    ALTER ROLE inventory_user SET default_transaction_isolation TO 'read committed';
    ALTER ROLE inventory_user SET timezone TO 'UTC';
    GRANT ALL PRIVILEGES ON DATABASE inventory_management TO inventory_user;
5. **Configure environment variables**(optional, for security purpose)
    DATABASE_NAME=inventory_management
    DATABASE_USER=inventory_user
    DATABASE_PASSWORD=yourpassword
    DATABASE_HOST=localhost
    DATABASE_PORT=5432

6. **Run migrations**
    python manage.py migrate
7. **Create a superuser**
   python manage.py createsuperuser
8. **Run the development server**
   python manage.py runserver

### Frontend Setup
1. **Navigate to the frontend directory**
   cd ../frontend
2. **Install dependencies**
   npm install
3. **Install Tailwind CSS**
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
4. **Configure Tailwind CSS**
   module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
5. **Add Tailwind directives to your CSS**
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
6. **Run the development server**
   npm run dev

## Running the Application
  -The backend server will be running on http://localhost:8000.
  -The frontend server will be running on http://localhost:3000.
## Deploying the Application
  -For deployment, ensure the CORS settings are correctly configured to allow the frontend and backend servers to communicate. You can configure CORS in the Django settings file.
## License
  This project is licensed under the MIT License. See the LICENSE file for details.
  




