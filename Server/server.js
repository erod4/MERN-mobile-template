require("dotenv").config();
const express = require("express");
require("./Config/DBConnect");
const user_route = require("./Routes/UserRoutes/UserRoute");
const globalErrorHandler = require("./Middleware/GlobalErroHandler");
const app = express();
const port = 3000;

/**
 * Middleware
 */
app.use(globalErrorHandler);

/**
 * Shortened user routes
 */

app.use("/API_NAME/users", user_route);

/**
 * Server
 */
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
