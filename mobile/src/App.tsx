import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar} from 'react-native';
import Header from './components/Header';
import Container from './styles';
import Routes from './routes';
import {NavigationContainer} from '@react-navigation/native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <NavigationContainer>
      <Container>
        <StatusBar barStyle="dark-content" />
        <Header title="Avo-can do!" />
        <Routes />
      </Container>
    </NavigationContainer>
  );
};

export default App;
