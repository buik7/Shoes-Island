import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../Themes/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Store = ({store, navigate}) => {
  if (!store) return <></>;

  const renderRating = address => {
    const listStars = [];
    const num = parseInt(address.split(' ')[0]) + 130;
    for (let i = 0; i < 5; i++) {
      listStars.push(
        <AntDesign
          key={i}
          name="star"
          size={13}
          color="#FDCC0D"
          style={{marginRight: 2}}
        />,
      );
    }
    return (
      <View style={styles.ratingContainer}>
        {listStars}
        <Text style={styles.ratingText}>({num} reviews)</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigate}>
      <Image source={{uri: store.image}} style={styles.storeImage} />
      <View>
        <Text style={styles.storeName}>{store.name}</Text>
        <Text style={styles.storeAddress}>{store.description}</Text>
        {renderRating(store.description)}
      </View>
    </TouchableOpacity>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 30,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  storeImage: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginRight: 20,
  },
  storeName: {
    fontWeight: '700',
    color: colors.black,
    fontSize: 15,
  },
  storeAddress: {
    marginTop: 5,
    color: colors.black,
    fontSize: 15,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: 'gray',
  },
});
