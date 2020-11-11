import styled from 'styled-components/native';

interface cProps {
  width?: string;
  transparent?: string;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 50px;
  border-radius: 10px;
  border: lightgray;
  padding: 10px;
  margin-top: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: ${(props: cProps) => (props.width ? props.width : '90%')};
  height: 50px;
  background: ${(props: cProps) =>
    props.transparent ? 'transparent' : '#ff8b0d'};
  justify-content: center;
  align-items: center;
  margin: 20px;
  border-radius: 10px;
`;

export const TextButton = styled.Text`
  color: white;
`;

export const Logo = styled.Image`
  margin: 50px;
`;
