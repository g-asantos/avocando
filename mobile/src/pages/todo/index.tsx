import React, {useState, useCallback, useRef, useEffect} from 'react';
import {Form} from '@unform/mobile';
import {FlatList} from 'react-native-gesture-handler';
import {FormHandles} from '@unform/core';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Button,
  Item,
  Work,
  Icon,
  InputContainer,
  SendIcon,
  ButtonContainer,
  SendButton,
  ButtonText,
  TimerButton,
  GoBackText,
} from './styles';
import Input from '../../components/Input';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export interface ITodo {
  todo: string;
  done: boolean;
}

const Todo: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigation();
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      if (await AsyncStorage.getItem('@todos')) {
        const savedTodos = JSON.parse(
          (await AsyncStorage.getItem('@todos')) as string,
        );

        setTodos(savedTodos);
      }
    }

    loadStoragedData();
  }, []);

  const handleSubmit = useCallback(
    async (data: ITodo) => {
      if (!data.todo) {
        return;
      }

      const newData = {
        ...data,
        done: false,
      };

      setTodos([...todos, newData]);

      await AsyncStorage.setItem('@todos', JSON.stringify([...todos, newData]));
      formRef.current?.reset();
    },
    [todos],
  );

  const handleDone = useCallback(
    async (data: ITodo) => {
      const newTodo = {
        ...data,
        done: !data.done,
      };

      const savedDate = JSON.parse(
        (await AsyncStorage.getItem('@todos')) as string,
      );

      const doneArray = savedDate.map((todo: ITodo) =>
        JSON.stringify(todo) === JSON.stringify(data) ? newTodo : todo,
      );

      const todoDone = todos.map((todo) => (todo === data ? newTodo : todo));
      setTodos(todoDone);
      await AsyncStorage.setItem('@todos', JSON.stringify(doneArray));
    },
    [todos],
  );

  const handleDelete = useCallback(
    async (data: ITodo) => {
      const todoDeleted = todos.filter((todo) => todo !== data);
      setTodos(todoDeleted);

      const savedDate = JSON.parse(
        (await AsyncStorage.getItem('@todos')) as string,
      );
      const deletedArray = savedDate.filter(
        (todo: ITodo) => JSON.stringify(todo) !== JSON.stringify(data),
      );
      await AsyncStorage.setItem('@todos', JSON.stringify(deletedArray));
    },
    [todos],
  );

  //fix list
  return (
    <Container>
      <Work>Time to work!</Work>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputContainer>
          <Input name="todo" icon="send" />
          <SendButton
            onPress={() => {
              formRef.current.submitForm();
            }}>
            <SendIcon name="send" size={24} color="#999591" />
          </SendButton>
        </InputContainer>
      </Form>
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          renderItem={({item}: {item: ITodo}) => (
            <Item key={item.todo}>
              <ButtonContainer>
                <ButtonText done={item.done}>{item.todo}</ButtonText>
                <Button onPress={() => handleDelete(item)}>
                  <Icon name="trash-2" size={24} color="#999591" />
                </Button>
                <Button onPress={() => handleDone(item)}>
                  <Icon name="check" size={24} color="#999591" />
                </Button>
              </ButtonContainer>
            </Item>
          )}
          keyExtractor={(item) => item.todo}
        />
      ) : (
        <Text />
      )}

      <TimerButton onPress={() => navigate.goBack()}>
        <GoBackText>Todo Page</GoBackText>
      </TimerButton>
    </Container>
  );
};

export default Todo;
