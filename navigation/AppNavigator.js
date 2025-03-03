import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import { TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";

const Stack = createStackNavigator();

const CartIcon = ({ navigation }) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity
      onPress={() => {
        if (totalItems === 0) {
          Alert.alert("Cart is Empty", "Please add items before proceeding.");
          return;
        }
        navigation.navigate("Cart");
      }}
      style={styles.cartButton}
    >
      <Text style={styles.cartText}>Cart ({totalItems})</Text>
    </TouchableOpacity>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#007bff" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Shop",
            headerLeft: () => null, // Hides back button on Home screen
            headerRight: () => <CartIcon navigation={navigation} />, 
          })}
        />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: "Your Cart" }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Checkout" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    marginRight: 15,
    padding: 8,
    backgroundColor: "#ff9900",
    borderRadius: 5,
  },
  cartText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
