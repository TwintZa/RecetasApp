import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const PantallaDetalleReceta = ({ route }) => {
  const { mealId } = route.params;
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((json) => setMealDetails(json.meals[0]))
      .catch((error) => console.error(error));
  }, [mealId]);

  if (!mealDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <Image source={{ uri: mealDetails.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{mealDetails.strMeal}</Text>
      <Text style={styles.category}>{mealDetails.strCategory}</Text>
      <Text style={styles.instructions}>{mealDetails.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  category: {
    fontSize: 18,
    color: '#666',
  },
  instructions: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default PantallaDetalleReceta;
