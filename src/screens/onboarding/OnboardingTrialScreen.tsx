import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Title, Paragraph, List } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/AppNavigator';

type OnboardingTrialScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingTrial'>;
type OnboardingTrialScreenRouteProp = RouteProp<RootStackParamList, 'OnboardingTrial'>;

type Props = {
  navigation: OnboardingTrialScreenNavigationProp;
  route: OnboardingTrialScreenRouteProp;
};

const PREMIUM_FEATURES = [
  'unlimited',
  'analytics',
  'streak',
  'support',
];

const OnboardingTrialScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const handleStartTrial = () => {
    navigation.replace('Home');
  };

  const handleSkip = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{t('onboarding.trial.title')}</Title>
          <Paragraph style={styles.subtitle}>{t('onboarding.trial.subtitle')}</Paragraph>
          
          <List.Section>
            {PREMIUM_FEATURES.map((feature) => (
              <List.Item
                key={feature}
                title={t(`onboarding.trial.features.${feature}`)}
                left={() => <List.Icon icon="check-circle" color="#4CAF50" />}
              />
            ))}
          </List.Section>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleStartTrial}
          style={styles.primaryButton}
        >
          {t('onboarding.trial.startTrial')}
        </Button>

        <Button
          mode="text"
          onPress={handleSkip}
          style={styles.secondaryButton}
        >
          {t('onboarding.trial.skip')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  card: {
    marginBottom: 30,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  primaryButton: {
    paddingHorizontal: 40,
  },
  secondaryButton: {
    paddingHorizontal: 40,
  },
});

export default OnboardingTrialScreen;