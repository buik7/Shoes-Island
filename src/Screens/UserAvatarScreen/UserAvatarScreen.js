import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import {colors} from '../../Themes/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import defaultAvatar from '../../Static/Users/user-icon.png';
import {screenWidth} from '../../Utils/Dimensions';
import {updateUserAvatarThunk} from '../../Redux/thunks/userThunk';
import {useDispatch} from 'react-redux';

const UserAvatarScreen = ({navigation}) => {
  const [title, setTitle] = React.useState('Upload Avatar');
  const [avatar, setAvatar] = React.useState(defaultAvatar);
  const [imageInfo, setImageInfo] = React.useState(null);
  const dispatch = useDispatch();

  const loadImage = async () => {
    const {assets, didCancel, errorCode} = await launchImageLibrary();
    if (!didCancel && !errorCode) {
      setImageInfo(assets[0]);
      setAvatar({uri: assets[0].uri});
    }
  };

  const onChooseAnotherImage = () => {
    loadImage();
  };

  const onSubmit = () => {
    if (!imageInfo) {
      Alert.alert('Error', 'Please choose an image');
      return;
    }
    console.log(imageInfo);

    const data = new FormData();
    data.append('photo', {
      name: imageInfo.fileName,
      type: imageInfo.type,
      uri:
        Platform.OS === 'android'
          ? imageInfo.uri
          : imageInfo.uri.replace('file:///data/user/0/com.shoes/cache/', ''),
    });

    setTitle('Uploading your avatar....');
    dispatch(updateUserAvatarThunk(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerCancelIcon}
          onPress={navigation.goBack}>
          <AntDesign name="close" size={30} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity style={styles.headerConfirmIcon} onPress={onSubmit}>
          <AntDesign name="check" size={30} color={colors.focused} />
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        <Image source={avatar} style={styles.avatar} />
      </View>
      <TouchableOpacity
        style={styles.btnSecondary}
        onPress={onChooseAnotherImage}>
        <Text style={styles.btnSecondaryText}>
          {imageInfo ? 'Choose another image' : 'Choose an image'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserAvatarScreen;

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  avatar: {
    width: 300,
    height: 300,
    borderRadius: 150,
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
