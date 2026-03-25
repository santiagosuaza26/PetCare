import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePetContext } from '../context/PetContext';
import petListStyles from '../styles/PetListStyles';

const PET_DETAIL_ROUTE = 'PetDetail';

function PetListScreen({ navigation }) {
  const { pets, setPets } = usePetContext();
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const listAnimation = useRef(new Animated.Value(0)).current;

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
  }, [setPets]);

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

  const renderPetItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => handlePetPress(item)}
        style={({ pressed }) => [petListStyles.card, pressed && petListStyles.cardPressed]}
      >
        <Text style={petListStyles.petName}>{item.name}</Text>
        <Text style={petListStyles.petInfo}>Especie: {item.species}</Text>
        <Text style={petListStyles.petInfo}>Raza: {item.breed}</Text>
        <Text style={petListStyles.petInfo}>Edad: {item.age} anos</Text>
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
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

export default PetListScreen;
