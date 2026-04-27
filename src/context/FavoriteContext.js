    import { createContext, useContext } from 'react';

    export const FavoriteContext = createContext({
        favorites: [],
        addFavorite: (book) => {},
        removeFavorite: (bookKey) => {},
        isFavorite: (bookKey) => false,
    });

    export const useFavorite = () => useContext(FavoriteContext);