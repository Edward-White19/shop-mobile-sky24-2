import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchProductsById } from "../utils/api.js";

export default function ProductViewScreen(props) {
  const { id } = props.route.params;

  // #region Use States
  const [product, setProduct] = useState(null);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  // #endregion

  /** Async. function for fetching product data. */
  const fetchData = async () => {
    try {
      const data = await fetchProductsById(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
      setOffline(true);
      setError("Unable to fetch data, offline mode");
    }
  };

  // Use fetchData();
  useEffect(() => { fetchData(); }, []);

  // #region Navigation
  function showShopView() {
    props.navigation.navigate("ShopView");
  }

  function showProductEdit(id) {
    props.navigation.navigate("ProductEdit", { id: id })
  }
  // #endregion

  let productDisplay = (<></>);
  if (product != null) {
    productDisplay = (
      <Surface style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='bodyLarge'>{product?.name}</Text>
        <Text variant='bodyMedium'>Price: ${product?.price}</Text>
        <Text variant='bodyMedium'>Stock: {product?.stock}</Text>
        <Text variant='bodyMedium'>Description: {product?.description}</Text>
        <Text variant='bodyMedium'>Category: {product?.categoryId}</Text>
      </Surface>
    );
  }

  return (
    <Surface style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant='displaySmall'>ProductViewScreen</Text>
      {productDisplay}
      <Button mode="contained" icon="update" onPress={() => showProductEdit(id)}>Edit</Button>
      <Button mode="contained" icon="update" onPress={() => showShopView()}>Back</Button>
    </Surface>
  )
}