import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const Login: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigateToOtherPage() {
    navigation.navigate('OtherPage');
  }
  return (
    <View style={styles.container}>
      <Text>Login page</Text>
      <Button title="NextPage" onPress={handleNavigateToOtherPage}>
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
    backgroundColor: 'red',
  },
});

export default Login;
