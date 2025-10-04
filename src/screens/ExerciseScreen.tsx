import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/AppNavigator';

type ExerciseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Exercise'>;
type ExerciseScreenRouteProp = RouteProp<RootStackParamList, 'Exercise'>;

type Props = {
  navigation: ExerciseScreenNavigationProp;
  route: ExerciseScreenRouteProp;
};

const ExerciseScreen: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { exerciseId, loopNumber, totalLoops } = route.params;

  return (
    <View style={styles.container}>
      <Text>Exercise Screen</Text>
      <Text>Exercise ID: {exerciseId}</Text>
      <Text>Loop {loopNumber} of {totalLoops}</Text>
      <Button onPress={() => navigation.goBack()}>Back</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExerciseScreen;