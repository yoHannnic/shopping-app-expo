import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { CartProvider } from "./context/CartContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App(): JSX.Element {
  return (
    <CartProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <AppNavigator />
      </SafeAreaView>
    </CartProvider>
  );
}
