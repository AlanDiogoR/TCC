import boneca from '../../assets/images/b1.jpg';

export function Produtos() {
  return (
    <div>
      
      <div>
        <img src={boneca} alt="Protuto" />
      </div>

      <div className="informacaoProduto">
        <label>Boneca</label>
      </div>

      <div className="precoProduto">
        <a href="#jjj">R$70.80</a>
      </div>
    </div>
  );
}