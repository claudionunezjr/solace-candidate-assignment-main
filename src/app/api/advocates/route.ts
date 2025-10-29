import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET() {
  try {
    const data = await db.select().from(advocates);
    return Response.json({ data, success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}
