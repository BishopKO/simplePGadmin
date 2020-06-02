import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledForm = styled.form`
  margin-top: 10px;
  width: 95%;
  height: 50%;
`;

export const StyledFormInputsWrapper = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledButton = styled.button`
  width: 100%;
  height: 35px;
  margin-top: 10px;
  background: ${({ theme }) => theme.first};
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1.5rem;
`;
