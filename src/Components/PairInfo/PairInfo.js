import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../Themes/colors';
import {screenWidth} from '../../Utils/Dimensions';

const PairInfo = ({label, value, marginTop}) => {
  return (
    <View style={{marginTop}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

export default PairInfo;

const styles = StyleSheet.create({
  label: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: colors.black,
    fontWeight: '500',
    textAlign: 'right',
  },
  line: {
    marginTop: 10,
    width: screenWidth - 40,
    backgroundColor: '#C0C0C0',
    height: 0.7,
  },
});
