import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {screenNames} from '../../Navigation/constants/screenNames';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../Themes/colors';
import SearchBar from '../../Components/SearchBar/SearchBar';
import {screenHeight, screenWidth} from '../../Utils/Dimensions';
import {useSelector} from 'react-redux';
import Product from '../../Components/Product/Product';
import MapView, {Marker} from 'react-native-maps';

const StoreDetailScreen = ({navigation, route}) => {
  const {storeList} = useSelector(state => state.storeReducer);
  const {productList} = useSelector(state => state.productReducer);
  const storeDetail = storeList.find(item => item.id === route.params.id);
  const scrollRef = React.useRef();

  const scrollToEnd = () => {
    scrollRef.current.scrollToEnd({animated: true});
  };

  const renderRating = () => {
    if (!storeDetail) return <></>;
    const listStars = [];
    const num = parseInt(storeDetail.description.split(' ')[0]) + 130;
    for (let i = 0; i < 5; i++) {
      listStars.push(
        <AntDesign
          key={i}
          name="star"
          size={13}
          color="#FDCC0D"
          style={{marginRight: 2}}
        />,
      );
    }
    return (
      <View style={styles.ratingContainer}>
        {listStars}
        <Text style={styles.ratingText}>({num} reviews)</Text>
      </View>
    );
  };

  const navigateToDetail = React.useCallback(
    id => () =>
      navigation.navigate(screenNames.detailScreen, {
        id,
      }),
    [],
  );

  const navigateToImageViewer = React.useCallback(() => {
    navigation.navigate(screenNames.imageViewerScreen, {
      uri: storeDetail.image,
    });
  }, [storeDetail]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.blockContainer, styles.header, styles.mb10]}>
        <TouchableOpacity style={{marginRight: 15}} onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={30} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => navigation.navigate(screenNames.searchScreen)}>
          <SearchBar editable={false} />
        </TouchableOpacity>
      </View>
      {storeDetail && (
        <ScrollView ref={scrollRef}>
          <TouchableOpacity
            style={[styles.mb10]}
            onPress={navigateToImageViewer}>
            <Image source={{uri: storeDetail.image}} style={styles.image} />
          </TouchableOpacity>
          <View
            style={[styles.blockContainer, styles.mb10, styles.storeDetail]}>
            <View style={styles.storeDetailTop}>
              <View>
                <Text style={styles.title}>{storeDetail.name}</Text>
                <View>{renderRating()}</View>
              </View>
              <TouchableOpacity onPress={scrollToEnd}>
                <Feather name="map-pin" color={colors.focused} size={40} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.storeDesc}>
                <Text style={{fontWeight: '500'}}>Address:</Text>{' '}
                {storeDetail.description}, Ho Chi Minh City
              </Text>
            </View>
          </View>
          <Text
            style={[
              styles.subTitle,
              {marginHorizontal: 10, marginVertical: 15},
            ]}>
            Best-seller products
          </Text>
          <FlatList
            horizontal
            data={productList}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Product product={item} navigate={navigateToDetail(item.id)} />
            )}
            ItemSeparatorComponent={() => <View style={{width: 5}} />}
            style={styles.mb10}
          />
          <Text style={[styles.subTitle, styles.mb10, {marginLeft: 10}]}>
            Location
          </Text>
          <MapView
            style={{height: 400, width: screenWidth}}
            initialRegion={{
              latitude: 10.77086012777135,
              longitude: 106.66996559447118,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{
                latitude: parseFloat(storeDetail.latitude),
                longitude: parseFloat(storeDetail.longtitude),
              }}
              title={storeDetail.name}
              description={''}
            />
          </MapView>
          <View style={{marginBottom: 30}}></View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default StoreDetailScreen;

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
  image: {
    height: screenHeight / 3,
    width: screenWidth - 2 * screenPadding,
    borderRadius: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: 'gray',
  },
  storeDetail: {
    paddingHorizontal: 20,
  },
  storeDetailTop: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.black,
    fontSize: 25,
    fontWeight: '700',
  },
  subTitle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '500',
  },
  storeDesc: {
    color: colors.black,
  },
});
