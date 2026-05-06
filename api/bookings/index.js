import { getBookingsCollection } from "../_lib/mongo.js";
import { verifyAdmin } from "../_lib/auth.js";

const VALID_ESTADOS = ["new", "confirmed", "cancelled"];

function validateBookingPayload(body) {
  const required = [
    "nombre",
    "apellido",
    "telefono",
    "servicio",
    "precio",
    "duracion",
    "fecha",
    "hora",
    "barbero",
  ];

  for (const field of required) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return `Campo "${field}" es requerido`;
    }
  }

  if (body.notas && typeof body.notas !== "string") {
    return `Campo "notas" debe ser texto`;
  }

  return null;
}

export default async function handler(req, res) {
  const collection = await getBookingsCollection();

  if (req.method === "POST") {
    const body = req.body || {};
    const error = validateBookingPayload(body);
    if (error) return res.status(400).json({ error });

    const doc = {
      nombre: body.nombre.trim(),
      apellido: body.apellido.trim(),
      telefono: body.telefono.trim(),
      servicio: body.servicio.trim(),
      precio: body.precio.trim(),
      duracion: body.duracion.trim(),
      fecha: body.fecha.trim(),
      hora: body.hora.trim(),
      barbero: body.barbero.trim(),
      notas: (body.notas || "").trim(),
      estado: "new",
      createdAt: new Date(),
    };

    const conflict = await collection.findOne({
      fecha: doc.fecha,
      hora: doc.hora,
      estado: { $ne: "cancelled" },
    });
    if (conflict) {
      return res.status(409).json({ error: "Ese horario ya está reservado" });
    }

    const result = await collection.insertOne(doc);
    return res.status(201).json({ id: result.insertedId, ...doc });
  }

  if (req.method === "GET") {
    if (!verifyAdmin(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { fecha, estado } = req.query;
    const filter = {};
    if (fecha) filter.fecha = fecha;
    if (estado) {
      if (!VALID_ESTADOS.includes(estado)) {
        return res.status(400).json({ error: "Estado inválido" });
      }
      filter.estado = estado;
    }

    const items = await collection
      .find(filter)
      .sort({ fecha: 1, hora: 1 })
      .toArray();

    return res.status(200).json({ items });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
