    import React from "react";
    import { createNativeStackNavigator } from "@react-navigation/native-stack";
    import LoginScreen from "../screen/LoginScreen";
    import RegisterScreen from "../screen/RegisterScreen";

    const Stack = createNativeStackNavigator();

    export default function AuthNavigator({onLoginSuccess}) {
        return (
            <Stack.Navigator 
            screenOptions={{
                headerStyle: { backgroundColor: '#ffff'},
                headerTintColor: 'black',
                headerTitleAlign: 'center',
                headerShadowVisible: false,
            }}
            >
            <Stack.Screen name="Register">
                {(props) => <RegisterScreen {...props} onLoginSuccess={onLoginSuccess} />}
            </Stack.Screen>

            <Stack.Screen name="Login" options={{ title: 'Login' }}>
                {(props) => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
            </Stack.Screen>
             </Stack.Navigator>
        )
    }
