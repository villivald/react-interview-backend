import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  id: {
    type: String || Number,
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  complete: {
    type: Boolean,
  },
  deleted: {
    type: Boolean,
  },
  important: {
    type: Boolean,
  },
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
