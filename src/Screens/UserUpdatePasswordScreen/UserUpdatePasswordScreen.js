import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import React from 'react';
import {colors} from '../../Themes/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FormInputWithLabel from '../../Components/FormInputWithLabel/FormInputWithLabel';
import {screenWidth} from '../../Utils/Dimensions';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {updateUserPasswordThunk} from '../../Redux/thunks/userThunk';
import {setUserInfoAction} from '../../Redux/actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required('Please enter your current password'),
  newPassword: yup
    .string()
    .required('Please enter your new password')
    .min(6, 'Please enter a password with more than 6 characters')
    .max(32, 'Your password cannot exceed 32 characters'),
});

const UserUpdatePasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const onSubmit = values => {
    const onSuccess = async () => {
      ToastAndroid.show(
        'Your password was updated. Please sign in again',
        ToastAndroid.SHORT,
      );
      try {
        await AsyncStorage.removeItem('SHOES_SHOP_TOKEN');
        dispatch(setUserInfoAction(null));
      } catch (error) {
        console.log(error);
        Alert.alert(
          'An unexpected error has occured while logging you out. Please try again.',
        );
      }
    };

    const onFailure = () => {
      Alert.alert(
        'Error',
        'An unexpected error has occurred while updating your profile. Please try again',
      );
    };

    dispatch(
      updateUserPasswordThunk(
        {
          newPassword: values.newPassword,
        },
        onSuccess,
        onFailure,
      ),
    );
  };

  const initialValues = {
    currentPassword: '',
    newPassword: '',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerCancelIcon}
          onPress={navigation.goBack}>
          <AntDesign name="close" size={30} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Change password</Text>
      </View>
      <ScrollView>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {formik => (
            <View style={styles.form}>
              <FormInputWithLabel
                label={'Current password'}
                placeholder={'Enter your current password'}
                icon={<Feather name="key" size={25} color="black" />}
                secureTextEntry
                onChangeText={formik.handleChange('currentPassword')}
                onBlur={formik.handleBlur('currentPassword')}
                value={formik.values.currentPassword}
                error={
                  formik.touched.currentPassword
                    ? formik.errors.currentPassword
                    : ''
                }
              />
              <FormInputWithLabel
                label={'New password'}
                placeholder={'Enter your new password'}
                icon={<Feather name="lock" size={25} color="black" />}
                secureTextEntry
                onChangeText={formik.handleChange('newPassword')}
                onBlur={formik.handleBlur('newPassword')}
                value={formik.values.newPassword}
                error={
                  formik.touched.newPassword ? formik.errors.newPassword : ''
                }
              />
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={formik.handleSubmit}>
                <Text style={styles.btnPrimaryText}>Update password</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserUpdatePasswordScreen;

const screenHorizontalPadding = 20;
const screenVerticalPadding = 12;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: screenVerticalPadding,
    paddingHorizontal: screenHorizontalPadding,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCancelIcon: {
    marginRight: 20,
  },
  headerText: {
    color: colors.black,
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 30,
    marginLeft: 15,
  },
  btnPrimary: {
    width: screenWidth - 2 * screenHorizontalPadding - 20,
    backgroundColor: colors.focused,
    paddingVertical: 13,
    borderRadius: 10,
  },
  btnPrimaryText: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
  },
});
