import { View, Text, StyleSheet, Switch, useColorScheme } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const textColor = isDark ? '#fff' : '#000';
  const secondaryText = isDark ? '#aaa' : '#666';
  const borderColor = isDark ? '#333' : '#e0e0e0';

  return (
    <View style={styles.container}>
      <View style={[styles.section, { borderBottomColor: borderColor }]}>
        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: textColor }]}>Sync</Text>
            <Text style={[styles.description, { color: secondaryText }]}>
              Auto sync with cloud
            </Text>
          </View>
          <Switch value={syncEnabled} onValueChange={setSyncEnabled} />
        </View>
      </View>
      <View style={[styles.section, { borderBottomColor: borderColor }]}>
        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: textColor }]}>Notifications</Text>
            <Text style={[styles.description, { color: secondaryText }]}>
              Receive reminder notifications
            </Text>
          </View>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>
      </View>
      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: secondaryText }]}>
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16 },
  section: { borderBottomWidth: 1, paddingHorizontal: 16, paddingVertical: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 16, fontWeight: '500' },
  description: { fontSize: 13, marginTop: 2 },
  versionContainer: { alignItems: 'center', marginTop: 32 },
  versionText: { fontSize: 13 },
});
