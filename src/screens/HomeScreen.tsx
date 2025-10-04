import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card, Title, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const handleStartLoop = () => {
    navigation.navigate('Exercise', { exerciseId: '1', loopNumber: 1, totalLoops: 3 });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statsContainer}>
          <Chip icon="fire" style={styles.statChip}>5🔥</Chip>
          <Chip icon="star" style={styles.statChip}>0⭐</Chip>
          <Chip icon="trophy" style={styles.statChip}>0🏆</Chip>
        </View>
      </View>

      <Card style={styles.loopCard}>
        <Card.Content>
          <Title>Today's Loops</Title>
          <View style={styles.exerciseList}>{
            [1, 2, 3].map((loop) => (
              <Card key={loop} style={styles.exerciseCard}>
                <Card.Content>
                  <Text>Loop {loop}</Text>
                  <Text>Skill: Logic</Text>
                  <Text>Difficulty: Easy</Text>
                  <Text>Time: 45s</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleStartLoop}
        style={styles.startButton}
      >
        Start My Loop
      </Button>

      <Card style={styles.premiumCard}>
        <Card.Content>
          <Title>Upgrade to Premium</Title>
          <Text>Unlock unlimited loops and advanced analytics</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statChip: {
    margin: 5,
  },
  loopCard: {
    margin: 15,
  },
  exerciseList: {
    marginTop: 15,
  },
  exerciseCard: {
    margin: 5,
  },
  startButton: {
    margin: 15,
  },
  premiumCard: {
    margin: 15,
    backgroundColor: '#FFF8E1',
  },
});

export default HomeScreen;