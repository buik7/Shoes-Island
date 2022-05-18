import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchBar = props => {
  const {
    editable,
    autoFocus,
    onChangeText,
    value,
    onClearText,
    showClearTextBtn,
  } = props;
  return (
    <View style={styles.searchContainer}>
      <AntDesign name="search1" size={20} style={styles.icon} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Search for products..."
        placeholderTextColor="black"
        editable={editable !== undefined ? editable : true}
        autoFocus={autoFocus !== undefined ? autoFocus : false}
        onChangeText={onChangeText}
        value={value}
      />
      {showClearTextBtn && (
        <TouchableOpacity onPress={onClearText}>
          <AntDesign name="close" size={20} style={styles.icon} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderRadius: 10,
    paddingLeft: 10,
    borderColor: 'black',
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    color: 'black',
    flex: 1,
  },
});
