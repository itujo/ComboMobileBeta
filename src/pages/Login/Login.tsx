import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Modal } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../services/api';

import {
  Button,
  Container,
  Input,
  ModalButton,
  ModalView,
  TextButton,
  ModalText,
} from './style';

import Logo from '../../../assets/logo.png';

const Login: React.FC = () => {
  const [textUser, setTextUser] = useState('');
  const [textPass, setTextPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!textUser || !textUser) {
      setModalText('Não deixe nenhum campo vazio!');
      setModalVisible(true);
    } else if (!textUser) {
      setModalText('Preencha o campo usuário');
      setModalVisible(true);
    } else if (!textPass) {
      setModalText('Preencha o campo senha');
      setModalVisible(true);
    } else {
      setLoading(true);
      await api
        .post('/singin', {
          user: textUser,
          password: textPass,
        })
        .then((response) => {
          const { token } = response.data;
          setLoading(false);

          navigation.navigate('SearchDocs', { token });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setModalVisible(true);
          }
          setModalText('Usuário ou senha incorreto(a), tente novamente!');
          setModalVisible(true);
        });
    }
  };

  return (
    <Container>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setLoading(false);
        }}
      >
        <Container>
          <ModalView>
            <ModalText>{modalText}</ModalText>

            <ModalButton
              onPress={() => {
                setModalVisible(!modalVisible);
                setLoading(false);
              }}
            >
              <TextButton>Fechar</TextButton>
            </ModalButton>
          </ModalView>
        </Container>
      </Modal>

      <Spinner
        visible={loading}
        textContent="Autenticando, aguarde..."
        textStyle={{ color: '#fff' }}
        color="#ff8b0d"
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.6)"
      />
      <Image source={Logo} />
      <Input
        placeholder="Usuário"
        placeholderTextColor="gray"
        autoCompleteType="username"
        autoCapitalize="characters"
        textContentType="username"
        onChangeText={(text) => setTextUser(text)}
      />
      <Input
        placeholder="Senha"
        placeholderTextColor="gray"
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
