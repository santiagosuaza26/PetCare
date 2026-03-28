import React, { createContext, useContext, useState } from 'react';

const PetContext = createContext(undefined);

function PetProvider({ children }) {
  const [pets, setPets] = useState([]);

  const addPet = (petData) => {
    setPets((previousPets) => {
      return [petData, ...previousPets];
    });
  };

  const updatePet = (petId, updatedFields) => {
    setPets((previousPets) => {
      return previousPets.map((pet) => {
        if (pet.id !== petId) {
          return pet;
        }

        return {
          ...pet,
          ...updatedFields
        };
      });
    });
  };

  const petContextValue = {
    pets,
    setPets,
    addPet,
    updatePet
  };

  return <PetContext.Provider value={petContextValue}>{children}</PetContext.Provider>;
}

function usePetContext() {
  const contextValue = useContext(PetContext);

  if (!contextValue) {
    throw new Error('usePetContext must be used inside PetProvider.');
  }

  return contextValue;
}

export { PetProvider, usePetContext };
