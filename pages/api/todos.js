import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { method } = req;

  const { db } = await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const todos = await db.collection("todos").find({}).toArray();
        res.status(200).json({ success: true, data: todos });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
