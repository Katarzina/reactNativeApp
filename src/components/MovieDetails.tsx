import {MovieType} from '../models/movie';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Spinner from '../components/Spinner';
import {colors, spacingSizes} from '../theme';

export type MovieDetailsProps = {
  movie: MovieType;
};

const MovieDetails = ({movie}: MovieDetailsProps) => {
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  return (
    <View style={styles.screen}>
      <View style={styles.view}>
        <Text style={styles.bold}>Name:</Text>
        <Text>{movie.name}</Text>
        <View style={styles.row}>
          <Text style={styles.bold}>Type:</Text>
          <Text>{movie.animal_type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Length:</Text>
          <Text>
            {movie.length_min}-{movie.length_max}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Weight:</Text>
          <Text>
            {movie.weight_min}-{movie.weight_max}
          </Text>
        </View>
        <Text style={styles.bold}>Geo Range:</Text>
        <Text>{movie.geo_range}</Text>
      </View>
      <View style={styles.fastImage}>
        <FastImage
          style={styles.fastImage}
          source={{
            uri: movie.image_link,
          }}
          onLoadStart={() => setLoadingImage(true)}
          onLoadEnd={() => setLoadingImage(false)}>
          {loadingImage && (
            <View style={styles.movie}>
              <Spinner color="dark" size="sm" />
            </View>
          )}
        </FastImage>
      </View>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacingSizes.md,
  },
  view: {
    flex: 1,
    flexWrap: 'nowrap',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  movie: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 15,
  },
  fastImage: {
    width: 150,
    height: 120,
  },
  bold: {
    fontWeight: 'bold',
  },
});
