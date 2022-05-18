import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../Themes/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const buttonSize = 35;

const Quantity = props => {
  const {quantity, incrementQuantity, decrementQuantity, maximum} = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.textBlack, styles.quantityText]}>{quantity}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button(quantity, 1)}
          onPress={decrementQuantity}
          disabled={quantity === 1}>
          <AntDesign
            name="minus"
            size={buttonSize / 2}
            color={quantity === 1 ? '#ada6a8' : 'black'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button(quantity, maximum)}
          onPress={incrementQuantity}
          disabled={quantity === maximum}>
          <AntDesign
            name="plus"
            size={buttonSize / 2}
            color={quantity === maximum ? '#ada6a8' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(Quantity);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: '#e7eaf3',
  },
  textBlack: {
    color: colors.black,
  },
  quantityText: {
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: (quantity, disabledValue) => ({
    borderColor: quantity === disabledValue ? '#ada6a8' : 'black',
    borderWidth: 0.8,
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize,
    paddingTop: buttonSize / 4,
    paddingLeft: buttonSize / 4,
    marginLeft: 30,

    // opacity: quantity === disabledValue ? 0.5 : 1,
  }),
});
