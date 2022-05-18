import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screenNames} from '../../../constants/screenNames';
import DetailScreen from '../../../../Screens/DetailScreen/DetailScreen';
import FavouriteScreen from '../../../../Screens/FavouriteScreen/FavouriteScreen';
import {useSelector} from 'react-redux';
import {stackNames} from '../../../constants/stackNames';
import AuthStack from '../../AuthStack/AuthStack';
import SearchScreen from '../../../../Screens/SearchScreen/SearchScreen';

const Stack = createNativeStackNavigator();

const FavouriteStack = () => {
  const {user} = useSelector(state => state.userReducer);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Screen
            name={screenNames.favouriteScreen}
            component={FavouriteScreen}
          />
          <Stack.Screen
            name={screenNames.detailScreen}
            component={DetailScreen}
          />
          <Stack.Screen
            name={screenNames.searchScreen}
            component={SearchScreen}
          />
        </>
      ) : (
        <Stack.Screen
          name={stackNames.authStack}
          component={AuthStack}
          initialParams={{title: 'Login to save your favourite products'}}
        />
      )}
    </Stack.Navigator>
  );
};

export default FavouriteStack;
