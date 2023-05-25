import "./loadEnvironment.js";
import chalk from "chalk";
import app from "./server/app.js";
import createDebug from "debug";
import connectToDatabase from "./server/database/connectToDatabase.js";

const port = process.env.PORT ?? 4000;

const debug = createDebug("bemount-api:root");

const mongoDbConnection = process.env.MONGODB_CONNECTION!;

await connectToDatabase(mongoDbConnection);

app.listen(port, () => {
  debug(chalk.blueBright(`Listening in port ${port}`));
});
