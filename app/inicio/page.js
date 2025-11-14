// app/inicio/page.js
import FirstSection from "./sections/FirstSection";
import SecondSection from "./sections/SecondSection";
import ThirdSection from "./sections/ThirdSection";
import FourthSection from "./sections/FourthSection";
import FifthSection from "./sections/FifthSection";
import SixthSection from "./sections/SixthSection";
import SeventhSection from "./sections/SeventhSection";
import SearchBarSection from "./sections/SearchBarSection";

export default function Page() {
  return (
    <>
      <FirstSection
        title="CM O D R M"
        subtitle="Projeto"
        description="Centro de Memória Operária Digitalizada Rubem Machado"
        imageSrc="https://res.cloudinary.com/dc7u5spia/image/upload/v1763133986/1_de_janeiro_de_1959_2_2_bvr7a5.png"
        alt="Centro de Memória Operária Digitalizada Rubem Machado"
      />
      <SearchBarSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <SeventhSection />
    </>
  );
}
