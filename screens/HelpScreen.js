import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { useAppTheme } from '../components/ThemeContext';
import { Surface, Switch, Text } from 'react-native-paper';

export default function HelpScreen(props) {
  const { isDarkTheme, toggleTheme } = useAppTheme();

  return (
    <Surface style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Help Screen
      </Text>
      <View style={styles.switchContainer}>
        <Text variant="titleSmall" style={styles.subtitle}>
          Current Theme: {isDarkTheme ? "Dark" : "Light"}
        </Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    margin: 20,
  },
  subtitle: {
    marginVertical: 8,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 3,
    paddingHorizontal: 30,
  },
  switchLabel: {
    fontSize: 16,
  },
});