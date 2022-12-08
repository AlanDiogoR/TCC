import { Categorias } from "../../components/Categorias";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header/Index";
import { Banner } from "./Banner";

export function Home() {
  return(
    <>
      <Header/>

      <Categorias/>

      <Banner/> 

      <Footer/>
    </>
    
  )
}