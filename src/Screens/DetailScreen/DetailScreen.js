import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import {colors} from '../../Themes/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {getProductDetailThunk} from '../../Redux/thunks/productThunk';
import {screenHeight, screenWidth} from '../../Utils/Dimensions';
import Quantity from '../../Components/Quantity/Quantity';
import Product from '../../Components/Product/Product';
import {screenNames} from '../../Navigation/constants/screenNames';
import {
  getUserFavouriteProductsThunk,
  likeProductThunk,
  unLikeProductThunk,
} from '../../Redux/thunks/userThunk';
import {stackNames} from '../../Navigation/constants/stackNames';
import {addToCartAction} from '../../Redux/actions/cartAction';

const DetailScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);
  const [chosenSize, setChosenSize] = React.useState(0);
  const {productDetail} = useSelector(state => state.productReducer);
  const {user, favouriteProducts} = useSelector(state => state.userReducer);

  React.useEffect(() => {
    dispatch(getProductDetailThunk(route.params.id));
  }, [dispatch, route.params.id]);

  React.useEffect(() => {
    if (user) {
      dispatch(getUserFavouriteProductsThunk);
    }
  }, [user]);

  const goBack = React.useCallback(() => navigation.goBack(), []);

  const renderHeart = React.useCallback(() => {
    if (!user) {
      return (
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => navigation.navigate(stackNames.authStack)}>
          <AntDesign name="hearto" color="red" size={30} />
        </TouchableOpacity>
      );
    }

    const productId = route.params.id;
    let iconName,
      onPress,
      isFavourite = false;
    for (let item of favouriteProducts) {
      if (item.id === productId) {
        isFavourite = true;
        break;
      }
    }

    if (isFavourite) {
      iconName = 'heart';
      onPress = () => {
        dispatch(unLikeProductThunk(productId));
        ToastAndroid.show(
          'Removed from your favourite list',
          ToastAndroid.SHORT,
        );
      };
    } else {
      iconName = 'hearto';
      onPress = () => {
        dispatch(likeProductThunk(productId));
        ToastAndroid.show('Added to your favourite list', ToastAndroid.SHORT);
      };
    }

    return (
      <TouchableOpacity style={styles.heartIcon} onPress={onPress}>
        <AntDesign name={iconName} color="red" size={30} />
      </TouchableOpacity>
    );
  }, [user, favouriteProducts]);

  const renderProductSize = React.useCallback(
    ({item, index}) => {
      if (index === chosenSize) {
        return (
          <TouchableOpacity
            style={[styles.productSize, styles.chosenProductSize]}>
            <Text style={{color: 'white', fontWeight: '500'}}>{item}</Text>
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          style={styles.productSize}
          onPress={() => setChosenSize(index)}>
          <Text style={{color: 'black'}}>{item}</Text>
        </TouchableOpacity>
      );
    },
    [chosenSize],
  );

  const renderRating = React.useCallback(() => {
    if (!productDetail) return <></>;
    const listStars = [];
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
        <Text style={{color: colors.black, marginLeft: 5}}>
          ({productDetail.quantity + 130} reviews)
        </Text>
      </View>
    );
  }, [productDetail]);

  const navigateToDetail = React.useCallback(
    id => () =>
      navigation.push(screenNames.detailScreen, {
        id,
      }),
    [],
  );

  const navigateToImageViewer = React.useCallback(() => {
    navigation.navigate(screenNames.imageViewerScreen, {
      uri: productDetail.image,
    });
  }, [productDetail]);

  const addToCart = React.useCallback(() => {
    if (!productDetail) return;
    const {id, name, price, image, size} = productDetail;
    dispatch(
      addToCartAction({
        id,
        image,
        name,
        price,
        quantity,
        size: size[chosenSize],
        maximumQuantity: productDetail.quantity,
      }),
    );
    ToastAndroid.show('Added to your cart', ToastAndroid.SHORT);
  }, [quantity, productDetail, chosenSize]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={[styles.blockContainer, styles.header, styles.mb10]}>
        <TouchableOpacity style={{marginRight: 15}} onPress={goBack}>
          <AntDesign name="arrowleft" size={30} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => navigation.navigate(screenNames.searchScreen)}>
          <SearchBar editable={false} />
        </TouchableOpacity>
      </View>
      {/* End Search Bar */}
      {productDetail && (
        <ScrollView>
          {/* Product Image */}
          <TouchableOpacity
            style={[styles.blockContainer, styles.mb10]}
            onPress={navigateToImageViewer}>
            {renderHeart()}
            <Image source={{uri: productDetail.image}} style={styles.image} />
          </TouchableOpacity>
          {/* End Product Image */}
          {/* Product Detail */}
          <View
            style={[styles.blockContainer, styles.mb10, styles.productDetail]}>
            <View style={styles.productDetailTop}>
              <View style={{flex: 2}}>
                <Text style={styles.title}>{productDetail.name}</Text>
                <View>{renderRating()}</View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${productDetail.price}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.shortDesc}>
                {productDetail.shortDescription}
              </Text>
              {!productDetail.name.startsWith('Adidas') && (
                <View style={{height: 30}} />
              )}
              <View style={[styles.productSizeContainer, styles.mb10]}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.itemLabel}>Size: </Text>
                </View>
                <FlatList
                  horizontal
                  data={productDetail.size}
                  keyExtractor={item => item}
                  renderItem={renderProductSize}
                  ItemSeparatorComponent={() => <View style={{width: 15}} />}
                />
              </View>
              <View style={styles.quantityContainer}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.itemLabel}>Quantity: </Text>
                </View>
                <View style={{flex: 1}}>
                  <Quantity
                    quantity={quantity}
                    incrementQuantity={() => setQuantity(quantity + 1)}
                    decrementQuantity={() => setQuantity(quantity - 1)}
                    maximum={productDetail.quantity}
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.btnAddToCart} onPress={addToCart}>
                <Text style={styles.textAddToCart}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* End Product Detail */}
          {/* More Details */}
          <View
            style={[
              styles.blockContainer,
              styles.mb20,
              styles.productExtraDetail,
            ]}>
            <Text style={[styles.subTitle, styles.mb10]}>More details</Text>
            <Text>
              <Text style={styles.smallTitle}>Status: </Text>
              <Text style={styles.greenText}>
                In Stock ({productDetail.quantity} available in nearby stores)
              </Text>
            </Text>
            <Text style={styles.blackText}>
              <Text style={styles.smallTitle}>Brand: </Text>
              {productDetail.name.split(' ')[0]}
            </Text>
            <Text style={styles.smallTitle}>Product description: </Text>
            <Text style={{color: 'black'}}>{productDetail.description}</Text>
          </View>
          {/* End More Details */}
          {/* Similar products */}
          <Text style={[styles.subTitle, styles.mb10, {marginLeft: 10}]}>
            Similar products
          </Text>
          <FlatList
            horizontal
            data={productDetail.relatedProducts}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Product product={item} navigate={navigateToDetail(item.id)} />
            )}
            ItemSeparatorComponent={() => <View style={{width: 5}} />}
            style={styles.mb10}
          />
          {/* End Similar products */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DetailScreen;

const screenPadding = 10;
const styles = StyleSheet.create({
  container: {
    padding: screenPadding,
    backgroundColor: colors.background,
    flex: 1,
  },
  blockContainer: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderRadius: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 5,
    // justifyContent: 'space-between',
  },
  image: {
    height: screenHeight / 4,
    width: screenWidth - 2 * screenPadding,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  heartIcon: {
    display: 'flex',
    alignItems: 'flex-end',
    marginRight: 2 * screenPadding,
  },
  productDetail: {
    paddingHorizontal: 20,
  },
  productDetailTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    color: colors.black,
    fontSize: 25,
    fontWeight: '700',
  },
  subTitle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '500',
  },
  smallTitle: {
    color: colors.black,
    fontWeight: '600',
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  price: {
    color: colors.black,
    fontSize: 23,
    fontWeight: '500',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  shortDesc: {
    color: colors.black,
  },
  productSizeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  productSize: {
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
  chosenProductSize: {
    backgroundColor: colors.focused,
  },
  quantityContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  itemLabel: {
    fontSize: 18,
    color: colors.black,
    marginRight: 10,
  },
  btnAddToCart: {
    width: screenWidth - 60,
    backgroundColor: colors.focused,
    paddingVertical: 13,
    borderRadius: 10,
  },
  textAddToCart: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '500',
  },
  productExtraDetail: {
    paddingHorizontal: 20,
  },
  greenText: {
    color: '#4BB543',
  },
  blackText: {
    color: '#000',
  },
});
