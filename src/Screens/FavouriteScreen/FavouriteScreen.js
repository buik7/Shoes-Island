import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import {colors} from '../../Themes/colors';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProductListThunk} from '../../Redux/thunks/productThunk';
import Product from '../../Components/Product/Product';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenNames} from '../../Navigation/constants/screenNames';
import {getUserFavouriteProductsThunk} from '../../Redux/thunks/userThunk';

const FavouriteScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {productList} = useSelector(state => state.productReducer);
  const {favouriteProducts} = useSelector(state => state.userReducer);
  useEffect(() => {
    dispatch(getProductListThunk);
    dispatch(getUserFavouriteProductsThunk);
  }, [dispatch]);

  let newProductList = productList.filter(item => {
    for (let fp of favouriteProducts) {
      if (item.id === fp.id) return true;
    }
    return false;
  });

  const navigateToDetail = React.useCallback(
    id => () =>
      navigation.navigate(screenNames.detailScreen, {
        id,
      }),
    [],
  );

  const renderProduct = React.useCallback(({item}) => {
    return (
      <View>
        <View style={styles.iconContainer}>
          <AntDesign name="heart" size={20} color="red" />
        </View>
        <Product product={item} navigate={navigateToDetail(item.id)} />
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.textBold, styles.mb20]}>
        Your Favourite Products
      </Text>

      <FlatList
        data={newProductList}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        numColumns={2}
        contentContainerStyle={{
          alignSelf: 'center',
          paddingVertical: 20,
        }}
      />
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  textBold: {
    fontWeight: '800',
    fontSize: 20,
    color: '#484445',
  },
  mb20: {
    marginBottom: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 12,
    left: 25,
    zIndex: 1,
  },
});
