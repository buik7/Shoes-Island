import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {screenNames} from '../../Navigation/constants/screenNames';
import {colors} from '../../Themes/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';
import * as yup from 'yup';
import FormInputWithLabel from '../../Components/FormInputWithLabel/FormInputWithLabel';
import Feather from 'react-native-vector-icons/Feather';
import {screenWidth} from '../../Utils/Dimensions';
import {updateUserProfileThunk} from '../../Redux/thunks/userThunk';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your email')
    .email('Please enter a valid email'),
  name: yup.string().required('Please enter your name'),
  phone: yup.string().required('Please enter your phone number'),
});

const UserUpdateScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {userProfile} = useSelector(state => state.userReducer);
  const [keyboardIsOn, setKeyboardStatus] = React.useState(false);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const initialValues = {
    email: userProfile.email,
    name: userProfile.name,
    phone: userProfile.phone,
  };

  const onUpdateConfirmation = values => {
    const onSuccess = () => {
      ToastAndroid.show(
        'Your profile was updated successfully',
        ToastAndroid.SHORT,
      );
      navigation.navigate(screenNames.userProfileScreen);
    };

    const onFailure = () => {
      Alert.alert(
        'Error',
        'An unexpected error has occurred while updating your profile. Please try again',
      );
    };

    dispatch(updateUserProfileThunk(values, onSuccess, onFailure));
  };

  const navigateToUserAvatar = () => {
    navigation.navigate(screenNames.userAvatarScreen);
  };

  const navigateToUserUpdatePassword = () => {
    navigation.navigate(screenNames.userUpdatePasswordScreen);
  };

  const renderHeaderAndAvatar = onSubmit => {
    const header = (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerCancelIcon}
          onPress={navigation.goBack}>
          <AntDesign name="close" size={30} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit profile</Text>
        <TouchableOpacity style={styles.headerConfirmIcon} onPress={onSubmit}>
          <AntDesign name="check" size={30} color={colors.focused} />
        </TouchableOpacity>
      </View>
    );

    const avatar = (
      <View style={styles.avatarContainer}>
        <Image source={{uri: userProfile.avatar}} style={styles.avatar} />
        <TouchableOpacity
          style={styles.avatarChange}
          onPress={navigateToUserAvatar}>
          <Text style={styles.avatarChangeText}>Change profile photo</Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <>
        {header}
        {!keyboardIsOn && avatar}
      </>
    );
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onUpdateConfirmation}
      validationSchema={validationSchema}>
      {formik => (
        <SafeAreaView style={styles.container}>
          {renderHeaderAndAvatar(formik.handleSubmit)}
          <ScrollView contentContainerStyle={{paddingBottom: 50}}>
            <View style={styles.form}>
              <FormInputWithLabel
                label={'Email'}
                placeholder={'Enter your email'}
                icon={<Feather name="mail" size={25} color="black" />}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                error={formik.touched.email ? formik.errors.email : ''}
                editable={false}
              />
              <FormInputWithLabel
                label={'Full name'}
                placeholder={'Enter your name'}
                icon={<Feather name="user" size={25} color="black" />}
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                value={formik.values.name}
                error={formik.touched.name ? formik.errors.name : ''}
              />
              <FormInputWithLabel
                label={'Phone number'}
                placeholder={'Enter your phone number'}
                icon={<Feather name="phone" size={25} color="black" />}
                onChangeText={formik.handleChange('phone')}
                onBlur={formik.handleBlur('phone')}
                value={formik.values.phone}
                error={formik.touched.phone ? formik.errors.phone : ''}
              />
            </View>
            <Text style={styles.note}>
              <Text style={styles.textBold}>Note</Text>: If you no longer have
              access to your email address, please contact us at{' '}
              <Text style={styles.textBold}>support@shoes.com</Text>
            </Text>
            <TouchableOpacity
              style={styles.btnSecondary}
              onPress={navigateToUserUpdatePassword}>
              <Text style={styles.btnSecondaryText}>Change password</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default UserUpdateScreen;

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
  headerConfirmIcon: {},
  avatarContainer: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  avatarChange: {
    marginTop: 8,
    marginBottom: 20,
  },
  avatarChangeText: {
    fontSize: 18,
    color: colors.focused,
  },
  form: {
    marginTop: 20,
    marginLeft: 15,
  },
  note: {
    color: colors.black,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  textBold: {
    fontWeight: '500',
  },
  btnSecondary: {
    width: screenWidth - 2 * 20 - 10,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.focused,
    backgroundColor: colors.white,
    marginLeft: 10,
  },
  btnSecondaryText: {
    fontWeight: '500',
    textAlign: 'center',
    color: colors.focused,
  },
});
