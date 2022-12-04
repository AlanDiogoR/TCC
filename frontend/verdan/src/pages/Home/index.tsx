import { Header } from "../../components/Header/Index";
import { Produtos } from "../../components/Produtos";
import { Banner } from "./Banner";

export function Home() {
  return(
    <>
      <Header/>

      <Banner/>

      <Produtos/>
    </>
    
  )
}