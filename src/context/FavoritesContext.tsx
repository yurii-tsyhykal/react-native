import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {IPets} from '../screen/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authInstance} from '../config/firebaseConfig';

interface FavoritesContextType {
  favorites: IPets[];
  toggleFavorite: (pet: IPets) => Promise<void>;
  isFavorite: (pet: IPets) => boolean;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoriteProvider = ({children}: {children: ReactNode}) => {
  const [favorites, setFavorites] = useState<IPets[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const getFavKey = useCallback((key: string) => `favorites_${key}`, []);

  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged(user => {
      setUserId(user?.uid || null);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getFavorites = async () => {
      setIsLoading(true);
      if (!userId) {
        setFavorites([]);
        setIsLoading(false);
        return;
      }
      try {
        const key = getFavKey(userId);
        const storedFavorites = await AsyncStorage.getItem(key);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.log('Failed load favorites', error);
      } finally {
        setIsLoading(false);
      }
    };
    getFavorites();
  }, [getFavKey, userId]);

  const toggleFavorite = useCallback(
    async (pet: IPets) => {
      if (!userId) {
        return;
      }
      setFavorites(currentFav => {
        let newFav;
        const isFav = currentFav.some(i => i.timeStamp === pet.timeStamp);
        if (isFav) {
          newFav = currentFav.filter(i => i.timeStamp !== pet.timeStamp);
        } else {
          newFav = [...currentFav, pet];
        }
        const key = getFavKey(userId);
        AsyncStorage.setItem(key, JSON.stringify(newFav));
        return newFav;
      });
    },
    [getFavKey, userId],
  );

  const isFavorite = useCallback(
    (pet: IPets) => {
      return favorites.some(i => i.timeStamp === pet.timeStamp);
    },
    [favorites],
  );

  const value = useMemo(
    () => ({favorites, toggleFavorite, isFavorite, isLoading}),
    [favorites, isFavorite, isLoading, toggleFavorite],
  );
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};
