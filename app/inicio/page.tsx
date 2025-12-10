// app/inicio/page.tsx
import FirstSection from "./sections/FirstSection";
import SecondSection from "./sections/SecondSection";
import ThirdSection from "./sections/ThirdSection";
import FourthSection from "./sections/FourthSection";
import FifthSection from "./sections/FifthSection";
import SixthSection from "./sections/SixthSection";
import SeventhSection from "./sections/SeventhSection";
import SearchBarSection from "./sections/SearchBarSection";
import { getSiteContent } from "../../lib/get-site-content";

export default async function Page() {
  const { home } = await getSiteContent();

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
