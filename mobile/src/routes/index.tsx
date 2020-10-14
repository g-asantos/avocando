import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Todo from '../pages/todo';
import Timer from '../pages/timer';

const Avocado = createStackNavigator();

const Routes = () => (
  <Avocado.Navigator
    initialRouteName="Timer"
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#99ff99'},
    }}>
    <Avocado.Screen name="Todo" component={Todo} />
    <Avocado.Screen name="Timer" component={Timer} />
  </Avocado.Navigator>
);

export default Routes;
