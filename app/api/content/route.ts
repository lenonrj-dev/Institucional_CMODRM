import { NextResponse } from "next/server";

import type { SiteContent } from "../../../lib/content-types";
import { aboutContent } from "./about/data";
import { acervoContent } from "./acervo/data";
import { accessContent } from "./access/data";
import { boardContent } from "./board/data";
import { contactContent } from "./contact/data";
import { globalContent } from "./global/data";
import { homeContent } from "./home/data";
import { journalsContent } from "./journals/data";
import { personalContent } from "./personal/data";
import { politicsContent } from "./politics/data";
import { productionContent } from "./production/data";
import { teamContent } from "./team/data";
import { transparencyContent } from "./transparency/data";

const content: SiteContent = {
  home: homeContent,
  about: aboutContent,
  acervo: acervoContent,
  politics: politicsContent,
  access: accessContent,
  contact: contactContent,
  personal: personalContent,
  global: globalContent,
  transparency: transparencyContent,
  board: boardContent,
  team: teamContent,
  production: productionContent,
  journals: journalsContent,
};

export async function GET() {
  return NextResponse.json(content);
}
