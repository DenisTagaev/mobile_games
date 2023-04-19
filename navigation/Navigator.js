import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Game from "../screens/Game";
import Welcome from "../screens/Welcome";


const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Home"
          component={Welcome}
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="Playground"
          component={Game}
          options={{
            title: "Playground",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
