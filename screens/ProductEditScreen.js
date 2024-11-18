import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { addProduct, deleteProduct, fetchProductsById, updateProduct } from '../utils/api';

export default function ProductEditScreen(props) {
  let { id } = props.route.params;

  // #region Use States
  let [product, setProduct] = useState(null);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  // #endregion

  // #region Query Functions
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

  const handleSubmit = async () => {
    try {
      if (id === -1) {
        await addProduct(product);
      } else {
        await updateProduct(id, product);
      }
      showShopView();
    } catch (err) {
      console.error(err);
      setError("Failed to save data.");
    }
  };

  const handleDelete = async (id) => {
    if (id >= 0) {
      try {
        const success = await deleteProduct(id);
        if (success) {
          showShopView();
        } else {
          setError("Failed to delete. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting:", err);
        setError("Failed to delete. Check your connection.");
      }
    }
  }
  // #endregion

  if (id >= 0) {
    useEffect(() => { fetchData(); }, []);
  } else {
    product = {
      name: 'Added Product',
      price: 0,
      stock: 0,
      description: 'desc.',
      categoryId: 1
    }
  }

  // #region Navigation
  function showShopView() {
    props.navigation.navigate("ShopView");
  }
  // #endregion

  return (
    <Surface style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant='displaySmall'>ProductEditScreen</Text>
      <Surface style={{ flex: 1, margin: '2%', justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          variant='bodyLarge'
          mode='outlined'
          label='Name'
          placeholder={product?.name}
        />
        <TextInput
          variant='bodyMedium'
          mode='outlined'
          label='Price'
          placeholder={product?.price}
        />
        <TextInput
          variant='bodyMedium'
          mode='outlined'
          label='Stock'
          placeholder={product?.stock}
        />
        <TextInput
          variant='bodyMedium'
          mode='outlined'
          label='Description'
          placeholder={product?.description}
        />
        <TextInput
          variant='bodyMedium'
          mode='outlined'
          label='Category ID'
          placeholder={product?.categoryId}
        />
      </Surface>
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Button mode="contained" icon="update" onPress={() => {
          handleSubmit(product);
        }}>Confirm</Button>
        <Button mode="contained" icon="update" onPress={() => {
          handleDelete(id);
        }}>Delete</Button>
        <Button mode="contained" icon="update" onPress={() => showShopView()}>Back</Button>
      </View>
    </Surface>
  )
}