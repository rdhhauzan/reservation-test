# Reservation System API Documentation

## 1. Tech Stack
The application uses the following technologies:
- **Node.js (20.11.0)** with **Nest.Js** for backend development.
- **PostgreSQL (v17)** as the database.
- **Postman** for API testing.
- **Jest** for testing.

---

## 2. Installation & How to Run

### Prerequisites
- Ensure you have **Node.js** and **npm** installed on your system.
- Install **PostgreSQL** and set up a database.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/rdhhauzan/reservation-test.git
   cd reservation-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     DATABASE_URL="<your-database-url>"
     EMAIL_HOST="<smtp-host>"
     EMAIL_PORT="<smtp-port>"
     EMAIL_USERNAME="<smtp-username>"
     EMAIL_PASSWORD="<smtp-password>"
     ```

4. Sync Database with Prisma:
   ```bash
   npx prisma db push
   ```
   ```bash
   npx prisma generate
   ```

5. Start the server:
   ```bash
   npm run start
   ```

6. To run tests:
   ```bash
   npm run test
   ```

---

## 3. Deployment Link
The live application can be accessed at: [**Deployment Link**](https://your-deployment-url.com)

---

## 4. Screenshot Running `npm run test`
Below is a screenshot of running tests successfully:
![npm test](./screenshots/jest-test.png)

---

## 5. API Routes

| **Route**                 | **Method** | **Description**                   | **Request Body**                                                                              |
|---------------------------|------------|-----------------------------------|------------------------------------------------------------------------------------------------------------------|
| `/customer`               | POST       | Add a new customer.              | `name`, `email`, `phone`                                                             |
| `/customer`               | GET        | Get all customers.               | -                                                                                                                |
| `/customer/:id`           | GET        | Get a customer by ID.            | -                                                                                                                |
| `/customer/:id`           | PATCH      | Update a customer by ID.         | `name`, `email`, `phone`                                                             |
| `/customer/:id`           | DELETE     | Delete a customer by ID.         | -                                                                                                                |
| `/table`                  | POST       | Add a new table.                 | `tableNumber`, `capacity`, `isAvailable`                                         |
| `/table`                  | GET        | Get all tables.                  | -                                                                                                                |
| `/table/:id`              | GET        | Get a table by ID.               | -                                                                                                                |
| `/table/:id`              | PATCH      | Update a table by ID.            | `tableNumber`, `capacity`, `isAvailable`                                           |
| `/table/:id`              | DELETE     | Delete a table by ID.            | -                                                                                                                |
| `/reservation`            | POST       | Create a new reservation.        | `customerId`, `tableId`, `startTime`, `endTime`                                      |

---
