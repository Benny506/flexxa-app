import React, { useState, useRef, useEffect } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const DUMMY_MESSAGES = [
  {
    id: 'm1',
    user: { name: 'John Doe', avatar: 'https://i.pravatar.cc/100?img=1' },
    time: '2:30pm',
    text: 'Hello everyone',
    isOwn: false,
    hasAvatar: true,
  },
  {
    id: 'm2',
    user: { name: 'You', avatar: 'https://i.pravatar.cc/100?img=0' },
    time: '2:32pm',
    text: 'Hi, I just joined this group.',
    isOwn: true,
  },
  {
    id: 'm3',
    user: { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/100?img=5' },
    time: '2:30pm',
    text: 'What I captured',
    image: 'https://picsum.photos/id/10/500/400',
    isOwn: false,
    hasAvatar: true,
  },
  {
    id: 'm4',
    user: { name: 'Chris Jay', avatar: 'https://i.pravatar.cc/100?img=3' },
    time: '2:30pm',
    text: 'Wow, nice shots',
    isOwn: false,
    hasAvatar: true,
  },
  {
    id: 'm5',
    user: { name: 'Chris Jay', avatar: 'https://i.pravatar.cc/100?img=3' },
    time: '2:30pm',
    text: "I loved the view and tried getting that angle but couldn't",
    isOwn: false,
    hasAvatar: false,
  },
];

const DUMMY_GROUP = {
  id: 'g1',
  name: 'Life of the party gang',
  icon: '💬',
};

const MessageBubble = ({ message }) => {
  if (message.isOwn) {
    return (
      <View style={styles.ownMessageWrapper}>
        <View style={styles.ownMessageContainer}>
          <View style={styles.ownMessageBubble}>
            <Text style={styles.ownMessageText}>{message.text}</Text>
          </View>
          <Image
            source={{ uri: message.user.avatar }}
            style={styles.ownAvatar}
          />
        </View>
        <View style={styles.ownMessageInfo}>
          <Ionicons name="checkmark" size={14} color="#1FD4C2" />
          <Text style={styles.ownTime}>{message.time}</Text>
          <Text style={styles.youLabel}>You</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.otherMessageContainer}>
      <View style={styles.otherMessageRow}>
        {message.hasAvatar ? (
          <Image
            source={{ uri: message.user.avatar }}
            style={styles.otherAvatar}
          />
        ) : (
          <View style={styles.otherAvatarPlaceholder} />
        )}
        <View style={styles.otherMessageContent}>
          {message.hasAvatar && (
            <Text style={styles.senderName}>{message.user.name}</Text>
          )}
          {message.image ? (
            <View>
              <Image
                source={{ uri: message.image }}
                style={styles.messageImage}
              />
              {message.text && (
                <Text style={styles.imageCaption}>{message.text}</Text>
              )}
            </View>
          ) : (
            <View style={styles.otherMessageBubble}>
              <Text style={styles.otherMessageText}>{message.text}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const GroupChatScreen = () => {
  const router = useRouter();
  const { groupId } = useLocalSearchParams();
  const scrollViewRef = useRef(null);
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [messageText, setMessageText] = useState('');

  const emojis = ['😋', '🙂', '🤣', '😏', '😲', '🤨', '🖤', '🐔'];

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: `m${messages.length + 1}`,
        user: { name: 'You', avatar: 'https://i.pravatar.cc/100?img=0' },
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        text: messageText,
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleEmojiPress = (emoji) => {
    setMessageText(prev => prev + emoji);
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
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </Pressable>
          <View style={styles.groupHeader}>
            <View style={styles.groupIcon}>
              <Text style={styles.iconText}>{DUMMY_GROUP.icon}</Text>
            </View>
            <View>
              <Text style={styles.groupName}>{DUMMY_GROUP.name}</Text>
              <Pressable>
                <Text style={styles.viewInfo}>View info</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Emoji Row */}
        <View style={styles.emojiRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.emojiScrollContent}
          >
            {emojis.map((emoji, index) => (
              <Pressable
                key={index}
                style={styles.emojiButton}
                onPress={() => handleEmojiPress(emoji)}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <Pressable
            style={styles.cameraButton}
            onPress={() => router.push({
              pathname: '/(main)/community/group/camera',
              params: { groupId }
            })}
          >
            <Ionicons name="camera-outline" size={22} color="#999" />
          </Pressable>
          <TextInput
            style={styles.textInput}
            placeholder="Type here..."
            placeholderTextColor="#999"
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxHeight={100}
          />
          <Pressable
            onPress={handleSendMessage}
            style={[styles.sendButton, !messageText.trim() && styles.sendButtonDisabled]}
            disabled={!messageText.trim()}
          >
            <Ionicons
              name="send"
              size={22}
              color={messageText.trim() ? "#5B5BFF" : "#ccc"}
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
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 12,
  },
  groupHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 22,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  viewInfo: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  // Own Message Styles
  ownMessageWrapper: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  ownMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  ownMessageBubble: {
    backgroundColor: '#1FD4C2',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: width * 0.7,
  },
  ownMessageText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  ownAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: 8,
  },
  ownMessageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
  },
  ownTime: {
    fontSize: 11,
    color: '#999',
    marginHorizontal: 4,
  },
  youLabel: {
    fontSize: 11,
    color: '#1FD4C2',
    fontWeight: '600',
  },

  // Other Message Styles
  otherMessageContainer: {
    marginBottom: 16,
  },
  otherMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  otherAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  otherAvatarPlaceholder: {
    width: 32,
    marginRight: 10,
  },
  otherMessageContent: {
    flex: 1,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5B5BFF',
    marginBottom: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#e8e8ff',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: width * 0.75,
  },
  otherMessageText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  messageImage: {
    width: width * 0.68,
    height: 200,
    borderRadius: 12,
    marginBottom: 4,
  },
  imageCaption: {
    fontSize: 13,
    color: '#333',
    marginTop: 4,
  },

  // Emoji Row
  emojiRow: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingVertical: 12,
  },
  emojiScrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  emojiButton: {
    marginRight: 14,
    padding: 2,
  },
  emoji: {
    fontSize: 24,
  },

  // Input
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  cameraButton: {
    marginRight: 10,
    padding: 4,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  sendButton: {
    padding: 6,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default GroupChatScreen;