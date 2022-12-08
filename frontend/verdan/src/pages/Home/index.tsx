import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header/Index";
import { Container } from "../../components/Container";
import { Banner } from "./Banner";

export function Home() {
  return(
    <>
      <Header/>

      <Banner/>

      <Container/>  

      <Footer/>
    </>
    
  )
}