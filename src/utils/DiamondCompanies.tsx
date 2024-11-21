import { Archive, Leaf, Trophy, Chart } from "@/styles/Icons";

import { CompanyProps } from "../components/Companies/Company";
import { armisLogo, hitachiLogo, convatecLogo } from "./CompaniesImages";

export const DiamondCompanies: CompanyProps[] = [
  {
    logoHref: armisLogo,
    name: "armis",
    modalInformation: {
      title: "Armis",
      bodyText: (
        <p>
          A ARMIS é um grupo tecnológico com mais de 19 anos de história, dedicado à inovação, desenvolvimento e
          implementação de soluções que potenciam o crescimento dos seus clientes. Com uma oferta diversificada com produtos
          inovadores e especializações em Cibersegurança, Inteligência Artificial, Business Intelligence, Enterprise Solutions e Data,
          atuamos nos setores mais desafiantes do mercado. A nossa presença global estende-se por localizações estratégicas no
          Porto, Lisboa, São Paulo, São José dos Campos, Miami, Nova Iorque e Dubai, sendo uma multinacional que realiza
          projetos internacionais em diversos países. O nosso lema, “Moving Business Through Technology”, reflete a nossa missão
          de dinamizar a evolução dos negócios através de soluções tecnológicas de ponta, com um compromisso contínuo em
          entregar projetos desafiantes com máxima qualidade e eficiência.
        </p>
      ),
      instagramLink: "https://www.instagram.com/armisgroup/",
      linkedinLink: "https://www.linkedin.com/company/armis/",
      facebookLink: "https://www.facebook.com/grupoarmis/",
      youtubeLink: "https://www.youtube.com/@armisgroup",
      website: "https://www.armis.pt",
      videoTitle: "Vídeo promocional",
      videoHref: "https://www.youtube.com/watch?v=QkeMa02JqD4",
      facts: [
        {
          iconSrc: Trophy,
          description:
            "Multinacional com a sua presença em 11 países diferentes",
        },
        {
          iconSrc: Archive,
          description: "+ 18 anos de história",
        },
        {
          iconSrc: Leaf,
          description: "Acolhimento de estagiários curriculares",
        },
      ],
    },
    className: "w-3/4",
    interests: ["AI", "Mobile", "Software Development", "Backend"],
  },
  {
    logoHref: convatecLogo,
    name: "convatec",
    interests: [],
    modalInformation: {
      title: "ConvaTec",
      bodyText: (
        <>
          <p>
            A ConvaTec é uma companhia global de tecnologias e produtos médicos,
            com posições de liderança de mercado no tratamento de feridas, cuidados
            em ostomia, continência e cuidado intensivo, além de atuar com
            dispositivos de infusão.
          </p>
          <br />
          <p>
            Nossos produtos oferecem uma gama de benefícios clínicos e econômicos,
            incluindo a prevenção de infecções, proteção de uma pele em risco,
            melhora de resultados de pacientes e redução de custos totais de tratamento.
            Nossas marcas incluem os modernos curativos AQUACEL®, que formam um gel
            quando em contato com o exsudato da ferida, criando um ambiente úmido
            para cicatrização da ferida.
          </p>
          <br />
          <p>
            A ConvaTec possui mais de 8.000 funcionários, com 11 unidades de fabricação
            em oito países, operando em mais de 100 países.
          </p>
        </>
      ),
      videoTitle: "Vídeo promocional",
      website: "https://www.convatec.pt",
      instagramLink: "https://www.instagram.com/convatecostomiaportugal/?hl=pt",
      linkedinLink: "https://www.linkedin.com/company/convatec/?trk=public_profile_topcard-current-company&originalSubdomain=pt",
      videoHref: "https://www.youtube.com/watch?v=_KY96eNgrZ8",
      facts: [
        {
          iconSrc: Trophy,
          description:
            "Está listada na London Stock Exchange",
        },
        {
          iconSrc: Archive,
          description: "Fundada em 1978",
        },
        {
          iconSrc: Chart,
          description: "Produtos e serviços vendidos em mais de 100 países",
        },
      ],
    }
  },
  {
    logoHref: hitachiLogo,
    name: "hitachi",
    interests: ["Backend", "Cloud Computing", "Data Analysis"],
    modalInformation: {
      title: "Hitachi Solutions",
      bodyText: (
        <>
          <p>
            Hitachi Solutions is a consulting company, Microsoft Solution Partner and system integrator
            specialising in innovative solutions for large organisations in the private and public sector.
            Hitachi Solutions has opportunities for graduates who are based in Portugal and have a keen interest in
            technology, plus a desire to pursue an international career in consulting.
          </p>
          <br />
          <p>
            Our office address is Avenida da Senhora da Hora 357, Matosinhos. Our website is Hitachi Solutions |
            Business Transformation Consultancy (hitachi-solutions.pt) and if you have any queries, please send an
            email to ioliveira@hitachisolutions.com .
          </p>
        </>
      ),
      instagramLink: "https://www.instagram.com/hitachisolutions.portugal/",
      linkedinLink: "https://www.linkedin.com/company/hitachi-solutions-portugal/",
      website: "https://hitachi-solutions.pt/",
      videoTitle: "Vídeo promocional",
      videoHref: "https://www.youtube.com/watch?v=I4RyT-u2aIw",
      facts: [
        {
          iconSrc: Archive,
          description: "Empresa de consultoria global",
        },
        {
          iconSrc: Leaf,
          description: "Cultura diversificada e recompensadora",
        },
        {
          iconSrc: Chart,
          description:
            "Especializados em aplicações empresariais amigáveis baseadas na Microsoft cloud",
        },
      ],
    },
  },
];
