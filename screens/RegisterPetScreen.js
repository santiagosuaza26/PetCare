import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
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
          <View style={registerPetStyles.container}>
            <Text style={registerPetStyles.title}>Registrar mascota</Text>
            <Text style={registerPetStyles.description}>
              Completa los campos para guardar una nueva mascota.
            </Text>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Nombre de la mascota</Text>
              <TextInput
                value={petName}
                onChangeText={setPetName}
                placeholder="Ej. Luna"
                style={registerPetStyles.input}
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Especie</Text>
              <TextInput
                value={petSpecies}
                onChangeText={setPetSpecies}
                placeholder="Ej. Perro"
                style={registerPetStyles.input}
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Raza</Text>
              <TextInput
                value={petBreed}
                onChangeText={setPetBreed}
                placeholder="Ej. Labrador"
                style={registerPetStyles.input}
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Edad</Text>
              <TextInput
                value={petAge}
                onChangeText={setPetAge}
                placeholder="Ej. 4"
                style={registerPetStyles.input}
                keyboardType="number-pad"
              />
            </View>

            <View style={registerPetStyles.fieldBlock}>
              <Text style={registerPetStyles.fieldLabel}>Nombre del responsable</Text>
              <TextInput
                value={ownerName}
                onChangeText={setOwnerName}
                placeholder="Ej. Maria"
                style={registerPetStyles.input}
              />
            </View>

            <Text style={registerPetStyles.helperText}>
              El boton se habilita cuando todos los campos son validos.
            </Text>

            <TouchableOpacity
              onPress={handleRegisterPet}
              disabled={!isSubmitEnabled}
              style={[
                registerPetStyles.submitButton,
                isSubmitEnabled
                  ? registerPetStyles.submitButtonEnabled
                  : registerPetStyles.submitButtonDisabled
              ]}
            >
              <Text style={registerPetStyles.submitButtonText}>Registrar mascota</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default RegisterPetScreen;
