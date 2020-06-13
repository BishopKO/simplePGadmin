import styled from 'styled-components';


// TABLE - NAME/MENU
export const StyledTitle = styled.p`
  font-size: 12px;
  padding: 0;
  margin-top: 0;
  margin-bottom: 20px;
  z-index: inherit;
  span {
    color: green;
  }
`;

export const StyledButtonsWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
  overflow: hidden;
`;
