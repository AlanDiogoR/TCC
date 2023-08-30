import { Footer } from '@/components/Footer';
import { ContainerAbout, ContainerWhoIs } from './styles';

export default function WhoWeAre(){
  return (
    <ContainerWhoIs>
      <ContainerAbout>
        <h1>
          Sobre Nós
        </h1>
        <div>
          Bem-vindo á Verdan Shopping, o seu refúgio urbano de compras, entretenimento e experiências inesquecíveis. Desde a nossa inauguração, nos dedicamos a proporcionar a todos os nossos visitantes uma atmosfera única e vibrante, onde diversão e conveniência se unem para criar momentos memoráveis. Estamos presentes em Itararé, Fartura, Itapeva e Itaporanga, venha nos fazer uma visita.
        </div>
      </ContainerAbout>

      <div>
        <h1>
            Nossa História:
        </h1>
        <p>
            Fundada há 25 anos por Daniel, um visionário nascido em Itaporanga, a Verdan Shopping nasceu da paixão por oferecer uma experiência
            de compra única e abrangente. Diante da intensa competição na indústria de roupas, Daniel e sua esposa Vera optaram por inovar,
            criando uma loja de variedades que logo se transformou em um verdadeiro oásis de produtos essenciais e surpresas incríveis.
            Nossa jornada começou modestamente, com Daniel trazendo sua inspiração das feiras de São Paulo para abastecer nossa primeira
            seleção de produtos. Inicialmente estabelecidos em um modesto barracão, à medida que nossa clientela crescia, nossa ambição também
            aumentava. Expandimos nosso espaço de vendas e investimos em espaços de armazenamento adicionais para garantir que sempre tenhamos
            em estoque exatamente o que nossos clientes precisam.

            Hoje, a Verdan Shopping é muito mais do que um simples ponto de venda. Com lojas não apenas em Itaporanga, mas também em Itararé,
            Itapeva e a mais recente adição em Fartura. Nossa seleção de produtos abrange desde itens essenciais para o dia a dia até descobertas
            emocionantes que você não sabia que estava procurando.
        </p>

      </div>

      <Footer/>
    </ContainerWhoIs>
  );
}
