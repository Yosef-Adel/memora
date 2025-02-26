import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

const StatsSection = () => {
  const cardBackground = useThemeColor({ light: Colors.light.card, dark: Colors.dark.card }, 'card');
  const primaryIconColor = useThemeColor({ light: Colors.light.primary, dark: Colors.dark.primary }, 'text');
  const secondaryIconColor = useThemeColor({ light: Colors.light.secondary, dark: Colors.dark.secondary }, 'text');

  return (
    <View style={styles.container}>
      {/* Card 1 */}
      <TouchableOpacity style={[styles.card, { backgroundColor: cardBackground }]}>
        <View style={styles.cardContent}>
          {/* Top Row: Left Section Only */}
          <View style={styles.row}>
            <View style={styles.leftSection}>
              <View style={styles.iconContainerPrimary}>
                <MaterialIcons name="trending-up" size={24} color={primaryIconColor} />
              </View>
              <View>
                <ThemedText type="defaultSemiBold" style={styles.statNumber}>
                  147
                </ThemedText>
                <ThemedText type="default" style={styles.statLabel}>
                  Total Highlights
                </ThemedText>
              </View>
            </View>
          </View>
          {/* Bottom Section: Right Section Text */}
          <View style={styles.bottomSection}>
            <ThemedText type="defaultSemiBold" style={styles.goalLabel}>
              Monthly Goal
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.goalValue}>
              200
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>

      {/* Card 2 */}
      <TouchableOpacity style={[styles.card, { backgroundColor: cardBackground }]}>
        <View style={styles.cardContent}>
          {/* Top Row: Left Section Only */}
          <View style={styles.row}>
            <View style={styles.leftSection}>
              <View style={styles.iconContainerSecondary}>
                <MaterialIcons name="access-time" size={24} color={secondaryIconColor} />
              </View>
              <View>
                <ThemedText type="defaultSemiBold" style={styles.statNumber}>
                  14
                </ThemedText>
                <ThemedText type="default" style={styles.statLabel}>
                  Day Streak
                </ThemedText>
              </View>
            </View>
          </View>
          {/* Bottom Section: Right Section Text */}
          <View style={styles.bottomSection}>
            <ThemedText type="defaultSemiBold" style={styles.goalLabel}>
              Best Streak
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.goalValue}>
              21 days
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    minHeight: 150,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Android elevation
    elevation: 4,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainerPrimary: {
    padding: 8,
    backgroundColor: 'rgba(0,122,255,0.1)', // you can also adjust this with theme if desired
    borderRadius: 12,
    marginRight: 8,
  },
  iconContainerSecondary: {
    padding: 8,
    backgroundColor: 'rgba(255,45,85,0.1)',
    borderRadius: 12,
    marginRight: 8,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    // ThemedText will override this with the appropriate text color.
  },
  bottomSection: {
    marginTop: 16,
  },
  goalLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  goalValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StatsSection;

