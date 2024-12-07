// SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons'; 

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSearch = (query) => {
    setSearchQuery(query);  
    onSearch(query); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* Ícono de lupa dentro de la barra de búsqueda */}
        <FontAwesome name="search" size={20} color="#6200ee" style={styles.icon} />
        
        {/* TextInput para manejar la búsqueda */}
        <TextInput
          style={styles.input}
          placeholder="Buscar recetas..."
          placeholderTextColor="#999"
          value={searchQuery}  // Usamos el valor del estado
          onChangeText={handleSearch}  // Llamamos a la función de búsqueda al cambiar el texto
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 15,  // Añadimos un poco de espacio arriba y abajo
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,  // Bordes redondeados
    paddingHorizontal: 15,
    paddingVertical: 12,  // Mayor espacio dentro de la barra
    elevation: 5,  // Sombra para el efecto de profundidad
    shadowColor: '#000',  // Color de la sombra
    shadowOffset: { width: 0, height: 4 },  // Dirección de la sombra
    shadowOpacity: 0.1,  // Opacidad de la sombra
    shadowRadius: 5,  // Difusión de la sombra
  },
  icon: {
    marginRight: 12,  // Espacio entre el ícono y el texto
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',  // Color de texto oscuro
    height: 40,  // Altura fija para la entrada de texto
    paddingVertical: 0,  // Eliminar el padding vertical extra
  },
});

export default SearchBar;
