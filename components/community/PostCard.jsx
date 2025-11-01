import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width - 32; // Account for padding

const PostCard = ({ post, onPress }) => {
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1);
  };

  const handleActionPress = (e) => {
    e.stopPropagation();
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* User Info */}
      <View style={styles.userSection}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.userHandle}>{post.user.handle}</Text>
        </View>
        <Text style={styles.time}>{post.time}</Text>
      </View>

      {/* Post Text */}
      <Text style={styles.postText}>{post.text}</Text>

      {/* Media Carousel */}
      {post.media && post.media.length > 0 && (
        <View style={styles.mediaContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.round(
                event.nativeEvent.contentOffset.x / IMAGE_WIDTH
              );
              setCurrentImageIndex(slideIndex);
            }}
          >
            {post.media.map((imageUri, index) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
                style={styles.mediaImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          {post.media.length > 1 && (
            <View style={styles.dotsContainer}>
              {post.media.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentImageIndex && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      )}

      {/* Engagement Stats */}
      {/* <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="heart" size={17} color="#E84C5B" />
          <Text style={styles.statText}>{localLikes}</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="message" size={17} color="#9B7AEA" />
          <Text style={styles.statText}>{post.comments}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="eye" size={17} color="#999" />
          <Text style={styles.statText}>{post.views}</Text>
        </View>
      </View> */}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Pressable 
          style={styles.actionButton} 
          onPress={handleLike}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={22}
            color={liked ? '#E84C5B' : '#999'}
          />
        </Pressable>
        <Pressable 
          style={styles.actionButton}
          onPress={handleActionPress}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#999" />
        </Pressable>
        <Pressable 
          style={styles.actionButton}
          onPress={handleActionPress}
        >
          <Ionicons name="eye-outline" size={22} color="#999" />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginBottom: 8,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  userHandle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  postText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 12,
  },
  mediaContainer: {
    position: 'relative',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mediaImage: {
    width: IMAGE_WIDTH,
    height: 240,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    marginLeft: 6,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  actionButton: {
    paddingVertical: 8,
    paddingRight: 24,
  },
});

export default PostCard;