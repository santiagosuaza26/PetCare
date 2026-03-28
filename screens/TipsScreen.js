import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tipsData from '../data/tipsData';
import tipsStyles from '../styles/TipsStyles';

function TipsScreen() {
  const [tipsList, setTipsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTip, setCurrentTip] = useState(null);

  useEffect(() => {
    setTipsList(tipsData);

    if (tipsData.length === 0) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setCurrentIndex((previousIndex) => {
        return (previousIndex + 1) % tipsData.length;
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (tipsList.length === 0) {
      setCurrentTip(null);
      return;
    }

    setCurrentTip(tipsList[currentIndex]);
  }, [currentIndex, tipsList]);

  const handleNextTip = () => {
    if (tipsList.length === 0) {
      return;
    }

    setCurrentIndex((previousIndex) => {
      return (previousIndex + 1) % tipsList.length;
    });
  };

  const displayIndex = tipsList.length > 0 ? currentIndex + 1 : 0;

  return (
    <SafeAreaView style={tipsStyles.safeArea}>
      <View style={tipsStyles.container}>
        <Text style={tipsStyles.title}>Consejos de cuidado</Text>
        <Text style={tipsStyles.description}>
          Recomendaciones simples para mantener a tus mascotas saludables.
        </Text>

        <Text style={tipsStyles.counterText}>{displayIndex} de {tipsList.length}</Text>

        <View style={tipsStyles.tipCard}>
          <Text style={tipsStyles.tipTitle}>{currentTip?.title || 'Sin consejos disponibles'}</Text>
          <Text style={tipsStyles.tipDescription}>{currentTip?.content || ''}</Text>
        </View>

        <View style={tipsStyles.nextButtonWrapper}>
          <Button
            title="Siguiente"
            color="#111111"
            onPress={handleNextTip}
            disabled={tipsList.length === 0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default TipsScreen;
