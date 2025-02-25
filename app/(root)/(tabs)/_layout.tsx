import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Tabs } from 'expo-router';


const TabsLayout = () => {
    return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
    )
    
}

export default TabsLayout