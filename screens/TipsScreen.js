import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tipsData from '../data/tipsData';
import tipsStyles from '../styles/TipsStyles';

function TipsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((previousIndex) => {
        return (previousIndex + 1) % tipsData.length;
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const currentTip = tipsData[currentIndex];

  const handleNextTip = () => {
    setCurrentIndex((previousIndex) => {
      return (previousIndex + 1) % tipsData.length;
    });
  };

  return (
    <SafeAreaView style={tipsStyles.safeArea}>
      <View style={tipsStyles.container}>
        <Text style={tipsStyles.title}>Consejos de cuidado</Text>
        <Text style={tipsStyles.description}>
          Recomendaciones simples para mantener a tus mascotas saludables.
        </Text>

        <Text style={tipsStyles.counterText}>
          Consejo {currentIndex + 1} de {tipsData.length}
        </Text>

        <View style={tipsStyles.tipCard}>
          <Text style={tipsStyles.tipTitle}>{currentTip.title}</Text>
          <Text style={tipsStyles.tipDescription}>{currentTip.content}</Text>
        </View>

        <View style={tipsStyles.nextButtonWrapper}>
          <Button title="Siguiente" color="#111111" onPress={handleNextTip} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default TipsScreen;
