import { Mongoose, connect } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import env from "./env";
import logger from "./core/logger";

/**
 * Connect to MongoDB
 */
const connectMongo = async (): Promise<Mongoose> => {
  try {
    const db = await connect(env.MONGO_URI!);
    logger.info("MongoDB connected");
    return db;
  } catch (err) {
    logger.error("MongoDB connection error");
    logger.error(err);
    process.exit(1);
  }
};

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME!,
  api_key: env.CLOUDINARY_API_KEY!,
  api_secret: env.CLOUDINARY_API_SECRET!,
});

export { cloudinary };

export default connectMongo;
