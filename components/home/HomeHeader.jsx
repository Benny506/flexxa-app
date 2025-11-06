import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeHeader({
  // Profile Section
  profileImage,
  onProfilePress,
  showProfile = true,
  
  // Name & Handle
  name = 'John Doe',
  handle = 'Life of the party!',
  showHandle = true,
  
  // Notification/Action Button
  showActionButton = true,
  actionIcon = 'notifications',
  actionIconSize = 22,
  actionIconColor = '#000',
  onActionPress,
  showBadge = false,
  badgeCount,
  
  // Custom Content
  leftContent,
  rightContent,
  centerContent,
  
  // Styles
  styles = {}, // Custom styles object
  
  // Additional Props
  children,
}) {
  return (
    <View style={[defaultStyles.header, styles.header]}>
      {/* Left Section */}
      {leftContent || (
        <View style={[defaultStyles.headerLeft, styles.headerLeft]}>
          {showProfile && (
            <TouchableOpacity onPress={onProfilePress}>
              <Image
                source={
                  typeof profileImage === 'string'
                    ? { uri: profileImage }
                    : profileImage || { uri: 'https://via.placeholder.com/40' }
                }
                style={[defaultStyles.profileImage, styles.profileImage]}
              />
            </TouchableOpacity>
          )}
          <View>
            {name && (
              <Text style={[defaultStyles.headerName, styles.headerName]}>
                {name}
              </Text>
            )}
            {showHandle && handle && (
              <Text style={[defaultStyles.headerHandle, styles.headerHandle]}>
                {handle}
              </Text>
            )}
          </View>
        </View>
      )}

      {/* Center Content (Optional) */}
      {centerContent && (
        <View style={[defaultStyles.centerContent, styles.centerContent]}>
          {centerContent}
        </View>
      )}

      {/* Right Section */}
      {rightContent || (
        showActionButton && (
          <TouchableOpacity
            style={[defaultStyles.actionButton, styles.actionButton]}
            onPress={onActionPress}
          >
            {typeof actionIcon === 'string' ? (
              <Ionicons 
                name={actionIcon} 
                size={actionIconSize} 
                color={actionIconColor} 
              />
            ) : (
              actionIcon
            )}
            {showBadge && (
              <View style={[defaultStyles.badge, styles.badge]}>
                {badgeCount !== undefined && badgeCount > 0 && (
                  <Text style={[defaultStyles.badgeText, styles.badgeText]}>
                    {badgeCount > 99 ? '99+' : badgeCount}
                  </Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        )
      )}

      {/* Custom Children */}
      {children}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  headerHandle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    position: 'relative',
    backgroundColor: 'rgb(251,245,249)',
    padding: 8,
    borderRadius: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#484ED4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});