import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Switch, 
  ActivityIndicator,
  RefreshControl 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from '../components/MovieCard';

const MOCK_MOVIES: Movie[] = [
  { id: '1', title: 'Inception', poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', genre: 'Sci-Fi', year: 2010, rating: 8.8, isShowing: true },
  { id: '2', title: 'The Dark Knight', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', genre: 'Action', year: 2008, rating: 9.0, isShowing: true },
  { id: '3', title: 'Interstellar', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MvrIdYcB.jpg', genre: 'Sci-Fi', year: 2014, rating: 8.6, isShowing: false },
  { id: '4', title: 'Bien do', poster: 'https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLvLuPEHZpuSmzn.jpg', genre: 'Action', year: 2024, rating: 9.8, isShowing: true },
  { id: '5', title: 'Tat den', poster: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg', genre: 'Drama', year: 2023, rating: 7.8, isShowing: true },
  { id: '6', title: 'Hoi 4', poster: 'https://image.tmdb.org/t/p/w500/wWba3TaojhK7NlGUU1rvRr3fSyX.jpg', genre: 'Animation', year: 2024, rating: 6.8, isShowing: true },
  { id: '7', title: 'Thế Thân 2: Dòng Chảy Của Nước', poster: 'https://image.tmdb.org/t/p/w500/t6HIqrNDIGGLt5VcREiaEAgV56c.jpg', genre: 'Sci-Fi', year: 2022, rating: 7.7, isShowing: false },
  { id: '8', title: 'Gấu Béo Tái Xuất', poster: 'https://image.tmdb.org/t/p/w500/p9nOtsHjAIfBmsiB8XgK3i06Jik.jpg', genre: 'Comedy', year: 2024, rating: 7.2, isShowing: true }
];

export default function MovieApp() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);

  const fetchMovies = useCallback(async () => {
    // Giả lập gọi API GET
    return new Promise<Movie[]>((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_MOVIES].sort(() => Math.random() - 0.5));
      }, 3000);
    });
  }, []);


  const loadData = async () => {
    setLoading(true);
    const data = await fetchMovies();
    setMovies(data);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const data = await fetchMovies();
    setMovies(data);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Câu 1c: Tiêu đề */}
        <View style={styles.appHeader}>
          <Text style={styles.appTitle}>Movie App</Text>
        </View>

        {/* Câu 5a: Switch dạng lưới */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={movies}
            key={isTile ? 'tile-2' : 'row-1'}
            numColumns={isTile ? 2 : 1}
            columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={isTile ? styles.tileWrapper : styles.rowWrapper}>
                <MovieCard 
                  movie={item} 
                  layout={isTile ? 'tile' : 'row'} 
                  onSelect={(id) => console.log('Movie selected:', id)}
                />
              </View>
            )}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appHeader: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  switchLabel: {
    marginRight: 8,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  tileWrapper: {
    width: '48%',
    marginBottom: 10,
  },
  rowWrapper: {
    width: '100%',
  },
});
