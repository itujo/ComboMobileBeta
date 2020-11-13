/* eslint-disable no-console */
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Alert, Route, StyleSheet } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Text,
  TextContainer,
  Input,
  Button,
  TextButton,
} from './style';
import api from '../../services/api';
// import api from '../../services/api';

const UploadInfo: React.FC = ({ route }: Route) => {
  const navigation = useNavigation();

  const [textRec, setTextRec] = useState('');
  const [textDocre, setTextDocre] = useState('');
  const [docStatus, setDocStatus] = useState('');
  const [stateTest, setStateTest] = useState([]);
  const [doc, setDoc] = useState<Document>({});

  // const doc: Doc = route.params.item;
  const reasonObj = [
    {
      label: 'Entregue ao destinatario',
      value: 'entregue',
    },
    {
      label: 'Sinistro ou roubo',
      value: 'roubado',
    },
    {
      label: 'Extraviado',
      value: 'extraviado',
    },
    {
      label: 'Desconhecido',
      value: 'desconhecido',
    },
    {
      value: 'recusado',
      label: 'Recusado',
    },
    {
      value: 'mudouSe',
      label: 'Mudou-se',
    },
    {
      value: 'endInsuficiente',
      label: 'Endereço insuficiente',
    },
    {
      value: 'nroInexistente',
      label: 'Nr. inexistente',
    },
    {
      value: 'cepErrado',
      label: 'Cep errado',
    },
    {
      value: 'falecido',
      label: 'Falecido',
    },
  ];

  useEffect(() => {
    setDoc(route.params.item);
    console.log(doc.reason);

    helper();
  }, [doc.reason]);

  const helper = () => {
    const aux = [
      {
        value: 'ausente',
        label: 'Ausente na 1a tentativa de entrega',
      },
      {
        value: 'ausente2',
        label: 'Ausente na 2a tentativa de entrega',
      },
      {
        value: 'ausente3',
        label: 'Ausente na 3a tentativa de entrega',
      },
    ];
    if (doc.reason !== 4 && doc.reason !== 5) {
      reasonObj.push(aux[0]);
      setStateTest(reasonObj);
    } else if (doc.reason === 4) {
      reasonObj.push(aux[1]);
      setStateTest(reasonObj);
    } else if (doc.reason === 5) {
      reasonObj.push(aux[2]);
      setStateTest(reasonObj);
    }
  };

  const placeholder = {
    label: 'Selecione o status...',
    value: null,
    color: 'gray',
  };

  const dataAtual = moment(Date.now());
  const horaAtual = moment(Date.now()).format('HH:mm:ss');

  const submitBodyEnt = {
    data_entr: dataAtual,
    data_baixa: dataAtual,
    hora_rec: horaAtual,
    hora_baixa: horaAtual,
    recebipor: textRec,
    documento: doc.docNumber,
    docreceb: textDocre,
    status: docStatus,
  };

  const submitBodyPes = {
    data_entr: dataAtual,
    data_baixa: null,
    hora_rec: horaAtual,
    hora_baixa: null,
    recebipor: null,
    documento: doc.docNumber,
    docreceb: null,
    status: docStatus,
  };

  const handleSubmit = async () => {
    const token = route.params.authStr.split(' ')[1];

    if (docStatus === 'entregue') {
      await api
        .patch('/docs', submitBodyEnt, {
          headers: { Authorization: route.params.authStr },
        })
        .then((response) => {
          console.log(response.data);
          Alert.alert('Sucesso!');
          navigation.navigate('SearchDocs', { token });

          // setLoading(false);

          // navigation.navigate('SearchDocs', { token });
        })
        .catch((error) => {
          Alert.alert('deu errado');

          console.log(error.response.data);
        });
    } else {
      await api
        .patch('/docs', submitBodyPes, {
          headers: { Authorization: route.params.authStr },
        })
        .then((response) => {
          console.log(response.data);
          Alert.alert('Sucesso!');

          navigation.navigate('SearchDocs', { token });
        })
        .catch((error) => {
          console.log(error.response.data);
          Alert.alert('deu errado');
        });
    }
  };

  if (!stateTest) return <Text>carregando</Text>;
  if (!doc.reason) {
    return <Text>carregando</Text>;
  }
  return (
    <Container>
      <TextContainer>
        <Text>
          <Feather name="user" size={20} color="#ff8b0d" />
          {`\u00A0${doc.fullName}`}
        </Text>
        <Text>
          <Feather name="package" size={20} color="#ff8b0d" />
          {`\u00A0${doc.docNumber}`}
        </Text>
        <Text>
          <Feather name="navigation" size={20} color="#ff8b0d" />
          {`\u00A0${doc.address}`}
        </Text>
        <Text>
          <Feather name="map-pin" size={20} color="#ff8b0d" />
          {`\u00A0${doc.cep}`}
        </Text>
        <Text>
          <Feather name="map" size={20} color="#ff8b0d" />
          {`\u00A0${doc.city} - ${doc.uf}`}
        </Text>
      </TextContainer>

      <Text>{`Status: ${doc.historico}`}</Text>

      <RNPickerSelect
        onValueChange={(value) => {
          setDocStatus(value);
        }}
        items={stateTest}
        style={pickerSelectStyles}
        // eslint-disable-next-line react/jsx-curly-brace-presence
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false}
      />

      <Text>Recebido por: </Text>
      <Input
        placeholder="Recebido por:"
        placeholderTextColor="gray"
        onChangeText={(text) => setTextRec(text)}
      />

      <Text>Documento do recebedor: </Text>
      <Input
        placeholder="Documento do recebedor:"
        placeholderTextColor="gray"
        onChangeText={(text) => setTextDocre(text)}
      />

      <Button onPress={handleSubmit}>
        <TextButton>ENTRAR</TextButton>
      </Button>
    </Container>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    minWidth: '90%',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginTop: 20,
    color: '#343a40',
    backgroundColor: 'white',
  },
});

export default UploadInfo;
