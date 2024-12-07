import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from 'react-native-vector-icons';
import PantallaRecetas from '../Screens/PantallaRecetas';
import PantallaCocteles from '../Screens/PantallaCocteles';
import PantallaFavoritos from '../Screens/PantallaFavoritos';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Recetas') {
            iconName = focused ? 'book' : 'book-o'; 
          } else if (route.name === 'Cocteles') {
            iconName = focused ? 'glass' : 'glass';  
          } else if (route.name === 'Favoritos') {
            iconName = focused ? 'heart' : 'heart-o';  
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee', 
        tabBarInactiveTintColor: '#888', 
        tabBarStyle: {
          backgroundColor: '#fff',  
          borderTopWidth: 0, 
          elevation: 5,  
        },
        tabBarLabelStyle: {
          fontSize: 12,  
          fontWeight: 'bold',  
        },
      })}
    >
      <Tab.Screen 
        name="Recetas" 
        component={PantallaRecetas} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Cocteles" 
        component={PantallaCocteles} 
        options={{ headerShown: false }}  
      />
      <Tab.Screen 
        name="Favoritos" 
        component={PantallaFavoritos} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
