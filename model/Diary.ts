import { InferSchemaType, model, Schema } from "mongoose";

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  summary: { type: String },
});

export type Diary = InferSchemaType<typeof schema>;
export const DiaryModel = model<Diary>("diary", schema);
