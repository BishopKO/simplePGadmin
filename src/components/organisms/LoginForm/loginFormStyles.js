import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledFormInputsWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledForm = styled.form`
  margin-top: 10px;
  width: 95%;
  height: 80%;
`;

export const StyledButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  background: ${({ theme }) => theme.first};
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1.2rem;
`;
