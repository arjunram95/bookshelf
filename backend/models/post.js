import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const postSchema = new Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "UserModel",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);
export default Post;
