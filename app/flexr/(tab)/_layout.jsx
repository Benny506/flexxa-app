import { Tabs, usePathname, useRouter } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FlexrTabsLayout() {
  const pathname = usePathname();
  const isHome = pathname.includes('/home');
  const isEvents = pathname.includes('/events');
  const router = useRouter();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <CustomTabBar {...props} showPlus={isHome} />}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: 'Events',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? 'calendar' : 'calendar-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="earnings"
          options={{
            title: 'Earnings',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? 'wallet' : 'wallet-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="hub"
          options={{
            title: 'Hub',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? 'people' : 'people-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: 'Menu',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? 'ellipsis-horizontal-circle' : 'ellipsis-horizontal-circle-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
      </Tabs>
      
      {isEvents && (
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => router.push('/(flexr)/create-event')}
            activeOpacity={0.9}
          >
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.floatingButtonText}>Create Event</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

// Custom Tab Bar Component
function CustomTabBar({ state, descriptors, navigation, showPlus }) {
  const router = useRouter();

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Replace the earnings tab (index 2) with the plus button when on home
        if (index === 2 && showPlus) {
          return (
            <View key={route.key} style={styles.tabItem}>
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => router.push('/(flexr)/create-event')}
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={32} color="white" />
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <TabItem
            key={route.key}
            label={label}
            isFocused={isFocused}
            onPress={onPress}
            icon={options.tabBarIcon}
          />
        );
      })}
    </View>
  );
}

// Individual Tab Item Component
function TabItem({ label, isFocused, onPress, icon }) {
  const color = isFocused ? '#484ED4' : '#999';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.tabItem}
      activeOpacity={0.7}
    >
      <View style={styles.tabContent}>
        {icon && icon({ color, focused: isFocused })}
        <Text style={[styles.tabLabel, { color }]} numberOfLines={1}>
          {label}
        </Text>
        {isFocused && <View style={styles.activeIndicator} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -10,
    width: 40,
    height: 3,
    backgroundColor: '#484ED4',
    borderRadius: 2,
  },
  plusButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#484ED4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 110,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#484ED4',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});