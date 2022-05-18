import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import Logo from '../../Static/Logo/SS-logos_transparent.png';
import FormInput from '../../Components/FormInput/FormInput';
import {colors} from '../../Themes/colors';
import Feather from 'react-native-vector-icons/Feather';
import {screenWidth} from '../../Utils/Dimensions';
// import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {signInThunk} from '../../Redux/thunks/authThunk';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import {screenNames} from '../../Navigation/constants/screenNames';
import * as yup from 'yup';
import {STATUS_CODE} from '../../Services/constants';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your email')
    .email('Please enter a valid email'),
  password: yup.string().required('Please enter your password'),
});

const SignInScreen = ({navigation, route}) => {
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

  const goToSignUp = React.useCallback(() => {
    navigation.navigate(screenNames.signUpScreen);
  }, []);

  const onSuccessLogin = React.useCallback(() => {}, []);

  const onFailureLogin = React.useCallback(status => {
    if (
      status === STATUS_CODE.NOT_FOUND ||
      status === STATUS_CODE.BAD_REQUEST
    ) {
      Alert.alert(
        'Error',
        'Your email address or password is not correct. Please try again',
      );
    } else {
      Alert.alert('Error', 'An unexpected error has occured. Please try again');
    }
  }, []);

  const onSubmit = React.useCallback(values => {
    dispatch(signInThunk(values, onSuccessLogin, onFailureLogin));
  }, []);

  const renderIntro = React.useCallback(() => {
    if (keyboardIsOn) return <></>;
    return (
      <>
        <View style={styles.imageContainer}>
          <Image source={Logo} style={styles.image} />
        </View>
        <Text style={styles.title}>
          {route.params.title ? route.params.title : 'Welcome to Shoes Shop'}
        </Text>
      </>
    );
  }, [keyboardIsOn]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {formik => (
        <SafeAreaView style={styles.container}>
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
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={formik.handleSubmit}>
              <Text style={styles.btnText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.externalLoginTextContainer}>
            <View style={{flex: 1, height: 1}} />
            <View style={{flex: 2, height: 1.1, backgroundColor: '#cad3dc'}} />
            <Text style={styles.externalLoginText}>Or continue with</Text>
            <View style={{flex: 2, height: 1.1, backgroundColor: '#cad3dc'}} />
            <View style={{flex: 1, height: 1}} />
          </View>
          <View style={styles.externalLoginContainer}>
            <View style={styles.loginBtn}>
              <LoginButton
                onLoginFinished={(error, result) => {
                  if (error) {
                    console.log('login has error: ' + result.error);
                  } else if (result.isCancelled) {
                    console.log('login is cancelled.');
                  } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                      console.log(data.accessToken.toString());
                    });
                  }
                }}
                onLogoutFinished={() => console.log('logout.')}
              />
            </View>
          </View> */}
          <View style={styles.redirectToSignUpContainer}>
            <Text style={styles.redirectToSignUpText}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={goToSignUp}>
              <Text style={styles.redirectToSignUpLink}> Sign up now</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 20,
  },
  imageContainer: {
    flex: 2,
    paddingBottom: 20,
  },
  image: {
    height: 175,
    width: 175,
    transform: [{scale: 1.5}],
  },
  title: {
    color: '#3f3848',
    flex: 1,
    fontWeight: 'bold',
    fontSize: 25,
    padding: 20,
    textAlign: 'center',
  },
  subTitle: {
    color: '#3f3848',
    flex: 1,
    fontSize: 20,
  },
  form: {
    flex: 2,
    marginVertical: 20,
  },
  btnContainer: {
    marginTop: 60,
    flex: 1,
  },
  btn: {
    width: screenWidth - 60,
    backgroundColor: colors.focused,
    paddingVertical: 13,
    borderRadius: 10,
    marginBottom: 20,
    height: 50,
  },
  btnText: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '500',
  },
  externalLoginContainer: {
    flex: 1,
  },
  externalLoginTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  externalLoginText: {
    color: colors.black,
    letterSpacing: 1,
    marginHorizontal: 10,
  },
  redirectToSignUpContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  redirectToSignUpText: {
    color: colors.black,
  },
  redirectToSignUpLink: {
    color: colors.focused,
  },
});
