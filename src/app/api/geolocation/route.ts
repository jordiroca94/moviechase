import { geolocation } from "@vercel/functions";

export function GET(request: Request) {
  const res = geolocation(request);
  return Response.json(res);
}
