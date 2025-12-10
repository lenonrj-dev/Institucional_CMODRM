import { NextResponse } from "next/server";

import { siteContent } from "../../../lib/get-site-content";

export async function GET() {
  return NextResponse.json(siteContent);
}
