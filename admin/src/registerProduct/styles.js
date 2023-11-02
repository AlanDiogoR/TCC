import styled from 'styled-components';

export const ContainerAccount = styled.div`
  background-color: #e1e1e1;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: #121214;
  flex-direction: column;
  height: 650px;
  margin: auto;
`;

export const ContainerForm = styled.form`
  width: 35%;
  height: 90%;
  margin: auto;
  justify-content: center;
  align-items: center;
  border: 2px solid #868686;
  border-radius: 4px;
  padding: 16px;

  h1 {
    font-family: $poppins;
  }

  label {
    font-family: $roboto;
  }
`;

export const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Input = styled.input`
  padding: 3px 6px 3px 26px;
  margin-top: 4px;
  height: 34px;
  width: 335px;
  border: 2px solid #868686;
  border-radius: 4px;
  outline: 0;
  transition: all 0.1s ease-out;

  &:hover {
    border: 2px solid #a8ce46;
  }

  &:focus {
    border: 2px solid #a8ce46;
  }

  &::placeholder {
    font-size: 16px;
  }
`;

export const ButtonCreate = styled.button`
  width: 370px;
  background-color: #a8ce46;
  height: 35px;
  font-family: Poppins, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #473404;
  outline: 0;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 16px;
  margin-bottom: 16px;

  &:hover {
    opacity: 0.8;
    border: 2px solid #868686;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(255, 198, 50, 0.5);
  }
`;
