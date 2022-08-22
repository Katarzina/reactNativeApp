import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '../navigation';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import Spinner from '../components/Spinner';
import {spacingSizes, textSizes, colors} from '../theme';
import {HEIGHT, WIDTH} from './MoviesScreen';

type ScreenRouteProps = RouteProp<AppStackParamList, 'MovieDetailScreen'>;

const MovieDetailScreen = ({route}: {route: ScreenRouteProps}) => {
  const {movie} = route?.params;
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  return (
    <View style={styles.screen}>
      <ScrollView>
        <FastImage
          style={styles.fastImage}
          source={{
            uri: movie?.posterUrl,
          }}
          onLoadStart={() => setLoadingImage(true)}
          onLoadEnd={() => setLoadingImage(false)}>
          {loadingImage && (
            <View style={styles.movie}>
              <Spinner color="dark" size="sm" />
            </View>
          )}
        </FastImage>
        <View style={styles.movie}>
          <RowText boldText="Title:" text={movie?.title} />
          <RowText boldText="Year:" text={movie?.year} />
          <RowText boldText="Duration:" text={movie?.duration} />
          <RowText boldText="Actors:" text={movie?.actors} />
          <RowText boldText="Director:" text={movie?.director} />
          <RowText boldText="Plot:" text={movie?.plot} />
          <RowText boldText="Genres:" text={movie?.genres?.join(', ')} />
        </View>
      </ScrollView>
    </View>
  );
};
export default MovieDetailScreen;

const RowText = ({boldText, text}: {boldText: string; text: string}) => (
  <View style={styles.row}>
    <Text style={styles.bold}>{boldText}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  movie: {
    paddingHorizontal: spacingSizes.md,
    paddingVertical: spacingSizes.md,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  fastImage: {
    width: WIDTH,
    height: HEIGHT / 2.3,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: textSizes.lg,
    color: colors.dark200,
  },
  text: {
    fontSize: textSizes.lg,
    color: colors.dark200,
  },
});
