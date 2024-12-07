import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Componentes
import Header from './Components/Header.js';
import PantallaLogin from './Screens/PantallaLogin.js';
import PantallaRegistro from './Screens/PantallaRegistro.js';
import TabNavigator from './Components/TabNavigator.js';
import PantallaDetalleCoctel from './Screens/PantallaDetalleCoctel.js';
import PantallaDetalleReceta from './Screens/PantallaDetalleReceta.js';
import PantallaLoginAutenticada from './Screens/PantallaLoginAutentificada.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {}
        <StatusBar barStyle="light-content" backgroundColor="#6200ee" />
        <Header />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="HomeAutentificado" component={PantallaLoginAutenticada} />
          <Stack.Screen name="Login" component={PantallaLogin} />
          <Stack.Screen name="Register" component={PantallaRegistro} />
          <Stack.Screen name="DetalleCoctel" component={PantallaDetalleCoctel} />
          <Stack.Screen name="DetalleReceta" component={PantallaDetalleReceta} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
