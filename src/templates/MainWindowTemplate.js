import React, { useState } from 'react';
import styled from 'styled-components';
import OptionsList from 'components/organisms/OptionsList/OptionsList';
import CreateDatabase from 'components/molecules/CreateDatabase/CreateDatabase';
import DatabaseDrop from 'components/molecules/DatabaseDrop/DatabaseDrop';

const dbsList = Array(30)
  .fill('Database')
  .map((item, index) => `${item}_${index}`);

const optionsDbs = [
  { value: 'dbCreate', name: 'Create database' },
  { value: 'dbGrants', name: 'Set grants' },
  { value: 'dbDrop', name: 'Drop database' },
];

const tablesList = Array(30)
  .fill('Table')
  .map((item, index) => `${item}_${index}`);

const optionsTbl = [
  { value: 'tblInsert', name: 'Insert' },
  { value: 'tblUpdate', name: 'Update' },
  { value: 'tblShowSearch', name: 'Search' },
];

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 20px;
  padding: 5px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 2px;
  justify-items: center;
`;

const MainWindowTemplate = () => {
  const [option] = useState('drop');
  return (
    <StyledWrapper>
      <OptionsList title="Databases:" options={optionsDbs} list={dbsList} />
      <OptionsList title="Tables:" options={optionsTbl} list={tablesList} />
      {option === 'create' && <CreateDatabase />}
      {option === 'drop' && <DatabaseDrop />}
    </StyledWrapper>
  );
};

export default MainWindowTemplate;
