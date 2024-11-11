import React, { useEffect, useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper';
import { fetchProducts, fetchProductsById } from '../utils/api';

export default function HomeScreen(props) {
  const [products, SetProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        SetProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Home Screen</Text>
      <View style={styles.productsContainer}>
        {
          products.map((product) => {
            // console.log(product.name);
            return (
              <Text key={product.id} variant="labelLarge">{product.name}</Text>
            );
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 20,
  },
  productsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  productsText: {
    fontSize: 14,
    marginVertical: 4,
  }
});