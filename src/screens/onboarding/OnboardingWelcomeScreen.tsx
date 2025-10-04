import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Title, Paragraph } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/AppNavigator';

type OnboardingWelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingWelcome'>;
type OnboardingWelcomeScreenRouteProp = RouteProp<RootStackParamList, 'OnboardingWelcome'>;

type Props = {
  navigation: OnboardingWelcomeScreenNavigationProp;
  route: OnboardingWelcomeScreenRouteProp;
};

const OnboardingWelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const handleContinue = () => {
    navigation.navigate('OnboardingInterests');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{t('onboarding.welcome.title')}</Title>
          <Paragraph style={styles.subtitle}>{t('onboarding.welcome.subtitle')}</Paragraph>
          <Paragraph style={styles.description}>{t('onboarding.welcome.description')}</Paragraph>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleContinue}
        style={styles.button}
      >
        {t('onboarding.welcome.continue')}
      </Button>
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
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    color: '#666',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 40,
  },
});

export default OnboardingWelcomeScreen;