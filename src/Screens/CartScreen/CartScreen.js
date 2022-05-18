import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {screenWidth} from '../../Utils/Dimensions';
import {colors} from '../../Themes/colors';
import Quantity from '../../Components/Quantity/Quantity';
import {
  decrementQuantityInCartAction,
  incrementQuantityInCartAction,
  removeFromCartAction,
} from '../../Redux/actions/cartAction';
import Feather from 'react-native-vector-icons/Feather';
import {screenNames} from '../../Navigation/constants/screenNames';
import {stackNames} from '../../Navigation/constants/stackNames';
import {orderProductsThunk} from '../../Redux/thunks/orderThunk';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {cart} = useSelector(state => state.cartReducer);
  const {user} = useSelector(state => state.userReducer);
  const cartIsEmpty = cart.length === 0;

  const incrementQuantity = React.useCallback(item => {
    dispatch(incrementQuantityInCartAction(item));
  }, []);

  const decrementQuantity = React.useCallback(item => {
    dispatch(decrementQuantityInCartAction(item));
  }, []);

  const removeItemFromCart = React.useCallback(item => {
    dispatch(removeFromCartAction(item));
    ToastAndroid.show(`Removed ${item.name}`, ToastAndroid.SHORT);
  }, []);

  const renderNumberOfItems = () => {
    const l = cart.length;
    if (l <= 1) return `${l} item`;
    return `${l} items`;
  };

  const renderAllProducts = () => {
    if (cart.length === 0) {
      return (
        <View style={styles.emptyCartContainer}>
          <Image
            source={{
              uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.AN24bQnH03EndeWckS0LaQHaGv%26pid%3DApi&f=1',
            }}
            style={styles.emptyCartImage}
          />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      );
    }

    return cart.map(item => (
      <View style={styles.productContainer} key={item.id}>
        <Image style={styles.productImage} source={{uri: item.image}} />
        <View style={styles.productSecondCol}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productSize}>Size: {item.size}</Text>

          <Quantity
            quantity={item.quantity}
            incrementQuantity={() => incrementQuantity(item)}
            decrementQuantity={() => decrementQuantity(item)}
            maximum={item.maximumQuantity}
          />
        </View>
        <View style={styles.productThirdCol}>
          <TouchableOpacity
            style={styles.removeIcon}
            onPress={() => removeItemFromCart(item)}>
            <Feather name="x" size={20} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </View>
    ));
  };

  const getTotalPrice = () => {
    let total = 0;
    for (let item of cart) {
      total += item.quantity * item.price;
    }
    return total;
  };

  const onCheckoutSuccess = () => {
    navigation.navigate(screenNames.cartCheckoutScreen);
  };

  const onCheckoutFailure = () => {
    Alert.alert('Error', 'An unexpected error has occured. Please try again.');
  };

  const checkOut = () => {
    if (!user) {
      navigation.navigate(stackNames.authStack);
      return;
    }
    const orderDetail = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    dispatch(
      orderProductsThunk(
        {email: user.email, orderDetail},
        onCheckoutSuccess,
        onCheckoutFailure,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Your Cart ({renderNumberOfItems()})
        </Text>
      </View>
      <ScrollView>{renderAllProducts()}</ScrollView>
      <TouchableOpacity
        style={styles.checkOutBtn(cartIsEmpty)}
        disabled={cartIsEmpty}
        onPress={checkOut}>
        <Text style={styles.checkOutBtnText}>
          Proceed to checkout{' '}
          <Text style={styles.checkOutBtnPriceText}>(${getTotalPrice()})</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
  normalText: {
    color: colors.black,
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontWeight: '800',
    fontSize: 20,
    color: '#484445',
  },
  emptyCartContainer: {
    paddingLeft: screenWidth / 2 - 120,
  },
  emptyCartImage: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  emptyCartText: {
    fontSize: 20,
    color: colors.black,
    fontWeight: '500',
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    flex: 3,
    alignItems: 'center',
  },
  productSecondCol: {
    flex: 6,
    padding: 10,
  },
  productThirdCol: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  removeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  productName: {
    color: colors.black,
    fontWeight: '600',
  },
  productSize: {
    marginBottom: 10,
    color: colors.black,
  },
  productPrice: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 20,
  },
  checkOutBtn: disabled => ({
    width: screenWidth - 40,
    backgroundColor: disabled ? colors.focusedBlur : colors.focused,
    paddingVertical: 13,
    borderRadius: 10,
  }),
  checkOutBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
  },
  checkOutBtnPriceText: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
