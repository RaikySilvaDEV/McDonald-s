import Image from "next/image";

const AboutUsPage = () => {
  return (
    <div className="container mx-auto p-5 py-10">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold">Sobre o McDonald's</h1>
        <p className="text-lg text-muted-foreground">
          Nossa missão é trazer a alegria da comida rápida para você, com
          qualidade e conveniência.
        </p>
      </div>

      <div className="mt-10">
        <Image
          src="/images/about-us-banner.jpg" // Você precisará adicionar uma imagem neste caminho
          alt="Nossa equipe feliz"
          width={1200}
          height={400}
          className="w-full rounded-lg object-cover"
        />
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Nossa História</h2>
        <p className="text-muted-foreground">
          Fundado em 2024, o Clone Donalds nasceu da paixão por hambúrgueres
          deliciosos e um serviço excepcional. Começamos como uma pequena
          lanchonete e, graças ao apoio de nossos clientes, crescemos para nos
          tornar um nome conhecido na comunidade. Nosso compromisso é usar
          ingredientes frescos e preparar cada pedido com o máximo de cuidado.
        </p>
        <p className="text-muted-foreground">
          Agradecemos por fazer parte da nossa jornada!
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
