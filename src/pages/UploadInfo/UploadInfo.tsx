import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Route } from 'react-native';
import { Container, Text, TextContainer } from './style';

const UploadInfo: React.FC = ({ route }: Route) => {
  const doc: Document = route.params.item;

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
    </Container>
  );
};

export default UploadInfo;
