import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screenNames} from '../../../constants/screenNames';
import UserProfileScreen from '../../../../Screens/UserProfileScreen/UserProfileScreen';
import UserAvatarScreen from '../../../../Screens/UserAvatarScreen/UserAvatarScreen';
import UserUpdateScreen from '../../../../Screens/UserUpdateScreen/UserUpdateScreen';
import {useSelector} from 'react-redux';
import AuthStack from '../../AuthStack/AuthStack';
import {stackNames} from '../../../constants/stackNames';
import OrderHistoryScreen from '../../../../Screens/OrderHistoryScreen/OrderHistoryScreen';
import UserUpdatePasswordScreen from '../../../../Screens/UserUpdatePasswordScreen/UserUpdatePasswordScreen';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  const {user} = useSelector(state => state.userReducer);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Screen
            name={screenNames.userProfileScreen}
            component={UserProfileScreen}
          />
          <Stack.Screen
            name={screenNames.userAvatarScreen}
            component={UserAvatarScreen}
          />
          <Stack.Screen
            name={screenNames.userUpdateScreen}
            component={UserUpdateScreen}
          />
          <Stack.Screen
            name={screenNames.orderHistoryScreen}
            component={OrderHistoryScreen}
          />
          <Stack.Screen
            name={screenNames.userUpdatePasswordScreen}
            component={UserUpdatePasswordScreen}
          />
        </>
      ) : (
        <Stack.Screen
          name={stackNames.authStack}
          component={AuthStack}
          initialParams={{title: 'Welcome to Shoes Shop'}}
        />
      )}
    </Stack.Navigator>
  );
};

export default UserStack;
