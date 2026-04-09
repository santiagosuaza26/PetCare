import React, { useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import PetListScreen from './screens/PetListScreen';
import PetDetailScreen from './screens/PetDetailScreen';
import RegisterPetScreen from './screens/RegisterPetScreen';
import TipsScreen from './screens/TipsScreen';
import appStyles from './styles/AppStyles';

const INITIAL_PETS = [
  {
    id: '1',
    name: 'Luna',
    species: 'Perro',
    breed: 'Labrador',
    age: 4,
    weight: 24,
    isFavorite: false
  },
  {
    id: '2',
    name: 'Milo',
    species: 'Gato',
    breed: 'Siames',
    age: 2,
    weight: 5,
    isFavorite: false
  },
  {
    id: '3',
    name: 'Nala',
    species: 'Perro',
    breed: 'Beagle',
    age: 1,
    weight: 10,
    isFavorite: false
  }
];

// Keep route names in one place.
const TAB_ROUTES = {
  PETS: 'PetsTab',
  REGISTER: 'RegisterTab',
  TIPS: 'TipsTab'
};

const STACK_ROUTES = {
  PET_LIST: 'PetList',
  PET_DETAIL: 'PetDetail'
};

const TAB_NAVIGATOR = createBottomTabNavigator();
const STACK_NAVIGATOR = createNativeStackNavigator();

function getTabIcon(routeName) {
  if (routeName === TAB_ROUTES.PETS) {
    return '🐾';
  }

  if (routeName === TAB_ROUTES.REGISTER) {
    return '➕';
  }

  return '💡';
}

function TabIcon({ routeName, color }) {
  return <Text style={[appStyles.tabIcon, { color }]}>{getTabIcon(routeName)}</Text>;
}

function getTabScreenOptions(route) {
  return {
    headerShown: false,
    tabBarActiveTintColor: '#111111',
    tabBarInactiveTintColor: '#6B7280',
    tabBarStyle: appStyles.tabBar,
    tabBarLabelStyle: appStyles.tabLabel,
    tabBarIcon: ({ color }) => {
      return <TabIcon routeName={route.name} color={color} />;
    }
  };
}

function PetsStackNavigator({ pets, onToggleFavorite }) {
  // Use a stack only inside the Pets tab.
  return (
    <STACK_NAVIGATOR.Navigator
      initialRouteName={STACK_ROUTES.PET_LIST}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: appStyles.stackHeader,
        headerTitleStyle: appStyles.stackHeaderTitle,
        headerTintColor: '#111111'
      }}
    >
      <STACK_NAVIGATOR.Screen
        name={STACK_ROUTES.PET_LIST}
        options={{
          title: 'Mascotas'
        }}
      >
        {(screenProps) => <PetListScreen {...screenProps} pets={pets} />}
      </STACK_NAVIGATOR.Screen>
      <STACK_NAVIGATOR.Screen
        name={STACK_ROUTES.PET_DETAIL}
        options={{
          title: 'Detalle de mascota'
        }}
      >
        {(screenProps) => (
          <PetDetailScreen
            {...screenProps}
            pets={pets}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </STACK_NAVIGATOR.Screen>
    </STACK_NAVIGATOR.Navigator>
  );
}

function App() {
  const [pets, setPets] = useState(INITIAL_PETS);

  const addPet = (petData) => {
    // Add the new pet at the top of the list.
    setPets((previousPets) => {
      return [
        {
          ...petData,
          isFavorite: false
        },
        ...previousPets
      ];
    });
  };

  const toggleFavorite = (petId) => {
    // Stop if there is no pet id.
    if (!petId) {
      return;
    }

    setPets((previousPets) => {
      return previousPets.map((pet) => {
        if (pet.id !== petId) {
          return pet;
        }

        return {
          ...pet,
          isFavorite: !pet.isFavorite
        };
      });
    });
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TAB_NAVIGATOR.Navigator
          initialRouteName={TAB_ROUTES.PETS}
          screenOptions={({ route }) => getTabScreenOptions(route)}
        >
          <TAB_NAVIGATOR.Screen
            name={TAB_ROUTES.PETS}
            options={{
              title: 'Mascotas'
            }}
          >
            {() => <PetsStackNavigator pets={pets} onToggleFavorite={toggleFavorite} />}
          </TAB_NAVIGATOR.Screen>
          <TAB_NAVIGATOR.Screen
            name={TAB_ROUTES.REGISTER}
            options={{
              title: 'Registrar'
            }}
          >
            {(screenProps) => <RegisterPetScreen {...screenProps} addPet={addPet} />}
          </TAB_NAVIGATOR.Screen>
          <TAB_NAVIGATOR.Screen
            name={TAB_ROUTES.TIPS}
            component={TipsScreen}
            options={{
              title: 'Consejos'
            }}
          />
        </TAB_NAVIGATOR.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
