import styled from 'styled-components';

// TODO: REMOVE StyledTitle from components styles!!!

const StyledTitle = styled.p`
  font-size: ${({ fontSize }) => fontSize || '12px'};
  padding: 0;
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  span {
    color: green;
  }
`;
export default StyledTitle;
