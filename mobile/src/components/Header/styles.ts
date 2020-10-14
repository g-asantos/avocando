import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.Text`
  color: #805500;
  font-size: 35px;

  font-weight: 700;
`;

const HeaderImage = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-top: 10px;
`;

export {Container, HeaderImage, HeaderText};
