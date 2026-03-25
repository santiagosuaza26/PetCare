import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import petDetailStyles from '../styles/PetDetailStyles';

function PetDetailScreen({ route, navigation }) {
  const selectedPet = route?.params?.pet;
  const selectedPetName = selectedPet?.name;
  const petAge = selectedPet?.age;
  const petData = {
    name: selectedPet?.name || 'Mascota sin nombre',
    species: selectedPet?.species || 'No especificado',
    breed: selectedPet?.breed || 'No especificado',
    ageLabel: typeof petAge === 'number' ? `${petAge} anos` : 'No especificado'
  };

  useEffect(() => {
    navigation.setOptions({
      title: selectedPetName ? `Detalle: ${selectedPetName}` : 'Detalle de mascota'
    });
  }, [navigation, selectedPetName]);

  return (
    <SafeAreaView style={petDetailStyles.safeArea}>
      <View style={petDetailStyles.container}>
        <Text style={petDetailStyles.title}>Detalle de mascota</Text>
        <Text style={petDetailStyles.description}>
          Informacion enviada desde la lista de mascotas.
        </Text>

        <View style={petDetailStyles.card}>
          <Text style={petDetailStyles.petName}>{petData.name}</Text>
          <Text style={petDetailStyles.petInfo}>Especie: {petData.species}</Text>
          <Text style={petDetailStyles.petInfo}>Raza: {petData.breed}</Text>
          <Text style={petDetailStyles.petInfo}>Edad: {petData.ageLabel}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PetDetailScreen;
