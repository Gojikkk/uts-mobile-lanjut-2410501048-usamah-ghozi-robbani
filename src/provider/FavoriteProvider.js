import React, { useReducer } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';
import favoriteReducer, { initialState } from '../context/FavoriteReducers';

export default function FavoriteProvider({ children }) {
    const [state, dispatch] = useReducer(
        favoriteReducer,
        initialState
    );

    const addFavorite = (book) => {
        dispatch({
            type: 'ADD_FAVORITE',
            payload: book,
        });
    };

    const removeFavorite = (bookKey) => {
        dispatch({
            type: 'REMOVE_FAVORITE',
            payload: bookKey,
        });
    };

    const isFavorite = (bookKey) => {
        return state.favorites.some(
            (book) => book.key === bookKey
        );
    };

    return (
        <FavoriteContext.Provider
            value={{
                favorites: state.favorites,
                addFavorite,
                removeFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
}