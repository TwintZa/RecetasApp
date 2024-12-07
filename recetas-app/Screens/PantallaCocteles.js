import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import SearchBar from '../Components/SearchBar.js'; // Asegúrate de que importas el componente SearchBar

const categories = {
  Alcoholic: 'Con Alcohol',
  Non_Alcoholic: 'Sin Alcohol',
};

const PantallaCocteles = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Alcoholic');
  const [search, setSearch] = useState(''); // Estado para la búsqueda

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${selectedCategory}`)
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json.drinks)) {
          setData(json.drinks);
          setFilteredData(json.drinks);
        } else {
          console.error('La respuesta de la API no contiene un array de drinks:', json);
        }
      })
      .catch((error) => console.error(error));
  }, [selectedCategory]);

  const handleSearch = (query) => {
    setSearch(query); // Actualiza el estado de la búsqueda
    const filtered = data.filter((item) =>
      item.strDrink.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const renderCategoryButtons = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
        {Object.entries(categories).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={[styles.categoryButton, selectedCategory === key && styles.selectedButton]}
            onPress={() => {
              setSelectedCategory(key);
              setSearch(''); // Limpiar búsqueda al cambiar categoría
            }}
          >
            <Text style={styles.categoryButtonText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderCocktailCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetalleCoctel', { drinkId: item.idDrink })}
    >
      <Image source={{ uri: item.strDrinkThumb }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.strDrink}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      {/* Aquí pasas search y setSearch al componente SearchBar */}
      <SearchBar searchQuery={search} setSearchQuery={setSearch} onSearch={handleSearch} />
      {renderCategoryButtons()}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.idDrink}
        renderItem={renderCocktailCard}
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

export default PantallaCocteles;
