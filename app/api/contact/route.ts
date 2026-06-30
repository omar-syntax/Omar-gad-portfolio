import { handleContactPost } from "@/backend/controllers/contact";

export async function POST(req: Request) {
  return handleContactPost(req);
}
