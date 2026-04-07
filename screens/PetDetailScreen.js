import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import petDetailStyles from '../styles/PetDetailStyles';

function PetDetailScreen({ route, navigation, pets }) {
  const selectedPet = route?.params?.pet;
  const petId = selectedPet?.id;

  const petData = useMemo(() => {
    if (!petId) {
      return selectedPet;
    }

    const matchedPet = pets.find((pet) => pet.id === petId);
    return matchedPet || selectedPet;
  }, [petId, pets, selectedPet]);

  const [isFavorite, setIsFavorite] = useState(false);
  const [viewCounter, setViewCounter] = useState(0);

  useEffect(() => {
    setViewCounter((previousCounter) => previousCounter + 1);
  }, [petId]);

  useEffect(() => {
    navigation.setOptions({
      title: petData?.name ? `Detalle: ${petData.name}` : 'Detalle de mascota'
    });
  }, [navigation, petData]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleToggleFavorite = () => {
    setIsFavorite((previousValue) => !previousValue);
  };

  const petWeight = typeof petData?.weight === 'number' ? `${petData.weight} kg` : 'No disponible';
  const petAgeLabel = typeof petData?.age === 'number' ? `${petData.age} anos` : 'No disponible';

  return (
    <SafeAreaView style={petDetailStyles.safeArea}>
      <View style={petDetailStyles.container}>
        <Text style={petDetailStyles.title}>Detalle de mascota</Text>
        <Text style={petDetailStyles.description}>
          Consulta la informacion completa de tu mascota registrada.
        </Text>

        <View style={petDetailStyles.card}>
          <Text style={petDetailStyles.petName}>{petData?.name || 'Mascota sin nombre'}</Text>
          <Text style={petDetailStyles.petInfo}>Especie: {petData?.species || 'No disponible'}</Text>
          <Text style={petDetailStyles.petInfo}>Raza: {petData?.breed || 'No disponible'}</Text>
          <Text style={petDetailStyles.petInfo}>Edad: {petAgeLabel}</Text>
          <Text style={petDetailStyles.petInfo}>Peso: {petWeight}</Text>

          <Text style={petDetailStyles.metaInfo}>Visitas a este detalle: {viewCounter}</Text>
          <Text style={petDetailStyles.metaInfo}>
            Estado favorito: {isFavorite ? 'Si' : 'No'}
          </Text>

          <Pressable onPress={handleToggleFavorite} style={petDetailStyles.favoriteButton}>
            <Text style={petDetailStyles.favoriteButtonText}>
              {isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
            </Text>
          </Pressable>

          <Pressable onPress={handleGoBack} style={petDetailStyles.backButton}>
            <Text style={petDetailStyles.backButtonText}>Volver</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PetDetailScreen;
