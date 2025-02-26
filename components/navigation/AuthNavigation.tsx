import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSegments, usePathname } from "expo-router";
import { useEffect } from "react";

// This component handles authentication routing without affecting the navigation container
export default function AuthNavigation() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Get the current path and check if it's in the auth group
    // Using both segments and pathname for redundancy
    const isAuthRoute =
      pathname.startsWith("/auth") ||
      (segments.length > 0 && segments[0] === "auth");

    console.log("Current path:", pathname);
    console.log("Segments:", segments);
    console.log("Is auth route:", isAuthRoute);
    console.log("User:", user ? "Logged in" : "Not logged in");

    // Use setTimeout to ensure navigation happens after render cycle
    setTimeout(() => {
      try {
        if (!user && !isAuthRoute) {
          // If user is not authenticated and not on auth screen, redirect to login
          console.log("Redirecting to login");
          router.replace("/auth/login");
        } else if (user && (pathname == "/" || isAuthRoute)) {
          // If user is authenticated and on auth screen, redirect to home
          console.log("Redirecting to home");
          router.replace("/(tabs)");
        }
      } catch (e) {
        console.error("Navigation error:", e);
      }
    }, 0);
  }, [user, loading, segments, pathname]);

  // This component doesn't render anything
  return null;
}
