import { InferSchemaType, model, Schema } from "mongoose";

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  profilePicture: { type: String },
});

export type User = InferSchemaType<typeof schema>;
export const userModel = model<User>("user", schema);
