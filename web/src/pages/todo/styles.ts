import styled from 'styled-components';

interface LiProps {
  done: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  margin-top: 40px;

  p {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.li<LiProps>`
  margin: 10px 0 10px 0;
  text-decoration: ${props => (props.done ? 'line-through' : 'none')};
  button {
    svg {
      transform: rotate(1deg);
    }
  }
`;

export const Button = styled.button`
  border: 0;
  background-color: inherit;

  svg {
    margin-left: 10px;
    width: 20px;
    height: 20px;
    transform: rotate(-135deg);
  }
`;
