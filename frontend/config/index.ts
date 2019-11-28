import { createGlobalStyle } from 'styled-components'
import { fonts } from './fonts';
import { global } from './global';

export const GlobalStyle = createGlobalStyle`
  ${global};
  ${fonts};
`;
