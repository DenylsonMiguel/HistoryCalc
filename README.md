# HistoryCalc

A REST API for a calculator that stores calculation history, built with Node.js, TypeScript, MongoDB, and Mongoose.

![GitHub stars](https://img.shields.io/github/stars/DenylsonMiguel/HistoryCalc?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/DenylsonMiguel/HistoryCalc?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/DenylsonMiguel/HistoryCalc?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/DenylsonMiguel/HistoryCalc?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/DenylsonMiguel/HistoryCalc?style=for-the-badge)

---

## Overview

**HistoryCalc allows you to save, retrieve, and delete calculations through a simple API. It was designed as a backend practice project focused on TypeScript, MongoDB integration, and clean API structure.**


---

## Tech Stack

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

---

## Features

- Create and store calculations

- Retrieve the complete calculation history

- Retrieve a specific calculation by ID

- Delete calculations by ID

- JSON error handling middleware

- MongoDB integration with Mongoose

---

## Installation

### Clone the repository and install the dependencies:

```bash
git clone https://github.com/DenylsonMiguel/HistoryCalc.git
cd HistoryCalc
npm install
```

---

### Environment Variables

Create a .env file in the root directory:

```env
PORT=<your_port>
DB_URI=<your_mongodb_connection_string>
```

---

## Running the Project

### Start the development server:

```bash
npm run dev
```

---

## API Endpoints

| Method | Endpoint      | Description                               |
|--------|---------------|-------------------------------------------|
| GET    | `/`           | Returns the API welcome message           |
| POST   | `/calcs`      | Creates a new calculation                 |
| GET    | `/calcs`      | Returns all saved calculations            |
| GET    | `/calcs/:id`  | Returns a specific calculation by ID      |
| DELETE | `/calcs/:id`  | Deletes a specific calculation by ID      |

---

### Example Request
```json
POST /calcs

{
  "operation": "1+1",
  "result": "2"
}
```

### Example Response

```json
{
  "id": "67f31f8c3b17d52b9a5d2b21",
  "operation": "1+1",
  "result": "2"
}
```

---

## Future Improvements

- Unit and integration tests

- Docker support

- API documentation with Swagger

---

## License

**This project is licensed under the MIT License.**