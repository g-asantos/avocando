import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiSend, FiTrash2, FiCheck } from 'react-icons/fi';

import { Container, List, Button, Item } from './styles';
import Input from '../../components/Input';

export interface ITodo {
  todo: string;
  done: boolean;
}

const Todo: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    if (localStorage.getItem('@todos')) {
      const savedTodos = JSON.parse(localStorage.getItem('@todos') as string);

      setTodos(savedTodos);
    }
  }, []);

  const handleSubmit = useCallback(
    (data: ITodo) => {
      const newData = {
        ...data,
        done: false,
      };

      setTodos([...todos, newData]);

      localStorage.setItem('@todos', JSON.stringify([...todos, newData]));
      formRef.current?.reset();
    },
    [todos],
  );

  const handleDone = useCallback(
    (data: ITodo) => {
      const newTodo = {
        ...data,
        done: !data.done,
      };

      const savedDate = JSON.parse(localStorage.getItem('@todos') as string);

      const doneArray = savedDate.map((todo: ITodo) =>
        JSON.stringify(todo) === JSON.stringify(data) ? newTodo : todo,
      );

      const todoDone = todos.map(todo => (todo === data ? newTodo : todo));
      setTodos(todoDone);
      localStorage.setItem('@todos', JSON.stringify(doneArray));
    },
    [todos],
  );

  const handleDelete = useCallback(
    (data: ITodo) => {
      const todoDeleted = todos.filter(todo => todo !== data);
      setTodos(todoDeleted);

      const savedDate = JSON.parse(localStorage.getItem('@todos') as string);
      const deletedArray = savedDate.filter(
        (todo: ITodo) => JSON.stringify(todo) !== JSON.stringify(data),
      );
      localStorage.setItem('@todos', JSON.stringify(deletedArray));
    },
    [todos],
  );

  return (
    <Container>
      <p>Time to work!</p>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="todo" type="text" />
        <Button type="submit">
          <FiSend />
        </Button>
      </Form>
      <List>
        {todos.map(todo => (
          <>
            <Item done={todo.done} key={todo.todo}>
              {todo.todo}
              <Button onClick={() => handleDelete(todo)}>
                <FiTrash2 />
              </Button>
              <Button onClick={() => handleDone(todo)}>
                <FiCheck />
              </Button>
            </Item>
          </>
        ))}
      </List>
    </Container>
  );
};

export default Todo;
