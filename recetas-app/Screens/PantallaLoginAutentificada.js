import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PantallaLoginAutenticada = ({ route }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  // Recibe el usuario desde la pantalla anterior a través de la navegación
  useEffect(() => {
    if (route.params?.user) {
      setUser(route.params.user);  // Si hay un usuario autenticado, lo establecemos en el estado
    }
  }, [route.params?.user]);

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que quieres cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sí', onPress: () => navigation.navigate('Login') },  // Redirige a la pantalla de login
    ]);
  };

  return (
    <View style={styles.screen}>
      {user ? (
        <>
          <Text style={styles.welcomeText}>Bienvenido, {user.nombre}!</Text>
          <Text style={styles.emailText}>Email: {user.email}</Text>
          
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.message}>Cargando información del usuario...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    color: '#888',
  },
});

export default PantallaLoginAutenticada;
