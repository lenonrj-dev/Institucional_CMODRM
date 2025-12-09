// app/inicio/page.tsx
import FirstSection from "./sections/FirstSection";
import SecondSection from "./sections/SecondSection";
import ThirdSection from "./sections/ThirdSection";
import FourthSection from "./sections/FourthSection";
import FifthSection from "./sections/FifthSection";
import SixthSection from "./sections/SixthSection";
import SeventhSection from "./sections/SeventhSection";
import SearchBarSection from "./sections/SearchBarSection";
import type { SiteContent } from "../api/content/route";

async function getContent(): Promise<SiteContent> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${base}/api/content`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Não foi possível carregar o conteúdo do site");
  }
  return res.json();
}

export default async function Page() {
  const { home } = await getContent();

  return (
    <>
      <FirstSection imageSrc={home.hero.imageSrc} alt={home.hero.alt} logos={home.hero.logos} />
      <SearchBarSection content={home.search} />
      <SecondSection content={home.featuredCollections} />
      <ThirdSection content={home.personalTimeline} />
      <FourthSection content={home.journals} />
      <FifthSection content={home.team} />
      <SixthSection content={home.access} />
      <SeventhSection content={home.politics} />
    </>
  );
}
