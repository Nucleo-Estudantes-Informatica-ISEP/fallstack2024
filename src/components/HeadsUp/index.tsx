import Link from "next/link";

const HeadsUp: React.FC = () => {
  return (
    <section className="my-12">
      <h1 className="text-center text-xl font-bold sm:text-2xl md:text-3xl">
        Precisas de <span className="text-primary">ajuda</span>? Contacta-nos!
      </h1>

      <p className="my-2 text-center font-light text-lg">
        Envia-nos um email para{" "}
        <Link href="mailto:support@nei-isep.org" className="text-primary font-bold">
          support@nei-isep.org
        </Link>
      </p>
    </section>
  );
};

export default HeadsUp;
