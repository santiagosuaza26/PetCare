import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PetProvider } from './context/PetContext';
import PetListScreen from './screens/PetListScreen';
import PetDetailScreen from './screens/PetDetailScreen';
import RegisterPetScreen from './screens/RegisterPetScreen';
import TipsScreen from './screens/TipsScreen';
import appStyles from './styles/AppStyles';

const TAB_ROUTES = {
  PETS: 'PetsTab',
  REGISTER: 'RegisterTab',
  TIPS: 'TipsTab'
};

const STACK_ROUTES = {
  PET_LIST: 'PetList',
  PET_DETAIL: 'PetDetail'
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
    tabBarIcon: ({ color }) => {
      return <TabIcon routeName={route.name} color={color} />;
    }
  };
}

function PetsStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={STACK_ROUTES.PET_LIST}
      screenOptions={{
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen
        name={STACK_ROUTES.PET_LIST}
        component={PetListScreen}
        options={{
          title: 'Mascotas'
        }}
      />
      <Stack.Screen
        name={STACK_ROUTES.PET_DETAIL}
        component={PetDetailScreen}
        options={{
          title: 'Detalle de mascota'
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <PetProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={TAB_ROUTES.PETS}
            screenOptions={({ route }) => getTabScreenOptions(route)}
          >
            <Tab.Screen
              name={TAB_ROUTES.PETS}
              component={PetsStackNavigator}
              options={{
                title: 'Mascotas'
              }}
            />
            <Tab.Screen
              name={TAB_ROUTES.REGISTER}
              component={RegisterPetScreen}
              options={{
                title: 'Registrar'
              }}
            />
            <Tab.Screen
              name={TAB_ROUTES.TIPS}
              component={TipsScreen}
              options={{
                title: 'Consejos'
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PetProvider>
  );
}

export default App;
