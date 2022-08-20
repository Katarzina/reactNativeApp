import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Text,
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useQuery} from 'react-query';
import getMoviesService from '../services/getMoviesService';
import SkeletonPlaceholder from '../components/SkeletonPlaceholder';
import {headingSizes, spacingSizes} from '../theme';
import MovieDetails from '../components/MovieDetails';
import Carousel from '../components/Carousel';
import {MoviesType} from '../models/movies';
import {MovieType} from '../models/movie';

export const SLIDER_WIDTH = Dimensions.get('window').width + 20;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const MoviesScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {data: movies, isLoading} = useQuery({
    queryFn: () => getMoviesService(),
    queryKey: ['movies'],
  });

  console.log(movies, 'movies');
  const isCarousel = React.useRef(null);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isLoading ? (
        <View style={{minHeight: 84, justifyContent: 'center'}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={46}
                height={46}
                borderRadius={5}
              />
              <SkeletonPlaceholder.Item marginLeft={spacingSizes.md}>
                <SkeletonPlaceholder.Item
                  width={140}
                  height={16}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  width={240}
                  height={12}
                  marginTop={6}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  width={240}
                  height={12}
                  marginTop={6}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={movies?.carousels}
          keyExtractor={(item: MoviesType, index) => String(index)}
          ListHeaderComponent={
            <View style={styles.screen}>
              <Text style={styles.text}>Movies list</Text>
            </View>
          }
          ListEmptyComponent={<Text>No movies found</Text>}
          renderItem={({item, index}: {item: MoviesType; index: number}) => (
            <View style={styles.container} key={index}>
              <Text style={styles.header}>{item.title}</Text>
              <Carousel
                data={item.items}
                renderItem={({
                  item,
                  index,
                }: {
                  item: MovieType;
                  index: number;
                }) => (
                  <View key={index} style={styles.box}>
                    <Image
                      source={{uri: item.posterUrl}}
                      style={styles.image}
                    />
                    <Text style={styles.body}>{item.title}</Text>
                  </View>
                )}
                layout={'default'}
                layoutCardOffset={20}
                ref={isCarousel}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};
export default MoviesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacingSizes.xs,
    paddingBottom: spacingSizes.xs,
  },
  text: {
    size: headingSizes.lg,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    width: ITEM_WIDTH,
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
  },
  body: {
    color: '#222',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
