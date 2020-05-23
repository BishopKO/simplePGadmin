import styled from "styled-components";

export const StyledWrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

export const StyledForm = styled.form`
  width: 100%;
  padding: 10px;
  overflow: hidden;
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
