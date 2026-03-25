import React, { useEffect, useRef, useState } from 'react';
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

import { usePetContext } from '../context/PetContext';
import registerPetStyles from '../styles/RegisterPetStyles';

function RegisterPetScreen() {
  const { addPet } = usePetContext();
  const [petName, setPetName] = useState('');
  const [petSpecies, setPetSpecies] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const formAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const hasAllTextFields =
      petName.trim() !== '' &&
      petSpecies.trim() !== '' &&
      petBreed.trim() !== '' &&
      ownerName.trim() !== '';
    const parsedAge = Number(petAge);
    const hasValidAge = petAge.trim() !== '' && Number.isInteger(parsedAge) && parsedAge > 0;

    setIsSubmitEnabled(hasAllTextFields && hasValidAge);
  }, [petName, petSpecies, petBreed, petAge, ownerName]);

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
    setPetName('');
    setPetSpecies('');
    setPetBreed('');
    setPetAge('');
    setOwnerName('');
  };

  const handleRegisterPet = () => {
    if (!isSubmitEnabled) {
      return;
    }

    const newPet = {
      id: Date.now().toString(),
      name: petName.trim(),
      species: petSpecies.trim(),
      breed: petBreed.trim(),
      age: Number(petAge.trim()),
      owner: ownerName.trim()
    };

    addPet(newPet);

    Alert.alert('Registro exitoso', 'La mascota fue registrada correctamente.');
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
                value={petName}
                onChangeText={setPetName}
                onFocus={() => setFocusedInput('petName')}
                onBlur={() => setFocusedInput('')}
                placeholder="Ej. Luna"
                style={getInputStyle('petName')}
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Especie</Text>
              <TextInput
                value={petSpecies}
                onChangeText={setPetSpecies}
                onFocus={() => setFocusedInput('petSpecies')}
                onBlur={() => setFocusedInput('')}
                placeholder="Ej. Perro"
                style={getInputStyle('petSpecies')}
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Raza</Text>
              <TextInput
                value={petBreed}
                onChangeText={setPetBreed}
                onFocus={() => setFocusedInput('petBreed')}
                onBlur={() => setFocusedInput('')}
                placeholder="Ej. Labrador"
                style={getInputStyle('petBreed')}
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Edad</Text>
              <TextInput
                value={petAge}
                onChangeText={setPetAge}
                onFocus={() => setFocusedInput('petAge')}
                onBlur={() => setFocusedInput('')}
                placeholder="Ej. 4"
                style={getInputStyle('petAge')}
                keyboardType="number-pad"
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Nombre del responsable</Text>
              <TextInput
                value={ownerName}
                onChangeText={setOwnerName}
                onFocus={() => setFocusedInput('ownerName')}
                onBlur={() => setFocusedInput('')}
                placeholder="Ej. Maria"
                style={getInputStyle('ownerName')}
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
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default RegisterPetScreen;
