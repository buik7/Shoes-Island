import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ImageViewerScreen from '../Screens/ImageViewerScreen/ImageViewerScreen';
import {screenNames} from './constants/screenNames';
import {stackNames} from './constants/stackNames';
import {tabNames} from './constants/tabNames';
import AuthStack from './RootStack/AuthStack/AuthStack';
import MainTab from './RootStack/MainTab/MainTab';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={tabNames.mainTab} component={MainTab} />
      <Stack.Screen
        name={screenNames.imageViewerScreen}
        component={ImageViewerScreen}
        initialParams={{uri: ''}}
      />
      {/* <Stack.Screen
        name={stackNames.authStack}
        component={AuthStack}
        initialParams={{title: 'Login to save favourite products'}}
      /> */}
    </Stack.Navigator>
  );
};

export default RootNavigation;
