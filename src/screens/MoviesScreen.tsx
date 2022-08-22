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
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useQuery} from 'react-query';
import getMoviesService from '../services/getMoviesService';
import SkeletonPlaceholder from '../components/SkeletonPlaceholder';
import {headingSizes, spacingSizes, textSizes, colors} from '../theme';
import {MoviesType, MovieType} from '../models/movie';
import CardsList from '../components/CardsList';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const ITEM_WIDTH = Math.round(WIDTH * 0.8);

const MoviesScreen = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {
    data: movies,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getMoviesService(),
    queryKey: ['movies'],
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {error && (
        <View>
          <Text>{error?.message}</Text>
        </View>
      )}
      {isLoading ? (
        <View style={{minHeight: 84, justifyContent: 'center'}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              marginLeft={spacingSizes.md}
              alignItems="center">
              <SkeletonPlaceholder.Item
                width={WIDTH - 50}
                height={100}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width={WIDTH - 50}
                height={100}
                marginTop={6}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width={WIDTH - 50}
                height={100}
                marginTop={6}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width={WIDTH - 50}
                height={100}
                marginTop={6}
                borderRadius={4}
              />
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
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <CardsList
                  items={item.items}
                  onViewCard={(movie: MovieType) => {
                    props.navigation.navigate('MovieDetailScreen', {
                      movie,
                    });
                  }}
                />
              </View>
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
    flex: 1,
    width: WIDTH,
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 20,
    marginBottom: 30,
    shadowColor: colors.black,
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
    color: colors.dark,
    fontSize: headingSizes.sm,
    fontWeight: 'bold',
  },
});
