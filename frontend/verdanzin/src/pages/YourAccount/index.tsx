import NavBar from "@/components/NavBar/NavBar";
import { AccountConatiner, NavAccount } from "./style";
import { Footer } from "@/components/Footer";

export default function YourAccount() {
  return (
    <>
      <NavBar/>

      <AccountConatiner>
        <h1>Sua conta</h1>

        <NavAccount>

          <div>
            <h2>Seus pedidos</h2>
            <label>Ver pedidos, devolver ou comprar produtos novamente</label>
          </div>

          <div>
            <h2>Segurança</h2>
            <label>Gerenciar senha e e-mail</label>
          </div>

          <div>
            <h2>Endereços</h2>
            <label>Alterar endereços para pedidos</label>
          </div>

        </NavAccount>

      </AccountConatiner>
    </>
  );
}
