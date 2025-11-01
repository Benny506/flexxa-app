import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostCard = ({ post, onPress, isLast = false, isFirst = false }) => {
  // Safety check for undefined post
  if (!post) {
    return null;
  }

  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1);
  };

  const handleActionPress = (e) => {
    e.stopPropagation();
  };

  return (
    <Pressable style={[styles.container, isFirst && styles.firstCard]} onPress={onPress}>
      <View style={styles.threadContainer}>
        {/* Avatar with Thread Line */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          {!isLast && <View style={styles.threadLine} />}
        </View>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* User Info */}
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{post.user.name}</Text>
              <Text style={styles.time}> {post.time}</Text>
            </View>
          </View>

          <Text style={styles.userHandle}>{post.user.handle}</Text>

          {/* Post Text */}
          <Text style={styles.postText}>{post.text}</Text>

          {/* Media Grid */}
          {post.media && post.media.length > 0 && (
            <View style={styles.mediaContainer}>
              {post.media.length === 1 ? (
                <Image
                  source={{ uri: post.media[0] }}
                  style={styles.singleImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.mediaGrid}>
                  {post.media.slice(0, 4).map((imageUri, index) => (
                    <View
                      key={index}
                      style={[
                        styles.gridImageContainer,
                        post.media.length === 2 && styles.twoImages,
                        post.media.length === 3 && index === 0 && styles.threeImagesFirst,
                        post.media.length === 3 && index > 0 && styles.threeImagesOther,
                        post.media.length === 4 && styles.fourImages,
                      ]}
                    >
                      <Image
                        source={{ uri: imageUri }}
                        style={styles.gridImage}
                        resizeMode="cover"
                      />
                      {index === 3 && post.media.length > 4 && (
                        <View style={styles.moreOverlay}>
                          <Text style={styles.moreText}>+{post.media.length - 4}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <Pressable 
              style={styles.actionButton} 
              onPress={handleLike}
            >
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={20}
                color={liked ? '#E84C5B' : '#ccc'}
              />
            </Pressable>
            <Pressable 
              style={styles.actionButton}
              onPress={handleActionPress}
            >
              <Ionicons name="chatbubble-outline" size={18} color="#ccc" />
            </Pressable>
            <Pressable 
              style={styles.actionButton}
              onPress={handleActionPress}
            >
              <Ionicons name="eye-outline" size={20} color="#ccc" />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    // paddingBottom: 8,
  },
  firstCard: {
    paddingTop: 16,
  },
  threadContainer: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  threadLine: {
    width: 0.5,
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 8,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 12,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  time: {
    fontSize: 13,
    color: '#999',
  },
  userHandle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
  },
  postText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#a1a1a1',
    marginBottom: 12,
  },
  mediaContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  singleImage: {
    width: '100%',
    height: 280,
    borderRadius: 12,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    borderRadius: 12,
  },
  gridImageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 8,
  },
  twoImages: {
    width: '49.5%',
    height: 200,
  },
  threeImagesFirst: {
    width: '100%',
    height: 200,
    marginBottom: 2,
  },
  threeImagesOther: {
    width: '49.5%',
    height: 150,
  },
  fourImages: {
    width: '49.5%',
    height: 150,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  moreOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 24,
  },
  actionButton: {
    paddingVertical: 4,
  },
});

export default PostCard;