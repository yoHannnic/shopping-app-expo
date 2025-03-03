import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

const products = [
    {
      id: 1,
      name: "Sony WH-1000XM5 Headphones",
      price: 22990,
      image: "https://ansons.ph/wp-content/uploads/2022/08/WH-1000XM5-S-1.jpg",
    },
    {
      id: 2,
      name: "iPhone 14 Pro Max",
      price: 60990,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=330&hei=330&fmt=jpeg&qlt=95&.v=1660753619444",
    },
    {
      id: 3,
      name: "ASUS ROG Strix G15 Laptop",
      price: 82990,
      image: "https://dlcdnwebimgs.asus.com/gain/92D3C505-D93B-4F6F-9D0A-BB83C37F3F84/w100",
    },
    {
      id: 4,
      name: "Apple Watch Series 9",
      price: 23990,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-finish-select-202309-41mm-starlight-aluminum-sport-band-starlight?wid=330&hei=330&fmt=jpeg&qlt=95&.v=1692971091953",
    },
    {
      id: 5,
      name: "JBL Charge 5 Bluetooth Speaker",
      price: 8990,
      image: "https://electroworld.abenson.com/media/catalog/product/cache/1/image/330x330/9df78eab33525d08d6e5fb8d27136e95/j/b/jbl_charge_5_gray_main_1.jpg",
    },
    {
      id: 6,
      name: "Logitech MX Mechanical Keyboard",
      price: 9990,
      image: "https://resource.logitech.com/w_330,c_lpad,b_rgb:ffffff/images/g_series/mx-mechanical-keyboard/mx-mechanical-gallery-1.png",
    },
    {
      id: 7,
      name: "Razer DeathAdder V3 Pro Mouse",
      price: 7490,
      image: "https://assets3.razerzone.com/DG7UjGyrYFOnIPcsg0STzm6GTA4=/500x500/https%3A%2F%2Fwww.razer.com%2Fassets%2Fimages%2Fproducts%2Fdeathadder-v3-pro%2Fdeathadder-v3-pro-black-gallery-01.png",
    },
    {
      id: 8,
      name: "Samsung T7 2TB External SSD",
      price: 10490,
      image: "https://images.samsung.com/is/image/samsung/p6pim/uk/mu-pc2t0t-ww/gallery/uk-t7-touch-mu-pc2t0t-ww-346859441?$330_330_PNG$",
    },
  ];
  
const HomeScreen = ({ navigation }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    if (!item || !item.id || !item.name || typeof item.price !== "number" || item.price <= 0) {
      Alert.alert("Invalid Product", "This product has missing or incorrect details.");
      return;
    }
    addToCart(item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productText}>{item.name}</Text>
              <Text style={styles.productPrice}>₱{item.price.toLocaleString()}</Text>
              <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
                <Ionicons name="cart" size={20} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("Cart")}> 
        <Text style={styles.buttonText}>Go to Cart</Text>
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
  productCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  cartButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
});

export default HomeScreen;
