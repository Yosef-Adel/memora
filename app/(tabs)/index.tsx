import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import DailyReviewCard from '@/components/DailyReviewCard';
import StatsSection from '@/components/StateSection';
import GreetingCard from '@/components/GreetingCard';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';


export default function HomeScreen() {
  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  return (
    <SafeAreaView style={[{ backgroundColor }, styles.container]} >
      <GreetingCard />
      <DailyReviewCard />
      <StatsSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
