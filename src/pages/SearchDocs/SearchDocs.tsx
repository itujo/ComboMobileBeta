/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
// import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';

import { View, Container } from './style';

import api from '../../services/api';

const SearchDocs: React.FC = ({ route }: any) => {
  // const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { token } = route.params;

  const authStr = 'Bearer '.concat(token);

  useEffect(() => {
    api
      .get('/docs', { headers: { Authorization: authStr } })
      .then((response) => {
        setData(response.data.docs);
      })
      // .then((json) => setData(json))
      .then(() => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return isLoading ? (
    <Container>
      <ActivityIndicator size="large" color="#ff8b0d" />
    </Container>
  ) : (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.docNumber}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log(data[0])}>
            <Text>{item.docNumber}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchDocs;
