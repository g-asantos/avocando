import React from 'react';

import { Container } from './styles';
import avocadoIcon from '../../assets/avocado.svg';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }: HeaderProps) => (
  <Container>
    <img src={avocadoIcon} alt="Abocado" />
    {title}
  </Container>
);

export default Header;
