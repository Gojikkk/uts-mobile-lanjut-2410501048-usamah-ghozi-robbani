// HomeStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './HomeTabs';
import DetailScreen from '../screen/DetailScreen';

const Stack = createNativeStackNavigator();

function HomeStack() { 
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="MainTabs" component={HomeTabs} options={{ headerShown: false }}/>
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;