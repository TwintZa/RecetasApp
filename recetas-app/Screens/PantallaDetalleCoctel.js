import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';

const PantallaDetalleCoctel = ({ route }) => {
  const { idDrink } = route.params; // Obtenemos el ID del cóctel desde los parámetros
  const [coctel, setCoctel] = useState(null); // Estado para los detalles del cóctel
  const [loading, setLoading] = useState(true);

  // Función para obtener los detalles del cóctel
  const fetchCoctelDetails = async () => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
      const data = await response.json();
      setCoctel(data.drinks[0]); // Guardamos los detalles del cóctel
    } catch (error) {
      console.error('Error al obtener los detalles del cóctel:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoctelDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ee" />;
  }

  if (!coctel) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se encontraron detalles del cóctel.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: coctel.strDrinkThumb }} style={styles.image} />
      <Text style={styles.title}>{coctel.strDrink}</Text>
      <Text style={styles.category}>{coctel.strCategory}</Text>
      <Text style={styles.instructions}>{coctel.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    color: '#333',
  },
  errorText: {
    textAlign: 'center',
    color: '#f00',
  },
});

export default PantallaDetalleCoctel;
