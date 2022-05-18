import {StyleSheet, View, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {colors} from '../../Themes/colors';

const ImageViewerScreen = ({route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}></View>
      <View style={styles.imageContainer}>
        <Image source={{uri: route.params.uri}} style={styles.image} />
      </View>
      <View style={styles.bottom}></View>
    </SafeAreaView>
  );
};

export default ImageViewerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    backgroundColor: colors.black,
  },
  imageContainer: {
    flex: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottom: {
    flex: 1,
    backgroundColor: colors.black,
  },
});
