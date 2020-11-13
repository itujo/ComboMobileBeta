/* eslint-disable no-console */
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Route, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../services/api';
import { Item, Text, TextQtd } from './style';

const SearchDocs: React.FC = ({ route }: Route) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const navigation = useNavigation();

  const { token } = route.params;

  const authStr = 'Bearer '.concat(token);
  useEffect(() => {
    api
      .get('/docs', { headers: { Authorization: authStr } })
      .then((response) => {
        setData(response.data.docs);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [route.params]);

  const handleItemClick = (item: Document) => {
    navigation.navigate('UploadInfo', { item, authStr });
  };

  return isLoading ? (
    <Spinner
      visible={isLoading}
      textContent="Carregando documentos..."
      textStyle={{ color: 'white', fontWeight: 'bold' }}
      color="#ff8b0d"
      overlayColor="rgba(0, 0, 0, 0.6)"
      animation="fade"
    />
  ) : (
    <View>
      <TextQtd>{`Total de documentos pendentes: ${data.length}`}</TextQtd>
      <FlatList
        data={data}
        keyExtractor={(item: Document) => item.docNumber}
        renderItem={({ item }) => (
          <Item onPress={() => handleItemClick(item)}>
            <Text>
              <Feather name="user" size={20} color="#ff8b0d" />
              {`\u00A0${item.fullName}`}
            </Text>
            <Text>
              <Feather name="package" size={20} color="#ff8b0d" />
              {`\u00A0${item.docNumber}`}
            </Text>
            <Text>
              <Feather name="navigation" size={20} color="#ff8b0d" />
              {`\u00A0${item.address}`}
            </Text>
            <Text>
              <Feather name="map-pin" size={20} color="#ff8b0d" />
              {`\u00A0${item.cep}`}
            </Text>
            <Text>
              <Feather name="map" size={20} color="#ff8b0d" />
              {`\u00A0${item.city} - ${item.uf}`}
            </Text>
          </Item>
        )}
      />
    </View>
  );
};

export default SearchDocs;
