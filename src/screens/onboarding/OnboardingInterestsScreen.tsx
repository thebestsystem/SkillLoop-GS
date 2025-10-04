import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Title, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/AppNavigator';

type OnboardingInterestsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingInterests'>;
type OnboardingInterestsScreenRouteProp = RouteProp<RootStackParamList, 'OnboardingInterests'>;

type Props = {
  navigation: OnboardingInterestsScreenNavigationProp;
  route: OnboardingInterestsScreenRouteProp;
};

const INTERESTS = [
  { key: 'logic', labelKey: 'onboarding.interests.logic' },
  { key: 'memory', labelKey: 'onboarding.interests.memory' },
  { key: 'vocabulary', labelKey: 'onboarding.interests.vocabulary' },
  { key: 'creativity', labelKey: 'onboarding.interests.creativity' },
];

const OnboardingInterestsScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleContinue = () => {
    if (selectedInterests.length >= 2) {
      navigation.navigate('OnboardingSchedule');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{t('onboarding.interests.title')}</Title>
          <Text style={styles.subtitle}>{t('onboarding.interests.subtitle')}</Text>
          
          <View style={styles.chipsContainer}>
            {INTERESTS.map((interest) => (
              <Chip
                key={interest.key}
                mode="outlined"
                selected={selectedInterests.includes(interest.key)}
                onPress={() => toggleInterest(interest.key)}
                style={styles.chip}
                textStyle={styles.chipText}
              >
                {t(interest.labelKey)}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleContinue}
        disabled={selectedInterests.length < 2}
        style={styles.button}
      >
        {t('onboarding.interests.continue')}
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
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  chip: {
    margin: 5,
  },
  chipText: {
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 40,
  },
});

export default OnboardingInterestsScreen;