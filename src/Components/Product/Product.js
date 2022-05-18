import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../Themes/colors';

const Product = ({product, navigate}) => {
  const {name, price, image} = product;
  return (
    <TouchableOpacity style={styles.container} onPress={navigate}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      {price && <Text style={styles.price}>${price}</Text>}
    </TouchableOpacity>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 175,
    height: 175,
    backgroundColor: colors.white,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  image: {height: 75, width: 75, marginLeft: 40, transform: [{scale: 1.5}]},
  name: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  price: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
});
