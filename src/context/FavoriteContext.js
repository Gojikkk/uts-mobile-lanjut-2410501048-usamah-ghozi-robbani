import { createContext } from 'react';

export const FavoriteContext = createContext({
    favorites: [],
    addFavorite: (book) => {},
    removeFavorite: (bookKey) => {},
    isFavorite: (bookKey) => false,
});