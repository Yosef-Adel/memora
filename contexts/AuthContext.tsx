import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// Define user type
export type User = {
  id: string;
  name: string;
  email: string;
};

// Define context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for stored user on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, you would make an API call here
    try {
      // Mock authentication (replace with actual API call)
      if (email && password) {
        // Simulate successful login
        const mockUser = {
          id: "1",
          name: "Test User",
          email: email,
        };

        // Store user info
        await AsyncStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error", error);
      return false;
    }
  };

  // Register function
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // In a real app, you would make an API call here
    try {
      // Mock registration (replace with actual API call)
      if (name && email && password) {
        // Simulate successful registration
        const mockUser = {
          id: Date.now().toString(),
          name,
          email,
        };

        // Store user info
        await AsyncStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error", error);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
