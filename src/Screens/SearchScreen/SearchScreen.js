import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../Themes/colors';
import SearchBar from '../../Components/SearchBar/SearchBar';
import {useDispatch, useSelector} from 'react-redux';
import {getProductListThunk} from '../../Redux/thunks/productThunk';
import {screenNames} from '../../Navigation/constants/screenNames';
import {screenWidth} from '../../Utils/Dimensions';

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {productList} = useSelector(state => state.productReducer);
  const [keyword, setKeyword] = React.useState('');

  React.useEffect(() => {
    dispatch(getProductListThunk);
  }, []);

  const onChangeText = value => setKeyword(value);
  const onClearText = () => setKeyword('');

  const renderSearchResults = () => {
    const noResultImg = (
      <Image
        source={{
          uri: 'https://cdn.dribbble.com/users/463734/screenshots/2016792/empty-result_shot.png',
        }}
        style={{width: screenWidth, height: 350, transform: [{scale: 1.2}]}}
      />
    );
    if (keyword === '') return noResultImg;

    const l = keyword.length;
    const matchingProducts = productList.filter(item =>
      item.name.startsWith(keyword),
    );
    if (matchingProducts.length > 0) {
      return matchingProducts.map(item => (
        <TouchableOpacity
          style={styles.searchResultContainer}
          key={item.id}
          onPress={() =>
            navigation.navigate(screenNames.detailScreen, {id: item.id})
          }>
          <Text style={styles.searchResultText}>
            {item.name.slice(0, l)}
            <Text style={styles.searchResultBoldedText}>
              {item.name.slice(l)}
            </Text>
          </Text>
          <View style={styles.externalIcon}>
            <Feather name="external-link" size={20} color={colors.black} />
          </View>
        </TouchableOpacity>
      ));
    }

    return noResultImg;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.blockContainer, styles.header, styles.mb10]}>
        <TouchableOpacity style={{marginRight: 15}} onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={30} color={colors.black} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <SearchBar
            editable={true}
            autoFocus={true}
            value={keyword}
            onChangeText={onChangeText}
            onClearText={onClearText}
            showClearTextBtn={true}
          />
        </View>
      </View>
      <ScrollView>{renderSearchResults()}</ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const screenPadding = 10;

const styles = StyleSheet.create({
  container: {
    padding: screenPadding,
    backgroundColor: colors.background,
    flex: 1,
  },
  blockContainer: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderRadius: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  searchResultContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  searchResultText: {
    color: colors.black,
    fontSize: 18,
  },
  searchResultBoldedText: {
    fontWeight: '700',
  },
  externalIcon: {
    position: 'absolute',
    top: 13,
    right: 10,
  },
});
