import React from 'react';
import styled from 'styled-components';
import IconButton from 'components/atoms/IconButton/IconButton';
import removeIcon from 'assets/removeIcon.svg';
import showIcon from 'assets/showIcon.svg';
import createIcon from 'assets/createIcon.svg';

const sample = [
  'base_one',
  'base_two',
  'base_three',
  'base_two',
  'base_three',
  'base_two',
  'base_three',
  'base_two',
  'base_three',
];

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 65% 1fr;
  //justify-content: space-around;
  width: 350px;
  height: 2.5rem;
`;

const StyledOptions = styled.div``;

const StyledSelect = styled.select`
  height: 100%;
  width: 100%;
  background: white;
  border-radius: 3px;
  border: ${({ theme }) => `1px solid ${theme.fourth}`};
`;

const Select = ({ databases }) => {
  return (
    <StyledWrapper>
      <StyledSelect>
        {sample.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </StyledSelect>
      <StyledOptions>
        <IconButton icon={removeIcon} label={'Drop database'} />
        <IconButton icon={showIcon} label={'Show tables'} />
        <IconButton icon={createIcon} label={'Create'} />
      </StyledOptions>
    </StyledWrapper>
  );
};

export default Select;
