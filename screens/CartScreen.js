import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = ({ navigation }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert("Cart is Empty", "Please add items before proceeding to checkout.");
      return;
    }
    navigation.navigate("Checkout");
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <View style={styles.productDetails}>
                <Text style={styles.productText} numberOfLines={2} ellipsizeMode="tail">
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>₱{(item.price * item.quantity).toLocaleString()}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => updateQuantity(item.id, 1)}>
                  <Ionicons name="add-circle" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.button} onPress={() => updateQuantity(item.id, -1)}>
                  <Ionicons name="remove-circle" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      {cart.length > 0 && (
        <TouchableOpacity style={styles.clearCartButton} onPress={clearCart}>
          <Text style={styles.clearCartText}>Clear Cart</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  productDetails: {
    flex: 1,
    marginRight: 10,
  },
  productText: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  checkoutButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearCartButton: {
    backgroundColor: "#ffcc00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  clearCartText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#6c757d",
  },
});

export default CartScreen;
