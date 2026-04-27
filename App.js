import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoriteContext } from './src/context/FavoriteContext';
import { FavoriteReducer, initialState } from './src/context/FavoriteReducers';

export default function App() {
    const [favorites, dispatch] = React.useReducer(FavoriteReducer, initialState);

        const addFavorite = (book) => {
            dispatch({ type: 'ADD_FAVORITE', payload: book });
        };

        const removeFavorite = (bookKey) => {
            dispatch({ type: 'REMOVE_FAVORITE', payload: bookKey });
        };
        
        const isFavorite = (bookKey) => {
            return favorites.some((favorite) => favorite.key === bookKey);
        };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </FavoriteContext.Provider>
    );
}