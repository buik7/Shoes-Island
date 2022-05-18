import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import {colors} from '../../Themes/colors';
import {useDispatch, useSelector} from 'react-redux';
import Product from '../../Components/Product/Product';
import {
  getFeaturedProductListThunk,
  getProductListByCategoryThunk,
  getProductListThunk,
} from '../../Redux/thunks/productThunk';
import {getCategoryListThunk} from '../../Redux/thunks/categoryThunk';
import {screenNames} from '../../Navigation/constants/screenNames';
import {getStoreListThunk} from '../../Redux/thunks/storeThunk';
import Store from '../../Components/Store/Store';

const HomeScreen = ({navigation}) => {
  const [chosenCategory, setChosenCategory] = React.useState('All');
  const {categoryList} = useSelector(state => state.categoryReducer);
  const {productList, featuredProductList, categoryProductList} = useSelector(
    state => state.productReducer,
  );
  const {storeList} = useSelector(state => state.storeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductListThunk);
    dispatch(getFeaturedProductListThunk);
    dispatch(getCategoryListThunk);
    dispatch(getStoreListThunk);
  }, [dispatch]);

  const getCategoryList = React.useCallback(
    () => [{id: 'All', category: 'ALL'}, ...categoryList],
    [categoryList],
  );

  const renderCategories = React.useCallback(
    ({item}) => {
      if (item.id === chosenCategory) {
        return (
          <View style={[styles.category, styles.chosenCategory]}>
            <Text style={[styles.categoryText, styles.chosenCategoryText]}>
              {item.category}
            </Text>
          </View>
        );
      }

      return (
        <TouchableOpacity onPress={onCategoryChange(item.id)}>
          <View style={styles.category}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [chosenCategory],
  );

  const onCategoryChange = React.useCallback(
    newCategory => {
      return () => {
        if (newCategory === 'All') {
          dispatch(getProductListThunk);
        } else {
          dispatch(getProductListByCategoryThunk(newCategory));
        }
        setChosenCategory(newCategory);
      };
    },
    [chosenCategory],
  );

  const navigateToDetail = React.useCallback(
    id => () =>
      navigation.navigate(screenNames.detailScreen, {
        id,
      }),
    [],
  );

  const navigateToStoreDetail = React.useCallback(
    id => () => navigation.navigate(screenNames.storeDetailScreen, {id}),
    [],
  );

  const renderStores = () => {
    return storeList.map(item => (
      <View style={styles.storeContainer} key={item.id}>
        <Store store={item} navigate={navigateToStoreDetail(item.id)} />
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[styles.blockContainer, styles.mb10]}
        onPress={() => navigation.navigate(screenNames.searchScreen)}>
        <SearchBar editable={false} />
      </TouchableOpacity>
      <ScrollView>
        <Text style={[styles.textBold, styles.mb15]}>Category</Text>
        <FlatList
          horizontal
          data={getCategoryList()}
          renderItem={renderCategories}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
          showsHorizontalScrollIndicator={false}
          style={styles.mb20}
        />
        <Text style={[styles.textBold, styles.mb20]}>Products</Text>
        <FlatList
          horizontal
          data={chosenCategory === 'All' ? productList : categoryProductList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Product product={item} navigate={navigateToDetail(item.id)} />
          )}
          ItemSeparatorComponent={() => <View style={{width: 5}} />}
          showsHorizontalScrollIndicator={false}
          style={styles.mb20}
        />
        <Text style={[styles.textBold, styles.mb20]}>Popular</Text>
        <FlatList
          horizontal
          data={featuredProductList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Product product={item} navigate={navigateToDetail(item.id)} />
          )}
          ItemSeparatorComponent={() => <View style={{width: 5}} />}
          showsHorizontalScrollIndicator={false}
          style={styles.mb20}
        />
        <Text style={[styles.textBold, styles.mb20]}>Stores</Text>
        <View style={{marginBottom: 100}}>{renderStores()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.background,
  },
  blockContainer: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  textBold: {
    fontWeight: '800',
    fontSize: 20,
    color: '#484445',
  },
  category: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  chosenCategory: {
    backgroundColor: colors.focused,
  },
  categoryText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
  },
  chosenCategoryText: {
    color: colors.white,
    fontWeight: '800',
  },
  storeContainer: {
    marginBottom: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb20: {
    marginBottom: 20,
  },
});
