import React, { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePetContext } from '../context/PetContext';
import petListStyles from '../styles/PetListStyles';

const PET_DETAIL_ROUTE = 'PetDetail';

function PetListScreen({ navigation }) {
  const { pets, setPets } = usePetContext();

  useEffect(() => {
    const mockPets = [
      {
        id: '1',
        name: 'Luna',
        species: 'Perro',
        breed: 'Labrador',
        age: 4
      },
      {
        id: '2',
        name: 'Milo',
        species: 'Gato',
        breed: 'Siames',
        age: 2
      },
      {
        id: '3',
        name: 'Nala',
        species: 'Perro',
        breed: 'Beagle',
        age: 1
      }
    ];

    setPets((previousPets) => {
      if (previousPets.length > 0) {
        return previousPets;
      }

      return mockPets;
    });
  }, []);

  const handlePetPress = (selectedPet) => {
    navigation.navigate(PET_DETAIL_ROUTE, { pet: selectedPet });
  };

  const renderPetItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handlePetPress(item)}
        style={petListStyles.card}
      >
        <Text style={petListStyles.petName}>{item.name}</Text>
        <Text style={petListStyles.petInfo}>Especie: {item.species}</Text>
        <Text style={petListStyles.petInfo}>Raza: {item.breed}</Text>
        <Text style={petListStyles.petInfo}>Edad: {item.age} anos</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={petListStyles.safeArea}>
      <View style={petListStyles.container}>
        <Text style={petListStyles.title}>Listado de mascotas</Text>
        <Text style={petListStyles.description}>
          Aqui veras todas tus mascotas registradas.
        </Text>
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          renderItem={renderPetItem}
          contentContainerStyle={petListStyles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={petListStyles.emptyText}>
              Aun no hay mascotas registradas.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default PetListScreen;
