import FifthSection from "./inicio/fifthsection/page";
import FirstSection from "./inicio/firstsection/page";
import FourthSection from "./inicio/fourthsection/page";
import SecondSection from "./inicio/secondsection/page";
import SeventhSection from "./inicio/seventhsection/page";
import SixthSection from "./inicio/sixthsection/page";
import ThirdSection from "./inicio/thirdsection/page";

export default function Page() {
  return (
    <>
      <FirstSection
        title="C M O D R M"
        subtitle="Projeto"
        description="Centro de Memória Operária Digitalizada Rubem Machado"
        imageSrc="https://res.cloudinary.com/dc7u5spia/image/upload/v1758816582/407e485c-8d27-4e5c-b6d1-ebd0dcff72c5_rg3c2b.png"
        alt="Centro de Memória Operária Digitalizada Rubem Machado"
      />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <SeventhSection />
    </>
  );
}
