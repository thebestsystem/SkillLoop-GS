import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/AppNavigator';

type ProgressScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Progress'>;
type ProgressScreenRouteProp = RouteProp<RootStackParamList, 'Progress'>;

type Props = {
  navigation: ProgressScreenNavigationProp;
  route: ProgressScreenRouteProp;
};

const ProgressScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text>Progress Screen</Text>
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

export default ProgressScreen;