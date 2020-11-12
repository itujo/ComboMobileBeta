import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Route, Text } from 'react-native';
import api from '../../services/api';

import { Button, Container, Input, TextButton } from './style';

import logo from '../../../assets/logo.png';

const Login: React.FC = ({ route }: Route) => {
  const [textUser, setTextUser] = useState('');
  const [textPass, setTextPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!textUser || !textUser) {
      alert('Não deixe nenhum campo vazio');
    } else {
      setIsLoading(true);
      await api
        .post('/singin', {
          user: textUser,
          password: textPass,
        })
        .then((response) => {
          const { token } = response.data;

          navigation.navigate('SearchDocs', { token });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert('Usuário ou senha inválido(a), tente novamente!');
          } else {
            console.log('Error', error.message);
          }
        });
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [route.params]);

  return !isLoading || !route.params ? (
    <Container>
      <Image source={logo} />
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
  ) : (
    <Container>
      <Text>Aguarde...</Text>
      <ActivityIndicator size="large" color="#ff8b0d" />
    </Container>
  );
};

export default Login;
