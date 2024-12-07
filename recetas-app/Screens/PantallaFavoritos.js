import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PantallaFavoritos = () => {
  return (
    <View style={styles.screen}>
      <Text>Pantalla 2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PantallaFavoritos;
