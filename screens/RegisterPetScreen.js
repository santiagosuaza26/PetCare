import React, { useEffect, useState } from 'react';
import {
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import registerPetStyles from '../styles/RegisterPetStyles';

function RegisterPetScreen({ addPet }) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const [formAnimation] = useState(() => new Animated.Value(0));

  // Enable submit only when all fields are valid.
  useEffect(() => {
    const hasAllTextFields =
      name.trim() !== '' &&
      species.trim() !== '' &&
      breed.trim() !== '';
    const parsedAge = Number(age);
    const parsedWeight = Number(weight);
    const hasValidAge = age.trim() !== '' && Number.isInteger(parsedAge) && parsedAge > 0;
    const hasValidWeight = weight.trim() !== '' && Number.isFinite(parsedWeight) && parsedWeight > 0;

    setIsSubmitEnabled(hasAllTextFields && hasValidAge && hasValidWeight);
  }, [name, species, breed, age, weight]);

  // Animate the form on first render.
  useEffect(() => {
    Animated.timing(formAnimation, {
      toValue: 1,
      duration: 360,
      useNativeDriver: true
    }).start();
  }, [formAnimation]);

  const formAnimatedStyle = {
    opacity: formAnimation,
    transform: [
      {
        translateY: formAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 0]
        })
      }
    ]
  };

  const getInputStyle = (fieldName) => {
    return [
      registerPetStyles.input,
      focusedInput === fieldName && registerPetStyles.inputFocused
    ];
  };

  const clearFormFields = () => {
    setName('');
    setSpecies('');
    setBreed('');
    setAge('');
    setWeight('');
  };

  const handleRegisterPet = () => {
    // Stop if the form is not valid.
    if (!isSubmitEnabled) {
      return;
    }

    const newPet = {
      id: Date.now().toString(),
      name: name.trim(),
      species: species.trim(),
      breed: breed.trim(),
      age: Number(age.trim()),
      weight: Number(weight.trim())
    };

    addPet(newPet);

    Alert.alert(
      'Mascota registrada',
      `Nombre: ${newPet.name}\nEspecie: ${newPet.species}\nRaza: ${newPet.breed}\nEdad: ${newPet.age} anos\nPeso: ${newPet.weight} kg`
    );
    clearFormFields();
  };

  const handleClear = () => {
    clearFormFields();
  };

  return (
    <SafeAreaView style={registerPetStyles.safeArea}>
      <KeyboardAvoidingView
        style={registerPetStyles.keyboardWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={registerPetStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[registerPetStyles.container, formAnimatedStyle]}>
            <Text style={registerPetStyles.title}>Registrar mascota</Text>
            <Text style={registerPetStyles.description}>
              Completa los campos para guardar una nueva mascota.
            </Text>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Nombre de la mascota</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput('')}
                placeholder="Ej. Luna"
                style={getInputStyle('name')}
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Especie</Text>
              <TextInput
                value={species}
                onChangeText={setSpecies}
                onFocus={() => setFocusedInput('species')}
                onBlur={() => setFocusedInput('')}
                placeholder="Ej. Perro"
                style={getInputStyle('species')}
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Raza</Text>
              <TextInput
                value={breed}
                onChangeText={setBreed}
                onFocus={() => setFocusedInput('breed')}
                onBlur={() => setFocusedInput('')}
                placeholder="Ej. Labrador"
                style={getInputStyle('breed')}
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Edad</Text>
              <TextInput
                value={age}
                onChangeText={setAge}
                onFocus={() => setFocusedInput('age')}
                onBlur={() => setFocusedInput('')}
                placeholder="Ej. 4"
                style={getInputStyle('age')}
                keyboardType="number-pad"
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Peso (kg)</Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                onFocus={() => setFocusedInput('weight')}
                onBlur={() => setFocusedInput('')}
                placeholder="Ej. 18.5"
                style={getInputStyle('weight')}
                keyboardType="decimal-pad"
              />
            </View>

            <Text style={registerPetStyles.helperText}>
              El boton se habilita cuando todos los campos son validos.
            </Text>

            <Pressable
              onPress={handleRegisterPet}
              disabled={!isSubmitEnabled}
              style={({ pressed }) => [
                registerPetStyles.submitButton,
                isSubmitEnabled
                  ? registerPetStyles.submitButtonEnabled
                  : registerPetStyles.submitButtonDisabled,
                pressed && registerPetStyles.submitButtonPressed
              ]}
            >
              <Text style={registerPetStyles.submitButtonText}>Registrar mascota</Text>
            </Pressable>

            <Pressable
              onPress={handleClear}
              style={({ pressed }) => [
                registerPetStyles.clearButton,
                pressed && registerPetStyles.clearButtonPressed
              ]}
            >
              <Text style={registerPetStyles.clearButtonText}>Limpiar</Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default RegisterPetScreen;
