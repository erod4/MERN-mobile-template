require("dotenv").config();
const express = require("express");
require("./Config/DBConnect");
const user_route = require("./Routes/UserRoutes/UserRoute");
const cors = require("cors");
const globalErrorHandler = require("./Middleware/GlobalErroHandler");
const app = express();
const port = 3000;

/**
 * Middleware
 */

app.use(express.json());
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

/**
 * Shortened user routes
 */

app.use("/API_NAME/users", user_route);

app.use(globalErrorHandler);
/**
 * Server
 */
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
