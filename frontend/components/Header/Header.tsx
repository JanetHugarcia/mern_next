import React from 'react';
import { AccountCircle } from 'styled-icons/material';
import { Wrapper } from './styled';

export const Header: React.FC = () => (
  <Wrapper>
    <p>Header</p>
    <AccountCircle size='24' />
  </Wrapper>
)