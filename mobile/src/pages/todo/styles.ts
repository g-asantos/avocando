import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface LiProps {
  done: boolean;
}

export const Container = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
`;

export const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
`;

export const Item = styled.View`
  margin: 10px 0 10px 0;
`;

export const Button = styled.TouchableOpacity`
  border: 0;
  margin: 0 10px 0 10px;
`;

export const Work = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const Icon = styled(FeatherIcon)`
  color: black;
`;

export const SendButton = styled.TouchableOpacity`
  transform: rotate(-135deg);
`;

export const SendIcon = styled(FeatherIcon)`
  color: black;
`;

export const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text<LiProps>`
  text-decoration: ${(props) => (props.done ? 'line-through' : 'none')};
`;

export const TimerButton = styled.TouchableOpacity`
  display: flex;
  margin-top: 100px;
  background-color: #003399;
  height: 30px;
  width: 120px;
  border: 1px solid grey;
  font-weight: bold;
`;

export const GoBackText = styled.Text`
  color: white;
  font-weight: bold;

  margin: auto;
`;
