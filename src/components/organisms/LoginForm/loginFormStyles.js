import styled from 'styled-components';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import StyledInput from 'components/atoms/StyledInput/StyledInput';

export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 2px solid blue;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
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
  height: 200px;
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

export const StyledBorderWithLabel = styled(BorderWithLabel)`
  font-style: italic;
  margin-bottom: 10px;
  color: gray;
  border: 1px solid black;
`;

export const StyledPortSSLWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledFormInput = styled(StyledInput)`
  font-style: italic;
  font-weight: bold;
  height: 1.8rem;
`;
