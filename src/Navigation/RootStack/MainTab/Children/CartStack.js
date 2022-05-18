import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CartScreen from '../../../../Screens/CartScreen/CartScreen';
import CartCheckoutScreen from '../../../../Screens/CartCheckoutScreen/CartCheckoutScreen';
import DetailScreen from '../../../../Screens/DetailScreen/DetailScreen';
import {screenNames} from '../../../constants/screenNames';
import {stackNames} from '../../../constants/stackNames';
import AuthStack from '../../AuthStack/AuthStack';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const CartStack = () => {
  const {user} = useSelector(state => state.userReducer);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={screenNames.cartScreen}>
      {!user && (
        <Stack.Screen
          name={stackNames.authStack}
          component={AuthStack}
          initialParams={{title: 'Login to checkout your products'}}
        />
      )}
      <Stack.Screen name={screenNames.cartScreen} component={CartScreen} />
      <Stack.Screen
        name={screenNames.cartCheckoutScreen}
        component={CartCheckoutScreen}
      />
      <Stack.Screen name={screenNames.detailScreen} component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;
