import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { StackHeaderProps } from '@react-navigation/stack';

interface HeaderProps extends StackHeaderProps {
  // eslint-disable-next-line react/require-default-props
  showCancel?: boolean;
  title: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Header = ({ showCancel = true, title, navigation }: HeaderProps) => {
  function handleCancel() {
    navigation.navigate('SearchDocs');
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#ff8b0d" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleCancel}>
          <Feather name="x" size={24} color="red" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#343a40',
    borderBottomWidth: 1,
    borderColor: '#343a40',
    paddingTop: 44,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: 'lightgray',
    fontSize: 16,
  },
});

export default Header;
