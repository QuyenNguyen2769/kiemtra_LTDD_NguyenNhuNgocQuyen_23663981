import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export type Movie = {
  id: string;
  title: string;
  poster: string;
  genre: string;
  year: number;
  rating: number;
  isShowing: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, layout = 'row', onSelect }) => {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity onPress={() => {
      Alert.alert('Tên phim', movie.title);
      onSelect(movie.id);
    }}>
      <View style={[styles.card, isTile && styles.cardTile]}>
        <View style={isTile ? styles.posterContainerTile : undefined}>
          <Image 
            source={{ uri: movie.poster }} 
            style={isTile ? styles.posterTile : styles.posterRow} 
            resizeMode="cover"
          />
          {isTile && (
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {movie.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        <View style={isTile ? styles.infoTile : styles.infoRow}>
          <Text style={styles.title} numberOfLines={isTile ? 1 : undefined}>
            {movie.title}
          </Text>
          
          {!isTile && (
            <>
              <Text style={styles.details}>{movie.genre} • {movie.year}</Text>
              <Text style={styles.ratingRow}>⭐ {movie.rating.toFixed(1)}</Text>
            </>
          )}

          <Text style={styles.status}>
            {movie.isShowing ? '🟢 Đang chiếu' : '🔴 Ngừng chiếu'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 12,
  },
  cardTile: {
    flexDirection: 'column',
    marginBottom: 0,
  },
  posterRow: {
    width: 70,
    height: 100,
  },
  posterContainerTile: {
    width: '100%',
    aspectRatio: 2 / 3,
    position: 'relative',
  },
  posterTile: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoRow: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  infoTile: {
    padding: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingRow: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e5a822',
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: '#444',
  }
});

export default React.memo(MovieCard);
