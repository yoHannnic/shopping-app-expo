import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

const CheckoutScreen = ({ navigation }) => {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert("Cart is Empty", "You have no items to checkout.");
      return;
    }
    if (cart.some(item => item.quantity <= 0)) {
      Alert.alert("Invalid Quantity", "One or more items have an invalid quantity. Please update before proceeding.");
      return;
    }
    if (cart.some(item => isNaN(item.price) || item.price <= 0)) {
      Alert.alert("Invalid Price", "One or more items have an invalid price. Please check your cart.");
      return;
    }
    Alert.alert("Checkout successful", "Thank you for your purchase!", [
      { text: "OK", onPress: () => { clearCart(); navigation.navigate("Home"); } },
    ]);
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>No items to checkout.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.productText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.productPrice}>₱{item.price.toLocaleString()} x {item.quantity}</Text>
            </View>
          )}
        />
      )}
      <Text style={styles.totalText}>Total: ₱{total.toLocaleString()}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Ionicons name="checkmark-circle" size={24} color="white" style={styles.icon} />
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  cartItem: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  productText: {
    fontSize: 16,
    fontWeight: "bold",
    width: "80%",
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  checkoutButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#6c757d",
  },
  icon: {
    marginRight: 5,
  },
});

export default CheckoutScreen;
