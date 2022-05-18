import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {stackNames} from '../../constants/stackNames';
import HomeStack from './Children/HomeStack';
import FavouriteStack from './Children/FavouriteStack';
import CartStack from './Children/CartStack';
import UserStack from './Children/UserStack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../Themes/colors';
import {useSelector} from 'react-redux';

const BottomTab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: colors.footer_background,
    borderTopColor: colors.footer_background,
  },
  tabBarActiveTintColor: colors.focused,
  tabBarInactiveTintColor: 'gray',
  tabBarIcon: ({focused, color, size}) => {
    let iconName;
    switch (route.name) {
      case stackNames.homeStack:
        iconName = 'home';
        break;
      case stackNames.cartStack:
        iconName = 'shoppingcart';
        break;
      case stackNames.favouriteStack:
        iconName = focused ? 'heart' : 'hearto';
        break;
      case stackNames.userStack:
        iconName = 'user';
        break;
    }
    return <AntDesign name={iconName} size={size} color={color} />;
  },
});

const MainTab = () => {
  const {cart} = useSelector(state => state.cartReducer);
  return (
    <BottomTab.Navigator screenOptions={screenOptions}>
      <BottomTab.Screen name={stackNames.homeStack} component={HomeStack} />
      <BottomTab.Screen
        name={stackNames.favouriteStack}
        component={FavouriteStack}
      />
      <BottomTab.Screen
        name={stackNames.cartStack}
        component={CartStack}
        options={{
          tabBarBadge: cart.length > 0 ? cart.length : null,
          tabBarBadgeStyle: {
            color: colors.white,
            fontWeight: '700',
          },
        }}
      />
      <BottomTab.Screen name={stackNames.userStack} component={UserStack} />
    </BottomTab.Navigator>
  );
};

export default MainTab;
