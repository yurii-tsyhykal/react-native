import {ActivityIndicator} from 'react-native';
import PetsList from '../../common/components/PetList/PetsList';
import {useFavorites} from '../../context/favoritesContext';

export default function FavoritePage() {
  const {favorites, isLoading} = useFavorites();
  console.log(favorites);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <PetsList pets={favorites} />
    </>
  );
}
