import dbConnect from "../../util/dbConnect";
import Todo from "../../models/Todo";
import Cors from "cors";

const initMiddleware = (middleware) => {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const paikat = await Todo.find({});
        res.status(200).json({ success: true, data: paikat });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const court = await Todo.create(req.body);
        res.status(201).json({ success: true, data: court });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
