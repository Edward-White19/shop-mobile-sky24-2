import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme, Icon, MD3Colors } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchProducts } from "../utils/api.js";
import { MaterialIcons } from '@expo/vector-icons';

export default function ShopViewScreen(props) {
  // #region Use States
  /** List of products. */
  const [products, setProducts] = useState([]);
  /** Whether to use an offline catalog. */
  const [offline, setOffline] = useState(false);
  /** Current error. */
  const [error, setError] = useState(null);
  /** Whether to display ? */
  const [visible, setVisible] = useState(false);
  /** The currently selected product. */
  const [selectedProduct, setSelectedProduct] = useState(null);
  /** The name of the currently selected product. */
  const [selectedProductName, setSelectedProductName] = useState("");
  // #endregion

  /** Async. function for fetching product data. */
  const fetchData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setOffline(true);
      setError("Unable to fetch data, offline mode");
    }
  };

  // Use fetchData();
  useEffect(() => { fetchData(); }, []);

  // #region Navigation
  function showProductViewScreen(id) {
    props.navigation.navigate("ProductView", { id: id });
  }

  function showProductEditScreen(id) {
    props.navigation.navigate("ProductEdit", { id: id })
  }
  // #endregion

  return (
    <Surface style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text variant='displaySmall'>ShopViewScreen</Text>
      <Surface style={{
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {
          products.map((product) => (
            <Card
              key={product.id}
              mode='elevated'
              elevation={3}
              style={{
                width: '25%',
                margin: '2%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => showProductViewScreen(product.id)}
            >
              <Card.Title title={product.name} />
            </Card>
          ))
        }
        <Card
          mode='elevated'
          elevation={3}
          style={{
            width: '25%',
            margin: '2%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: MD3Colors.primary100,
          }}
          onPress={() => showProductEditScreen(-1)}
        >
          <Icon source='plus' color='white' size={26} />
        </Card>
      </Surface>
    </Surface>
  )
}