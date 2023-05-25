import createDebug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";

const debug = createDebug("bemount-api:connectToDatabase");

const connectToDatabase = async (connectionMongoDb: string) => {
  try {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret._id;
      },
    });
    await mongoose.connect(connectionMongoDb);
  } catch (error: unknown) {
    debug(
      chalk.redBright(`Error connecting database ${(error as Error).message}`)
    );
  }
};

export default connectToDatabase;
