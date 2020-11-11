import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const OtherPage: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }
  return (
    <View style={styles.container}>
      <Text>Page 2</Text>
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
