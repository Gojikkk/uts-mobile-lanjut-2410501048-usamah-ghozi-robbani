// AppNavigator.js
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import HomeTabs from "./HomeTabs"; 
import HomeStack from "./HomeStack";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Home" component={HomeStack} />
      ) : (
        <Stack.Screen name="Auth">
          {() => <AuthNavigator onLoginSuccess={() => setIsLoggedIn(true)} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}