import React, { useEffect, useState } from 'react';
import { Animated, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import petListStyles from '../styles/PetListStyles';

const PET_DETAIL_ROUTE = 'PetDetail';

function PetListScreen({ navigation, pets }) {
  const [petList, setPetList] = useState([]);
  const [titleAnimation] = useState(() => new Animated.Value(0));
  const [listAnimation] = useState(() => new Animated.Value(0));

  useEffect(() => {
    setPetList(pets);
  }, [pets]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(titleAnimation, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true
      }),
      Animated.timing(listAnimation, {
        toValue: 1,
        duration: 340,
        useNativeDriver: true
      })
    ]).start();
  }, [listAnimation, titleAnimation]);

  const titleAnimatedStyle = {
    opacity: titleAnimation,
    transform: [
      {
        translateY: titleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0]
        })
      }
    ]
  };

  const listAnimatedStyle = {
    opacity: listAnimation,
    transform: [
      {
        translateY: listAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 0]
        })
      }
    ]
  };

  const handlePetPress = (selectedPet) => {
    navigation.navigate(PET_DETAIL_ROUTE, { pet: selectedPet });
  };

  const getSpeciesEmoji = (speciesName) => {
    const normalizedSpecies = speciesName?.toLowerCase();

    if (normalizedSpecies === 'perro') {
      return '🐶';
    }

    if (normalizedSpecies === 'gato') {
      return '🐱';
    }

    return '🐾';
  };

  const renderPetItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => handlePetPress(item)}
        style={({ pressed }) => [petListStyles.card, pressed && petListStyles.cardPressed]}
      >
        <View style={petListStyles.petNameRow}>
          <Text style={petListStyles.petEmoji}>{getSpeciesEmoji(item.species)}</Text>
          <Text style={petListStyles.petName}>{item.name}</Text>
        </View>
        <Text style={petListStyles.petInfo}>Especie: {item.species}</Text>
        <Text style={petListStyles.petInfo}>Raza: {item.breed}</Text>
        <Text style={petListStyles.petInfo}>Edad: {item.age} anos</Text>
        <Text style={petListStyles.petInfo}>Peso: {item.weight} kg</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={petListStyles.safeArea}>
      <View style={petListStyles.container}>
        <Animated.View style={titleAnimatedStyle}>
          <Text style={petListStyles.title}>Listado de mascotas</Text>
          <Text style={petListStyles.description}>
            Aqui veras todas tus mascotas registradas.
          </Text>
        </Animated.View>

        <Animated.View style={listAnimatedStyle}>
          <FlatList
            data={petList}
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
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

export default PetListScreen;
