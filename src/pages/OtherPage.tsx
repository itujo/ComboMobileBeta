/* eslint-disable react/prop-types */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const OtherPage: React.FC = ({ route }) => {
  const navigation = useNavigation();

  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }
  const { token } = route.params;

  return (
    <View style={styles.container}>
      <Text>{token}</Text>
      <Button title="NextPage" onPress={handleNavigateToLogin}>
        Next Page
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
});

export default OtherPage;
