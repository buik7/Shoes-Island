import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screenNames} from '../../constants/screenNames';
import SignInScreen from '../../../Screens/SignInScreen/SignInScreen';
import SignUpScreen from '../../../Screens/SignUpScreen/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = ({route}) => {
  const title =
    route.params && route.params.title
      ? route.params.title
      : 'Welcome to Shoes Shop';
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={screenNames.signInScreen}
        component={SignInScreen}
        initialParams={{title}}
      />
      <Stack.Screen name={screenNames.signUpScreen} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
