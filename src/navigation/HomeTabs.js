import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import HomeScreen from '../screen/HomeScreen';
import AboutScreen from '../screen/AboutScreen';
import SearchScreen from '../screen/SearchScreen';
import FavoriteScreen from '../screen/FavoriteScreen';

const Tab = createBottomTabNavigator();
function HomeTabs() {
return (
    <Tab.Navigator
    screenOptions={({ route }) => ({

    tabBarIcon: ({ focused, color, size }) => {
        const icons = {
            Home: focused ? 'home' : 'home-outline',
            Favorite: focused ? 'heart' : 'heart-outline',
            Search: focused ? 'search' : 'search-outline',
            About: focused ? 'person' : 'person-outline',
            };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
    },
        tabBarActiveTintColor: '#1565C0',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 60, paddingBottom: 8 },
        })}
    >
        <Tab.Screen name='Home' component={HomeScreen} options={{headerTitleAlign: 'center', headerShadowVisible: false}} />
        <Tab.Screen name='Favorite' component={FavoriteScreen} options={{headerTitleAlign: 'center', headerShadowVisible: false}} />
        <Tab.Screen name='Search' component={SearchScreen} options={{headerTitleAlign: 'center', headerShadowVisible: false}}/>
        <Tab.Screen name='About' component={AboutScreen} options={{headerTitleAlign: 'center', headerShadowVisible: false}}  />
    </Tab.Navigator>
    );
    }
export default HomeTabs;