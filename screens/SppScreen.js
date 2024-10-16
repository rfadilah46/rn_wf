// screens/SppScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SppScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SPP Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default SppScreen;
