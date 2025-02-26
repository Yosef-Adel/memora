import { useColorScheme as _useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export function useColorScheme(): "light" | "dark" {
  const systemColorScheme = _useColorScheme() as "light" | "dark";
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(
    systemColorScheme
  );

  useEffect(() => {
    // Check if user has saved preference
    const loadUserPreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme) {
          setColorScheme(savedTheme as "light" | "dark");
        } else {
          setColorScheme(systemColorScheme);
        }
      } catch (error) {
        console.error("Failed to load theme preference", error);
        setColorScheme(systemColorScheme);
      }
    };

    loadUserPreference();
  }, [systemColorScheme]);

  // Listen for system theme changes
  useEffect(() => {
    // If no user preference is saved, follow system
    const updateIfFollowingSystem = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (!savedTheme) {
          setColorScheme(systemColorScheme);
        }
      } catch (error) {
        console.error("Failed to check theme preference", error);
      }
    };

    updateIfFollowingSystem();
  }, [systemColorScheme]);

  return colorScheme;
}
