import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screenNames} from '../../../constants/screenNames';
import DetailScreen from '../../../../Screens/DetailScreen/DetailScreen';
import HomeScreen from '../../../../Screens/HomeScreen/HomeScreen';
import SearchScreen from '../../../../Screens/SearchScreen/SearchScreen';
import {useSelector} from 'react-redux';
import {stackNames} from '../../../constants/stackNames';
import AuthStack from '../../AuthStack/AuthStack';
import StoreDetailScreen from '../../../../Screens/StoreDetailScreen/StoreDetailScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const {user} = useSelector(state => state.userReducer);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={screenNames.homeScreen}>
      {!user && (
        <Stack.Screen
          name={stackNames.authStack}
          component={AuthStack}
          initialParams={{title: 'Login to save favourite products'}}
        />
      )}

      <Stack.Screen name={screenNames.homeScreen} component={HomeScreen} />
      <Stack.Screen name={screenNames.searchScreen} component={SearchScreen} />
      <Stack.Screen name={screenNames.detailScreen} component={DetailScreen} />
      <Stack.Screen
        name={screenNames.storeDetailScreen}
        component={StoreDetailScreen}
        initialParams={{id: 1}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
