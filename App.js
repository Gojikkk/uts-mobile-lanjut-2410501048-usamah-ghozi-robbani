import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoriteContext } from './src/context/FavoriteContext';
import { FavoriteReducer, initialState } from './src/context/FavoriteReducers';
import FavoriteProvider from './src/provider/FavoriteProvider';

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
        <FavoriteProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </FavoriteProvider>
    );
}