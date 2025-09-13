import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {IPets} from '../screen/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextType {
  favorites: IPets[];
  toggleFavorite: (pet: IPets) => Promise<void>;
  isFavorite: (pet: IPets) => boolean;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoriteProvider = ({children}: {children: ReactNode}) => {
  const [favorites, setFavorites] = useState<IPets[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.log('Failed load favorites', error);
      } finally {
        setIsLoading(false);
      }
    };
    getFavorites();
  }, []);

  const toggleFavorite = useCallback(async (pet: IPets) => {
    setFavorites(currentFav => {
      let newFav;
      const isFav = currentFav.some(i => i.timeStamp === pet.timeStamp);
      if (isFav) {
        newFav = currentFav.filter(i => i.timeStamp !== pet.timeStamp);
      } else {
        newFav = [...currentFav, pet];
      }
      AsyncStorage.setItem('favorites', JSON.stringify(newFav));
      return newFav;
    });
  }, []);

  const isFavorite = useCallback(
    (pet: IPets) => {
      return favorites.some(i => i.timeStamp === pet.timeStamp);
    },
    [favorites],
  );

  const value = {favorites, toggleFavorite, isFavorite, isLoading};
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};
