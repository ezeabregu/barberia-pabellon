import { ObjectId } from "mongodb";
import { getBookingsCollection } from "../_lib/mongo.js";
import { verifyAdmin } from "../_lib/auth.js";

const VALID_ESTADOS = ["new", "confirmed", "cancelled"];

export default async function handler(req, res) {
  if (!verifyAdmin(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;
  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Id inválido" });
  }

  const collection = await getBookingsCollection();
  const _id = new ObjectId(id);

  if (req.method === "PATCH") {
    const { estado } = req.body || {};
    if (!VALID_ESTADOS.includes(estado)) {
      return res
        .status(400)
        .json({ error: `Estado debe ser uno de: ${VALID_ESTADOS.join(", ")}` });
    }

    const result = await collection.findOneAndUpdate(
      { _id },
      { $set: { estado } },
      { returnDocument: "after" },
    );

    if (!result) return res.status(404).json({ error: "No encontrado" });
    return res.status(200).json(result);
  }

  if (req.method === "DELETE") {
    const result = await collection.deleteOne({ _id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No encontrado" });
    }
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
