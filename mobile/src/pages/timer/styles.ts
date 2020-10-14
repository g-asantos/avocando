import styled from 'styled-components/native';

interface buttonProps {
  theme?: string;
  color?: string;
}

const Container = styled.View`
  max-width: 480px;
  margin: auto;
  display: flex;
  align-items: center;
  align-content: center;
`;

const CounterContainer = styled.Text`
  margin: 50px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 100px;
  padding-top: 10px;
`;

const ButtonContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: 20px;
`;

const ButtonAction = styled.TouchableOpacity<buttonProps>`
  height: 56px;
  width: 100px;
  margin-right: 25px;
  border-radius: 10px;
  background-color: ${(props) => props.theme};
`;
const PomodoroContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const PomodoroButton = styled.TouchableOpacity<buttonProps>`
  height: 30px;
  width: 120px;
  background-color: ${(props) => props.color};
  border: 1px solid grey;
  font-weight: bold;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;

  margin: auto;
`;

const TodoButton = styled.TouchableOpacity`
  display: flex;
  margin-top: 100px;
  background-color: #003399;
  height: 30px;
  width: 120px;
  border: 1px solid grey;
  font-weight: bold;
`;

export {
  Container,
  ButtonAction,
  ButtonContainer,
  PomodoroButton,
  PomodoroContainer,
  CounterContainer,
  ButtonText,
  TodoButton,
};
