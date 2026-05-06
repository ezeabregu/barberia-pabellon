import { getBookingsCollection } from "./_lib/mongo.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fecha } = req.query;
  if (!fecha || typeof fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return res.status(400).json({ error: "Parámetro 'fecha' inválido (YYYY-MM-DD)" });
  }

  const collection = await getBookingsCollection();
  const docs = await collection
    .find({ fecha, estado: { $ne: "cancelled" } }, { projection: { hora: 1, _id: 0 } })
    .toArray();

  const taken = [...new Set(docs.map((d) => d.hora))].sort();
  return res.status(200).json({ taken });
}
