import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Title, RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/AppNavigator';

type OnboardingScheduleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingSchedule'>;
type OnboardingScheduleScreenRouteProp = RouteProp<RootStackParamList, 'OnboardingSchedule'>;

type Props = {
  navigation: OnboardingScheduleScreenNavigationProp;
  route: OnboardingScheduleScreenRouteProp;
};

const SCHEDULE_OPTIONS = [
  { key: '8am', labelKey: 'onboarding.schedule.8am' },
  { key: '12pm', labelKey: 'onboarding.schedule.12pm' },
  { key: '7pm', labelKey: 'onboarding.schedule.7pm' },
];

const OnboardingScheduleScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedTime, setSelectedTime] = useState<'8am' | '12pm' | '7pm' | null>(null);

  const handleContinue = () => {
    if (selectedTime) {
      navigation.navigate('OnboardingTrial');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{t('onboarding.schedule.title')}</Title>
          <Text style={styles.subtitle}>{t('onboarding.schedule.subtitle')}</Text>
          
          <RadioButton.Group
            onValueChange={(value) => setSelectedTime(value as '8am' | '12pm' | '7pm')}
            value={selectedTime}
          >
            {SCHEDULE_OPTIONS.map((option) => (
              <RadioButton.Item
                key={option.key}
                label={t(option.labelKey)}
                value={option.key}
                position="leading"
                labelStyle={styles.radioLabel}
              />
            ))}
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleContinue}
        disabled={!selectedTime}
        style={styles.button}
      >
        {t('onboarding.schedule.continue')}
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
  radioLabel: {
    fontSize: 16,
    textAlign: 'left',
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 40,
  },
});

export default OnboardingScheduleScreen;