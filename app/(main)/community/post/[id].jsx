import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const DUMMY_POSTS = {
  p1: {
    id: 'p1',
    user: { name: 'John Doe', avatar: 'https://i.pravatar.cc/100?img=1' },
    time: '2m',
    text: "Last night's Sunset Pool Party was everything I hoped for! 🏖️ The vibes were unmatched, and I met so many amazing people. Huge shoutout to the host for organizing such a fun event. Can't wait for the next one! 🎉",
    media: ['https://picsum.photos/id/10/500/300'],
    likes: 200,
    comments: 15,
    views: 100,
  },
  p2: {
    id: 'p2',
    user: { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/100?img=5' },
    time: '2h',
    text: "Just clocked out from the City Gala event!",
    media: ['https://picsum.photos/id/30/500/300'],
    likes: 55,
    comments: 4,
    views: 80,
  },
};

const DUMMY_COMMENTS = [
  {
    id: 'c1',
    user: { name: 'James Doe', avatar: 'https://i.pravatar.cc/100?img=2' },
    time: '50m',
    text: 'This is so vibrant! That sunset view and party vibe are unreal. Wish I could\'ve been there!',
  },
  {
    id: 'c2',
    user: { name: 'James Doe', avatar: 'https://i.pravatar.cc/100?img=2' },
    time: '50m',
    text: 'This is so vibrant! That sunset view and party vibe are unreal. Wish I could\'ve been there!',
  },
  {
    id: 'c3',
    user: { name: 'James Doe', avatar: 'https://i.pravatar.cc/100?img=2' },
    time: '50m',
    text: '@christopher Thank you',
  },
];

const PostDetailScreen = () => {
  const router = useRouter();
  const { postId } = useLocalSearchParams();
  const [comments, setComments] = useState(DUMMY_COMMENTS);
  const [commentText, setCommentText] = useState('');
  const [likedComments, setLikedComments] = useState({});

  const post = DUMMY_POSTS[postId] || DUMMY_POSTS.p1;

  const emojis = ['😋', '🙂', '🤣', '😏', '😲', '🤨', '💖'];

  const handleSendComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: `c${comments.length + 1}`,
        user: { name: 'You', avatar: 'https://i.pravatar.cc/100?img=0' },
        time: 'now',
        text: commentText,
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const toggleLikeComment = (commentId) => {
    setLikedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </Pressable>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Post Content */}
          <View style={styles.postContent}>
            {/* User Info */}
            <View style={styles.userSection}>
              <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
              <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{post.user.name}</Text>
              </View>
              <Text style={styles.time}>{post.time}</Text>
            </View>

            {/* Post Text */}
            <Text style={styles.postText}>{post.text}</Text>

            {/* Media */}
            {post.media && post.media.length > 0 && (
              <Image
                source={{ uri: post.media[0] }}
                style={styles.postImage}
              />
            )}

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="heart" size={18} color="#E84C5B" />
                <Text style={styles.statText}>{post.likes}</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="message" size={18} color="#9B7AEA" />
                <Text style={styles.statText}>{post.comments}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="eye" size={18} color="#999" />
                <Text style={styles.statText}>{post.views}</Text>
              </View>
            </View>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.comment}>
                <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentName}>{comment.user.name}</Text>
                    <Text style={styles.commentTime}>{comment.time}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  <Pressable style={styles.replyButton}>
                    <Text style={styles.replyText}>Reply</Text>
                  </Pressable>
                </View>
                <Pressable 
                  style={styles.likeCommentButton}
                  onPress={() => toggleLikeComment(comment.id)}
                >
                  <Ionicons 
                    name={likedComments[comment.id] ? "heart" : "heart-outline"} 
                    size={18} 
                    color={likedComments[comment.id] ? "#E84C5B" : "#999"} 
                  />
                </Pressable>
              </View>
            ))}
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Emoji Reactions */}
        <View style={styles.emojiContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.emojiContent}
          >
            {emojis.map((emoji, idx) => (
              <Pressable key={idx} style={styles.emojiButton}>
                <Text style={styles.emoji}>{emoji}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Comment Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Leave your comment..."
            placeholderTextColor="#999"
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <Pressable
            onPress={handleSendComment}
            style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]}
            disabled={!commentText.trim()}
          >
            <Ionicons 
              name="send" 
              size={22} 
              color={commentText.trim() ? "#5B5BFF" : "#ccc"} 
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  scrollContent: {
    flex: 1,
  },
  postContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#fff',
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
  userInfoContainer: {
    flex: 1,
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
  postText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 16,
  },
  postImage: {
    width: width - 32,
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    marginLeft: 6,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 8,
  },
  replyButton: {
    alignSelf: 'flex-start',
  },
  replyText: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  likeCommentButton: {
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  emojiContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  emojiContent: {
    paddingHorizontal: 16,
  },
  emojiButton: {
    marginRight: 16,
  },
  emoji: {
    fontSize: 26,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    padding: 6,
    marginBottom: 4,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default PostDetailScreen;