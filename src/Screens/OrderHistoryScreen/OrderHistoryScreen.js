import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {screenNames} from '../../Navigation/constants/screenNames';
import {colors} from '../../Themes/colors';
import {stackNames} from '../../Navigation/constants/stackNames';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchBar from '../../Components/SearchBar/SearchBar';
import {useSelector} from 'react-redux';
import Product from '../../Components/Product/Product';
import {screenWidth} from '../../Utils/Dimensions';
import {printDate} from '../../Utils/Dates';

const OrderHistoryScreen = ({navigation}) => {
  const {userProfile} = useSelector(state => state.userReducer);
  const {productList} = useSelector(state => state.productReducer);

  const navigateToProductDetail = itemAlias => {
    const selectedProduct = productList.find(item => item.alias === itemAlias);
    if (selectedProduct) {
      navigation.navigate(stackNames.homeStack);
      navigation.navigate(screenNames.detailScreen, {id: selectedProduct.id});
    }
  };

  const renderOrderHistory = () => {
    if (!userProfile) return <></>;
    const {ordersHistory} = userProfile;

    if (ordersHistory.length === 0) {
      return (
        <>
          <Text style={[styles.emptyOrderHistoryText, styles.mb10]}>
            You have not purchased any product.
          </Text>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() =>
              navigation.navigate(stackNames.homeStack, {
                screen: screenNames.homeScreen,
              })
            }>
            <Text style={styles.btnPrimaryText}>Start Shopping Now</Text>
          </TouchableOpacity>
        </>
      );
    }

    return [...ordersHistory].reverse().map(order => (
      <View style={styles.orderContainer} key={order.id}>
        <View style={styles.orderTop}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderDate}>{printDate(order.date)}</Text>
        </View>
        <FlatList
          horizontal
          data={order.orderDetail}
          keyExtractor={product => product.alias}
          renderItem={({item}) => (
            <Product
              product={item}
              navigate={() => navigateToProductDetail(item.alias)}
            />
          )}
        />
        <View style={styles.line} />
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.blockContainer, styles.header, styles.mb10]}>
        <TouchableOpacity style={{marginRight: 15}} onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={30} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() =>
            navigation.navigate(stackNames.homeStack, {
              screen: screenNames.searchScreen,
            })
          }>
          <SearchBar editable={false} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <Text style={styles.title}>Your Order History</Text>
        {renderOrderHistory()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;

const screenPadding = 10;
const styles = StyleSheet.create({
  container: {
    padding: screenPadding,
    color: colors.black,
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
  },
  title: {
    fontWeight: '700',
    color: colors.black,
    fontSize: 25,
    marginBottom: 15,
  },
  mb10: {
    marginBottom: 10,
  },
  btnPrimary: {
    width: screenWidth - 2 * screenPadding,
    backgroundColor: colors.focused,
    paddingVertical: 13,
    borderRadius: 10,
  },
  btnPrimaryText: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
  },
  emptyOrderHistoryText: {
    color: colors.black,
    fontSize: 15,
  },
  orderContainer: {
    marginBottom: 10,
  },
  orderTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  orderId: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
  },
  orderDate: {
    color: colors.black,
    fontSize: 15,
  },
  line: {
    marginTop: 15,
    width: screenWidth - 2 * screenPadding,
    backgroundColor: '#C0C0C0',
    height: 0.7,
  },
});
