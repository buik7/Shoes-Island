import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../Themes/colors';
import {screenWidth} from '../../Utils/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';

const FormInput = props => {
  const {placeholder, error, secureTextEntry, icon} = props;
  const [hidePassword, setHidePassword] = React.useState(secureTextEntry);
  const containsError = !!error;

  const renderPasswordIcon = React.useCallback(() => {
    if (!secureTextEntry) return <></>;
    const icon = hidePassword ? (
      <Entypo name="eye-with-line" size={16} color="black" />
    ) : (
      <Entypo name="eye" size={16} color="black" />
    );
    return (
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setHidePassword(!hidePassword)}>
        {icon}
      </TouchableOpacity>
    );
  }, [hidePassword, secureTextEntry]);

  return (
    <View style={{marginBottom: 20}}>
      <View style={[styles.container, containsError && styles.errorContainer]}>
        <View style={styles.icon}>{icon}</View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={'black'}
            {...props}
            style={styles.input}
            secureTextEntry={hidePassword}
          />
        </View>
        {renderPasswordIcon()}
      </View>
      {containsError && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default React.memo(FormInput);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    width: screenWidth - 60,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  errorContainer: {
    backgroundColor: '#f9c8c8',
  },
  icon: {
    flex: 1,
  },
  inputContainer: {
    flex: 10,
  },
  input: {
    paddingHorizontal: 20,
    letterSpacing: 0.5,
    color: colors.black,
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginLeft: 15,
  },
});
