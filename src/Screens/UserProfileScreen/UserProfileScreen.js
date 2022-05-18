import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {colors} from '../../Themes/colors';
import {getUserProfileThunk} from '../../Redux/thunks/userThunk';
import {useDispatch, useSelector} from 'react-redux';
import {screenWidth} from '../../Utils/Dimensions';
import Product from '../../Components/Product/Product';
import PairInfo from '../../Components/PairInfo/PairInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserInfoAction} from '../../Redux/actions/userAction';
import {stackNames} from '../../Navigation/constants/stackNames';
import {screenNames} from '../../Navigation/constants/screenNames';

const UserProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {userProfile} = useSelector(state => state.userReducer);
  const {productList} = useSelector(state => state.productReducer);

  React.useEffect(() => {
    dispatch(getUserProfileThunk);
  }, []);

  const navigateToProductDetail = itemAlias => {
    const selectedProduct = productList.find(item => item.alias === itemAlias);
    if (selectedProduct) {
      navigation.navigate(stackNames.homeStack);
      navigation.navigate(screenNames.detailScreen, {id: selectedProduct.id});
    }
  };

  const navigateToOrderHistory = () => {
    navigation.navigate(screenNames.orderHistoryScreen);
  };

  const renderOrderHistory = () => {
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

    const listProducts = [];
    for (let order of ordersHistory) {
      for (let product of order.orderDetail) {
        let index = listProducts.findIndex(
          ({alias}) => alias === product.alias,
        );
        if (index === -1) {
          listProducts.push(product);
        }
      }
    }

    return (
      <FlatList
        horizontal
        data={listProducts}
        keyExtractor={product => product.alias}
        renderItem={({item}) => (
          <Product
            product={item}
            navigate={() => navigateToProductDetail(item.alias)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{width: 5}} />}
      />
    );
  };

  const navigateToUpdateProfile = () => {
    navigation.navigate(screenNames.userUpdateScreen);
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('SHOES_SHOP_TOKEN');
      dispatch(setUserInfoAction(null));
      ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'An unexpected error has occured while logging you out. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Hello <Text style={styles.titleName}>{userProfile.name}</Text>,
        </Text>
        <View style={styles.line} />
        <View style={styles.orderHistoryContainer}>
          <View style={styles.orderHistoryTop}>
            <Text style={styles.orderHistoryTitle}>Your Orders</Text>
            <TouchableOpacity onPress={navigateToOrderHistory}>
              <Text style={styles.orderHistoryViewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          {renderOrderHistory()}
        </View>
        <View style={styles.line} />
        <View style={styles.profileContainer}>
          <View style={styles.profileTop}>
            <Text style={styles.profileTitle}>Account Information</Text>
            <Image
              source={{uri: userProfile.avatar}}
              style={styles.profileAvatar}
            />
          </View>

          <PairInfo label="Full name" value={userProfile.name} marginTop={20} />
          <PairInfo label="Email" value={userProfile.email} marginTop={15} />
          <PairInfo label="Phone" value={userProfile.phone} marginTop={15} />
          <PairInfo
            label="Points"
            value={userProfile.ordersHistory.length * 10}
            marginTop={15}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.btnPrimary, styles.mb10]}
            onPress={navigateToUpdateProfile}>
            <Text style={styles.btnPrimaryText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={logOut}>
            <Text style={styles.btnSecondaryText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const screenPadding = 20;
const styles = StyleSheet.create({
  container: {
    padding: screenPadding,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 25,
    color: colors.black,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  titleName: {
    fontWeight: 'bold',
  },
  line: {
    backgroundColor: 'gray',
    width: screenWidth - 2 * screenPadding,
    height: 0.8,
  },
  orderHistoryContainer: {
    marginTop: 15,
    marginBottom: 30,
  },
  emptyOrderHistoryText: {
    color: colors.black,
    fontSize: 15,
  },
  orderHistoryTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderHistoryTitle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '500',
  },
  orderHistoryViewAll: {
    color: colors.focused,
    fontSize: 15,
  },
  profileContainer: {
    marginVertical: 15,
  },
  profileTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileTitle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '500',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonContainer: {},
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
  btnSecondary: {
    width: screenWidth - 2 * screenPadding,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.focused,
    backgroundColor: colors.white,
  },
  btnSecondaryText: {
    fontWeight: '500',
    textAlign: 'center',
    color: colors.focused,
  },
  mb10: {
    marginBottom: 10,
  },
});
