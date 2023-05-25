import chalk from "chalk";
import app from "./server/app.js";
import createDebug from "debug";

const port = process.env.PORT ?? 4000;

const debug = createDebug("bemount-api:root");

app.listen(port, () => {
  debug(chalk.blueBright(`Listening in port ${port}`));
});
