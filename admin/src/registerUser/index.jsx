import React, { useState } from 'react';
import { ButtonCreate, ContainerAccount, ContainerForm, ContainerInputs, Input } from './styles';
import { api } from '../utils/api';


export function RegisterUser() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
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
        password: formData.password,
        email: formData.email
        
      };
  
      // Faça uma solicitação POST para a API
      const response = await api.post('/users', productData);
  
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
              name="password"
              placeholder='Descreva o produto'
              type='password'
              value={formData.password}
              onChange={handleChange}
            />
          </ContainerInputs>

          <ContainerInputs>
            <label>Imagem:</label>
            <Input
              name="email"
              placeholder='Imagem do produto para vizualização do cliente'
              type='email'
              value={formData.email}
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