import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Logo from '../../Static/Logo/SS-logos_transparent.png';
import FormInput from '../../Components/FormInput/FormInput';
import {colors} from '../../Themes/colors';
import Feather from 'react-native-vector-icons/Feather';
import {screenWidth} from '../../Utils/Dimensions';
import * as yup from 'yup';
import {Formik} from 'formik';
import {screenNames} from '../../Navigation/constants/screenNames';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {STATUS_CODE} from '../../Services/constants';
import {signUpThunk} from '../../Redux/thunks/authThunk';

const initialValues = {
  email: '',
  password: '',
  name: '',
  phone: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your email')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(6, 'Please enter a password with minimum 6 characters')
    .max(32, 'Please enter a password with maximum 32 characters'),
  name: yup.string().required('Please enter your name'),
  phone: yup.string().required('Please enter your phone number'),
});

const SignUpScreen = ({navigation}) => {
  const [keyboardIsOn, setKeyboardStatus] = React.useState(false);
  const dispatch = useDispatch();

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

  const renderIntro = React.useCallback(() => {
    if (keyboardIsOn) return <></>;
    return (
      <>
        <View style={styles.imageContainer}>
          <Image source={Logo} style={styles.image} />
        </View>
        <Text style={styles.title}>Create a new account</Text>
      </>
    );
  }, [keyboardIsOn]);

  const goToSignIn = React.useCallback(() => {
    navigation.navigate(screenNames.signInScreen);
  }, []);

  const onSuccessRegistration = React.useCallback(() => {
    ToastAndroid.show(
      `Your account was successfully created. Please log in again`,
      ToastAndroid.LONG,
    );
    goToSignIn();
  }, [goToSignIn]);

  const onFailureRegistration = React.useCallback(status => {
    if (status === STATUS_CODE.BAD_REQUEST) {
      Alert.alert(
        'Error',
        'There is already an account associated with this email.',
      );
    } else {
      Alert.alert('Error', 'An unexpected error has occured. Please try again');
    }
  }, []);

  const onSubmit = React.useCallback(
    values => {
      dispatch(
        signUpThunk(values, onSuccessRegistration, onFailureRegistration),
      );
    },
    [onSuccessRegistration],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {formik => (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.navigationIcon} onPress={goToSignIn}>
            <AntDesign name="arrowleft" size={30} color={colors.black} />
          </TouchableOpacity>
          {renderIntro()}
          <View style={styles.form}>
            <FormInput
              placeholder={'Enter your email'}
              icon={<Feather name="mail" size={20} color="black" />}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              error={formik.touched.email ? formik.errors.email : ''}
            />
            <FormInput
              placeholder={'Enter your password'}
              icon={<Feather name="key" size={20} color="black" />}
              secureTextEntry
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              error={formik.touched.password ? formik.errors.password : ''}
            />
            <FormInput
              placeholder={'Enter your name'}
              icon={<Feather name="user" size={20} color="black" />}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              value={formik.values.name}
              error={formik.touched.name ? formik.errors.name : ''}
            />
            <FormInput
              placeholder={'Enter your phone number'}
              icon={<Feather name="phone" size={20} color="black" />}
              onChangeText={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              value={formik.values.phone}
              error={formik.touched.phone ? formik.errors.phone : ''}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={formik.handleSubmit}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 20,
  },
  navigationIcon: {
    position: 'absolute',
    top: 10,
    left: 5,
  },
  imageContainer: {
    flex: 2,
  },
  image: {
    height: 200,
    width: 200,
    transform: [{scale: 1.5}],
  },
  title: {
    color: '#3f3848',
    flex: 1,
    fontWeight: 'bold',
    fontSize: 25,
  },
  subTitle: {
    color: '#3f3848',
    flex: 1,
    fontSize: 20,
  },
  form: {
    flex: 4,
  },
  btn: {
    width: screenWidth - 60,
    backgroundColor: colors.focused,
    paddingVertical: 13,
    borderRadius: 10,
    marginBottom: 20,
  },
  btnText: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '500',
  },
});
