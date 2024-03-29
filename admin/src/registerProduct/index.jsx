import React, { useState } from 'react';
import { ButtonCreate, ContainerAccount, ContainerForm, ContainerInputs, Input } from './styles';
import { api } from '../utils/api';


export function RegisterProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    price: '',
    category: '',
    quantity: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        details: formData.description,
        imagePath: formData.image,
        price: formData.price,
        category: formData.category,
        quantity: formData.quantity,
        
      };
  
      // Faça uma solicitação POST para a API
      const response = await api.post('/products', productData);
  
      // Verifique se a solicitação foi bem-sucedida
      if (response.status === 201) {
        alert('Produto criado com sucesso:', response.data);
        // Realize qualquer ação de sucesso aqui, como redirecionar o usuário ou exibir uma mensagem de sucesso.
      } else {
        console.error('Erro ao criar o produto:', response.data);
        // Realize alguma ação de tratamento de erro aqui, como exibir uma mensagem de erro ao usuário.
      }
    } catch (error) {
      console.error('Erro ao criar o produto:', error);
      // Trate os erros que podem ocorrer na solicitação, como problemas de rede.
    }
  }

  return (
    <ContainerAccount>

        <ContainerForm>
          <h1>Registrar produto</h1>

          <ContainerInputs>
            <label>Nome:</label>
            <Input
              name="name"
              placeholder="Nome do produto"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>Descrição:</label>
            <Input
              name="description"
              placeholder='Descreva o produto'
              type='text'
              value={formData.description}
              onChange={handleChange}
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>Imagem:</label>
            <Input
              name="image"
              placeholder='Imagem do produto para vizualização do cliente'
              type='file'
              multiple
              onChange={handleChange}
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>Preço:</label>
            <Input
              name="price"
              placeholder='Informe o preço unitário'
              type='number'
              value={formData.price}
              onChange={handleChange}
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>Categoria:</label>
            <Input
              name="category"
              placeholder='Informe a categoria em que o produto se classifica'
              type='text'
              value={formData.category}
              onChange={handleChange}
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>Quantidade:</label>
            <Input
              name="quantity"
              placeholder='Informe a quantidade do produto a ser inserido'
              type='number'
              value={formData.quantity}
              onChange={handleChange}
            />
          </ContainerInputs>

          <ButtonCreate type='submit' onClick={handleSubmit}>
            Criar produto
          </ButtonCreate>

        </ContainerForm>

      </ContainerAccount>
  )
}

//65405d49acc0e79d0ea65a11