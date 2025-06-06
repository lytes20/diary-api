import { InferSchemaType, model, Schema } from "mongoose";

const schema = new Schema({
  fullname: String,
  username: String,
  email: { type: String, required: true },
  password: String,
});

export type User = InferSchemaType<typeof schema>;
export const userModel = model<User>("user", schema);
