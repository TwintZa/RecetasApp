import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import SearchBar from '../Components/SearchBar.js'; // Asegúrate de importar tu componente SearchBar

// Categorías para recetas
const categories = {
  Beef: 'Carne de res',
  Chicken: 'Pollo',
  Dessert: 'Postres',
  Lamb: 'Cordero',
  Miscellaneous: 'Varios',
  Pasta: 'Pasta',
  Pork: 'Cerdo',
  Seafood: 'Mariscos',
  Side: 'Acompañamientos',
  Starter: 'Entrantes',
  Vegan: 'Vegano',
  Vegetarian: 'Vegetariano',
  Breakfast: 'Desayuno',
};

const PantallaRecetas = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Seafood');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json.meals);
        setFilteredData(json.meals);
      })
      .catch((error) => console.error(error));
  }, [selectedCategory]);

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const filtered = data.filter((item) =>
        item.strMeal.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const renderCategoryButtons = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {Object.entries(categories).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.categoryButton,
              selectedCategory === key && styles.selectedButton,
            ]}
            onPress={() => {
              setSelectedCategory(key);
              setSearch('');  // Limpiar búsqueda cuando cambiamos de categoría
            }}
          >
            <Text style={styles.categoryButtonText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetalleReceta', { mealId: item.idMeal })}
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      {/* Usamos el componente SearchBar */}
      <SearchBar
        searchQuery={search}  // Valor actual de la búsqueda
        setSearchQuery={setSearch}  // Función para actualizar el estado
        onSearch={handleSearch}  // Función para manejar la búsqueda
      />
      {renderCategoryButtons()}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderRecipeCard}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  categoryContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#6200ee',
  },
  categoryButtonText: {
    color: '#fff',
  },
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardTitle: {
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default PantallaRecetas;
