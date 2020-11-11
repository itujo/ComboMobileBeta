/* eslint-disable global-require */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import api from '../../services/api';

import { Button, Container, Input, Logo, TextButton } from './style';

const Login: React.FC = () => {
  const [textUser, setTextUser] = useState('');
  const [textPass, setTextPass] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!textUser || !textUser) {
      alert('Não deixe nenhum campo vazio');
    } else {
      await api
        .post('/singin', {
          user: textUser,
          password: textPass,
        })
        .then((response) => {
          const { token } = response.data;

          navigation.navigate('OtherPage', { token });
        })
        .catch((error) => {
          return error;
        });
    }
  };

  return (
    <Container>
      <Logo source={require('../../../assets/logo.png')} />
      <Input
        placeholder="Usuário"
        autoCompleteType="username"
        autoCapitalize="characters"
        textContentType="username"
        onChangeText={(text) => setTextUser(text)}
      />
      <Input
        placeholder="Senha"
        autoCompleteType="password"
        secureTextEntry
        textContentType="password"
        onChangeText={(text) => setTextPass(text)}
      />

      <Button onPress={handleLogin}>
        <TextButton>ENTRAR</TextButton>
      </Button>
    </Container>
  );
};

export default Login;
