import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home';
import ScoresScreen from '../screens/Scores';
import ParametersScreen from '../screens/Parameters';
import { Colors } from '../constants/Colors';

const TabNavigator = createBottomTabNavigator();

export const AppTabNavigator = () => {
    return (
        <TabNavigator.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if(route.name == 'TabHome') {
                    iconName = focused ? 'game-controller' : 'game-controller-outline';
                }
                else if(route.name == 'TabScores') {
                    iconName = focused ? 'beer' : 'beer-outline';
                }
                else if(route.name == 'TabSettings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        >
            <TabNavigator.Screen name="TabHome" component={HomeScreen} options={{title: 'Jouer'}}/>
            <TabNavigator.Screen name="TabScores" component={ScoresScreen} options={{title: 'Historique'}}/>
            <TabNavigator.Screen name="TabSettings" component={ParametersScreen} options={{title: 'Paramètres'}}/>
        </TabNavigator.Navigator>
    )
}