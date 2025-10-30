import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs 
      initialRouteName='home'
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#484ED4',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          // paddingBottom: 20,
          paddingTop: 8,
          height: 70,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: 8,
          gap: 4,
        }
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={24} 
                color={color} 
              />
              <Text style={{ 
                fontSize: 10, 
                color: color, 
                marginTop: 4,
                fontWeight: '500'
              }} numberOfLines={1}>
                Home
              </Text>
              {focused && (
                <View 
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    width: 40,
                    height: 3,
                    backgroundColor: '#484ED4',
                    borderRadius: 2,
                  }} 
                />
              )}
            </View>
          )
        }}
      />
      <Tabs.Screen 
        name="request" 
        options={{
          title: 'Events',
          unmountOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', minWidth: 60 }}>
              <Ionicons 
                name={focused ? "calendar" : "calendar-outline"} 
                size={24} 
                color={color} 
              />
              <Text style={{ 
                fontSize: 10, 
                color: color, 
                marginTop: 4,
                fontWeight: '500'
              }} numberOfLines={1}>
                Events
              </Text>
              {focused && (
                <View 
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    width: 40,
                    height: 3,
                    backgroundColor: '#484ED4',
                    borderRadius: 2,
                  }} 
                />
              )}
            </View>
          )
        }}
      />
      <Tabs.Screen 
        name="earnings" 
        options={{
          title: 'Earnings',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', minWidth: 60 }}>
              <Ionicons 
                name={focused ? "wallet" : "wallet-outline"} 
                size={24} 
                color={color} 
              />
              <Text style={{ 
                fontSize: 10, 
                color: color, 
                marginTop: 4,
                fontWeight: '500'
              }} numberOfLines={1}>
                Earnings
              </Text>
              {focused && (
                <View 
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    width: 40,
                    height: 3,
                    backgroundColor: '#484ED4',
                    borderRadius: 2,
                  }} 
                />
              )}
            </View>
          )
        }}
      />
      <Tabs.Screen 
        name="hub" 
        options={{
          title: 'Hub',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={24} 
                color={color} 
              />
              <Text style={{ 
                fontSize: 10, 
                color: color, 
                marginTop: 4,
                fontWeight: '500'
              }} numberOfLines={1}>
              Hub
              </Text>
              {focused && (
                <View 
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    width: 40,
                    height: 3,
                    backgroundColor: '#484ED4',
                    borderRadius: 2,
                  }} 
                />
              )}
            </View>
          )
        }}
      />
      <Tabs.Screen 
        name="menu" 
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Ionicons 
                name={focused ? "menu" : "menu-outline"} 
                size={24} 
                color={color} 
              />
              <Text style={{ 
                fontSize: 10, 
                color: color, 
                marginTop: 4,
                fontWeight: '500',
                textAlign: 'center'
              }} numberOfLines={1}>
                Menu
              </Text>
              {focused && (
                <View 
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    width: 40,
                    height: 3,
                    backgroundColor: '#484ED4',
                    borderRadius: 2,
                  }} 
                />
              )}
            </View>
          )
        }}
      />
    </Tabs>
  );
}