import Connect from "../../../public/assets/images/connect.png";
import Pitch from "../../../public/assets/images/pitch.png";
import { ScheduleDays } from "../../utils/ScheduleDays";
import Activity1 from "../Activity1";
import Activity2 from "../Activity2";
import CompaniesSection from "../CompaniesSection";
import InfoText from "../InfoText";
import Map from "../Map";
import Schedule from "../Schedule";
import SponsorsSection from "../SponsorsSection";

interface ContentProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

const Content: React.FC<ContentProps> = ({ contentRef }) => {
  const REGISTRATION_LINK =
    "https://docs.google.com/forms/d/e/1FAIpQLSfKNCeOUtT_RboqnAFRfaiWRB6y969mhC__QElflp4rEJe-nA/viewform";

  return (
    <section
      ref={contentRef}
      className="center container mx-auto rounded-lg p-10 sm:w-3/4 lg:py-14 lg:w-full"
    >
      <InfoText
        days={[19, 20]}
        month="Dezembro"
        beginningTime="9h00"
        endTime="17:30h"
      />

      <section className="my-16 grid w-full grid-cols-1 justify-items-center gap-y-10 md:grid-rows-2 md:gap-y-15">
        <div className="col-span-1">
          <Activity1 logo={Pitch} title={"Pitch"} day={28}>
            O primeiro dia é dedicado aos <span className="font-bold text-orange-600">pitches </span>
            por parte das empresas presentes no evento.<br />
            Ao longo do dia terás a oportunidade de <span className="font-bold text-orange-600">conhecer </span>
            melhor as empresas de forma a conseguires filtrar os teus
            <span className="font-bold text-orange-600"> interesses</span> para o próximo dia.
          </Activity1>
        </div>

        <div className="col-span-1">
          <Activity2 logo={Connect} title={"Connection's train"} day={29}>
            No segundo dia terás a oportunidade de <span className="font-bold text-orange-600">interagir </span>
            diretamente com os representantes das empresas presentes de forma a
            <span className="font-bold text-orange-600"> esclareceres</span> as tuas dúvidas. Aproveita esta
            oportunidade para aumentares a tua rede de contactos e receberes
            <span className="font-bold text-orange-600"> feedback</span> por parte das empresas do teu interesse.
          </Activity2>
        </div>
      </section>
    </section>
  );
};

export default Content;
