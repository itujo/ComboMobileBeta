import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { Document } from '../../@types';
import api from '../../services/api';
import { Item, Container, Text } from './style';

// const Item = ({ item, onPress, style }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
//     <Text style={styles.title}>{item.docNumber}</Text>
//   </TouchableOpacity>
// );

const SearchDocs: React.FC = ({ route }: any) => {
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
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleItemClick = (item: Document) => {
    console.log(item);
  };

  return isLoading ? (
    <Container>
      <ActivityIndicator size="large" color="#ff8b0d" />
    </Container>
  ) : (
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
  );
};

export default SearchDocs;
