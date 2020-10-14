import React from 'react';

import {Container, HeaderText, HeaderImage} from './styles';
import avocadoIcon from '../../assets/avocado.png';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}: HeaderProps) => {
  return (
    <Container>
      <HeaderImage source={avocadoIcon} />
      <HeaderText>{title}</HeaderText>
    </Container>
  );
};

export default Header;
