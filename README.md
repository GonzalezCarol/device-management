# Device Management Application

This is a full-stack Device Management application consisting of a **Front-End** and a **Back-End**.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setting Up the Project

To run the app, you need to have both the **Back-End** and **Front-End** set up and running. Follow the instructions
below for each.

### 1. Set Up and Run the Back-End

The back-end of the application provides the API for the front-end to interact with.

#### Download the Back-End

1. Download the **Device Manager Back-End** from the repository or link provided by your team.

#### Configuration

- **Change the default port (optional):**  
  You may want to change the default port the back-end runs on. You can either modify it in the `libs/middlewares.js`
  file or create a `.env` file in the root of your back-end project with the following variable:

  ```
  PORT=<your-desired-port>
  ```

#### Running the Back-End

In the back-end directory, run the following command to start the back-end server:

```bash
npm run start
```

By default, this will start the server on `localhost:<PORT>`.

---

### 2. Set Up and Run the Front-End

The front-end interacts with the back-end API and provides the user interface.

#### Download the Front-End

1. Download the **Device Manager Front-End** from the repository or link provided by your team.

#### Configuration

- **Update the API URL in the Front-End:**

  Depending on the port where your back-end is running, you'll need to update the API URL in the front-end project. Open
  the `src/consts.ts` file and modify the `BASE_API_URL` variable to match the back-end server's address:

  ```typescript
  export const BASE_API_URL = 'http://localhost:<BACKEND_PORT>';
  ```

#### Running the Front-End

In the front-end directory, run the following command to start the front-end server:

```bash
npm run dev
```

The front-end will now be accessible at the port specified in your configuration.

---

## Running Both Back-End and Front-End

1. **Start the Back-End** by running `npm run start` in the back-end directory.
2. **Start the Front-End** by running `npm run dev` in the front-end directory.

Make sure the `BASE_API_URL` in the front-end points to the correct back-end URL (including the correct port). Once both
are running, the application should be fully functional.

---

## Demo
https://github.com/user-attachments/assets/8c859844-6b05-445b-a50d-a0cb4cf49cb7

## Tests

<img width="463" alt="Captura de Tela 2025-01-27 às 09 51 34" src="https://github.com/user-attachments/assets/d3badc50-70d9-4bbc-913b-981f05b3f29d" />
