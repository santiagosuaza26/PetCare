import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tipsStyles from '../styles/TipsStyles';

function TipsScreen() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const mockTips = [
      {
        id: '1',
        title: 'Vacunas al dia',
        description: 'Cumple el calendario de vacunas y controles con el veterinario.'
      },
      {
        id: '2',
        title: 'Hidratacion constante',
        description: 'Asegura agua limpia y fresca durante todo el dia.'
      },
      {
        id: '3',
        title: 'Actividad diaria',
        description: 'Dedica al menos 20 minutos al juego o paseo segun su especie.'
      },
      {
        id: '4',
        title: 'Alimentacion equilibrada',
        description: 'Usa porciones adecuadas y evita alimentos no recomendados.'
      }
    ];

    setTips(mockTips);
  }, []);

  const renderTipItem = ({ item }) => {
    return (
      <View style={tipsStyles.tipCard}>
        <Text style={tipsStyles.tipTitle}>{item.title}</Text>
        <Text style={tipsStyles.tipDescription}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={tipsStyles.safeArea}>
      <View style={tipsStyles.container}>
        <Text style={tipsStyles.title}>Consejos de cuidado</Text>
        <Text style={tipsStyles.description}>
          Recomendaciones simples para mantener a tus mascotas saludables.
        </Text>

        <FlatList
          data={tips}
          keyExtractor={(item) => item.id}
          renderItem={renderTipItem}
          contentContainerStyle={tipsStyles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

export default TipsScreen;
