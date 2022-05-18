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

const FormInputWithLabel = props => {
  const {placeholder, error, secureTextEntry, icon, label, editable} = props;
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
      <View
        style={[
          styles.container,
          containsError && styles.errorContainer,
          editable === false && styles.disabled,
        ]}>
        <View style={styles.icon}>{icon}</View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={'black'}
            {...props}
            style={styles.input}
            secureTextEntry={hidePassword}
          />
          <View style={styles.line} />
        </View>
        {renderPasswordIcon()}
      </View>
      {containsError && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default React.memo(FormInputWithLabel);

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
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginLeft: 15,
  },
  label: {
    margin: 0,
    color: colors.black,
    paddingHorizontal: 20,
  },
  line: {
    // width: '80%',
    // backgroundColor: '#C0C0C0',
    // height: 0.7,
    // marginLeft: 20,
  },
  disabled: {
    backgroundColor: '#d3d3d3',
  },
});
