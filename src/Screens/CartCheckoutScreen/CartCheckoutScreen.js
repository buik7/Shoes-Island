import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeCartEmptyAction} from '../../Redux/actions/cartAction';
import {stackNames} from '../../Navigation/constants/stackNames';
import {screenNames} from '../../Navigation/constants/screenNames';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../Themes/colors';
import {screenWidth} from '../../Utils/Dimensions';

const CartCheckoutScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {cart} = useSelector(state => state.cartReducer);

  React.useEffect(() => {
    return () => {
      dispatch(makeCartEmptyAction());
    };
  }, []);

  const goToHome = React.useCallback(() => {
    navigation.pop();
    navigation.navigate(stackNames.homeStack, {
      screen: screenNames.homeScreen,
    });
  }, []);

  const goToProfile = React.useCallback(() => {
    navigation.pop();
    navigation.navigate(stackNames.userStack);
  }, []);

  const renderOrderSummary = () => {
    let totalPrice = 0;
    for (let item of cart) {
      totalPrice += item.quantity * item.price;
    }

    const header = (
      <View style={styles.productContainer(false)}>
        <Text style={styles.headerFirstCol}>Products</Text>
        <Text style={styles.headerSecondCol}>Quantity</Text>
        <Text style={styles.headerThirdCol}>Price</Text>
      </View>
    );

    const items = cart.map((item, index) => {
      return (
        <View style={styles.productContainer(index % 2 === 0)} key={item.id}>
          <Text style={styles.productName}>
            {item.name} ({item.size})
          </Text>
          <Text style={styles.productQuantity}>{item.quantity}</Text>
          <Text style={styles.productPrice}>${item.price * item.quantity}</Text>
        </View>
      );
    });

    const footer = (
      <View style={styles.productContainer(cart.length % 2 === 0)}>
        <Text style={styles.footerFirstCol}>Total</Text>
        <Text style={styles.footerSecondCol}>${totalPrice}</Text>
      </View>
    );

    return (
      <>
        {header}
        {items}
        {footer}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <AntDesign name="checkcircleo" size={40} color={colors.success} />
        <Text style={styles.titleText}>Your order was confirmed!</Text>
      </View>
      <ScrollView style={styles.orderSummaryContainer}>
        <Text style={styles.orderSummaryTitle}>Order summary</Text>
        {renderOrderSummary()}
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary, styles.mv15]}
          onPress={goToHome}>
          <Text style={styles.btnText}>Continue Shopping</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary]}
          onPress={goToProfile}>
          <Text style={styles.btnText}>View my profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartCheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: colors.background,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: colors.success,
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    width: screenWidth - 60,
    paddingVertical: 13,
    borderRadius: 10,
  },
  btnPrimary: {
    backgroundColor: colors.focused,
  },
  btnSecondary: {
    backgroundColor: '#61A4BC',
  },
  btnText: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '500',
  },
  mv15: {
    marginVertical: 15,
  },
  orderSummaryContainer: {
    marginTop: 20,
  },
  orderSummaryTitle: {
    color: colors.black,
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 15,
  },
  productContainer: isEven => ({
    backgroundColor: isEven ? colors.background : colors.white,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 18,
  }),
  productName: {
    color: colors.black,
    flex: 3,
    fontSize: 15,
    fontWeight: '400',
  },
  productQuantity: {
    color: colors.black,
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  productPrice: {
    color: colors.black,
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
  },
  headerFirstCol: {
    flex: 3,
    color: colors.black,
    fontSize: 15,
    fontWeight: '700',
  },
  headerSecondCol: {
    flex: 1,
    color: colors.black,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '700',
  },
  headerThirdCol: {
    flex: 1,
    fontSize: 15,
    color: colors.black,
    marginLeft: 10,
    fontWeight: '700',
  },
  footerFirstCol: {
    flex: 4,
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
  },
  footerSecondCol: {
    flex: 1,
    fontSize: 20,
    color: colors.black,
    fontWeight: '700',
  },
});
