import styled from 'styled-components/native';

interface cProps {
  width?: string;
  transparent?: string;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: white; */
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 50px;
  border-radius: 10px;
  border: lightgray;
  padding: 10px;
  margin-top: 20px;
  color: white;
`;

export const Button = styled.TouchableOpacity`
  width: ${(props: cProps) => (props.width ? props.width : '90%')};
  height: 50px;
  background: #ff8b0d;
  justify-content: center;
  align-items: center;
  margin: 20px;
  border-radius: 10px;
  padding: 10px;
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: #ff8b0d;
  border-radius: 10px;
  padding: 10px;
`;

export const ModalText = styled.Text`
  /* margin: 0 20px; */
  margin-bottom: 10px;
`;

export const TextButton = styled.Text`
  color: white;
`;

export const Logo = styled.Image`
  margin: 50px;
`;

// #bdbdbd
// #343a40
