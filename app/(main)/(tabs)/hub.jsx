import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Components
import CommunityHeader from '../../../components/community/CommunityHeader';
import PostCard from '../../../components/community/PostCard';
import GroupsTab from '../../../components/community/GroupsTab';
import CreateModal from '../../../components/community/CreateModal';

const DUMMY_POSTS = [
  {
    id: 'p1',
    user: { name: 'John Doe', handle: '@lifeoftheparty', avatar: 'https://i.pravatar.cc/100?img=1' },
    time: '2m',
    text: "Last night's Sunset Pool Party was everything I hoped for! 🏖️ The vibes were unmatched, and I met so many amazing people. Huge shoutout to the host for organizing such a fun event. Can't wait for the next one! 🎉",
    media: ['https://picsum.photos/id/10/500/300'],
    likes: 200,
    comments: 15,
    views: 100,
  },
  {
    id: 'p2',
    user: { name: 'Jane Doe', handle: '@janeishere', avatar: 'https://i.pravatar.cc/100?img=5' },
    time: '2h',
    text: "Just clocked out from the City Gala event. Huge thanks to the Flexxa team for the seamless shift. Great crew and even better experience!",
    media: ['https://picsum.photos/id/30/500/300', 'https://picsum.photos/id/31/500/300'],
    likes: 55,
    comments: 4,
    views: 80,
  },
  {
    id: 'p3',
    user: { name: 'Sarah Connor', handle: '@scpartyplanner', avatar: 'https://i.pravatar.cc/100?img=4' },
    time: '4h',
    text: 'Had an amazing time at the Beach Cleanup event! 🌊 Great community vibes and made some new friends. Environment + Community = Win!',
    media: ['https://picsum.photos/id/50/500/300'],
    likes: 120,
    comments: 8,
    views: 150,
  },
];

const HubScreen = () => {
  const [activeTab, setActiveTab] = useState('My Feed');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  const handlePostPress = (postId) => {
    router.push({
      pathname: '/(main)/community/post/[id]',
      params: { id: postId },
    });
  };

  const handleGroupPress = (groupId) => {
    router.push({
      pathname: '/(main)/community/group/[id]',
      params: { id: groupId },
    });
  };

  const handleCreatePost = () => {
    setShowCreateModal(true);
  };

  const handleCreatePostAction = () => {
    setShowCreateModal(false);
    router.push('/(main)/hub/create-post');
  };

  const handleCreateGroupAction = () => {
    setShowCreateModal(false);
    router.push('/(main)/hub/create-group');
  };

  const CreatePostButton = () => (
    <Pressable style={styles.createButton} onPress={handleCreatePost}>
      <Text style={styles.createButtonText}>Create</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <CommunityHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'My Feed' ? (
        <>
          <FlatList
            data={DUMMY_POSTS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PostCard
                post={item}
                onPress={() => handlePostPress(item.id)}
              />
            )}
            scrollEnabled={true}
            contentContainerStyle={styles.feedContainer}
            ListFooterComponent={<View style={{ height: 100 }} />}
            showsVerticalScrollIndicator={false}
          />
          <CreatePostButton />
        </>
      ) : (
        <>
          <GroupsTab onGroupPress={handleGroupPress} />
          <CreatePostButton />
        </>
      )}

      <CreateModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePost={handleCreatePostAction}
        onCreateGroup={handleCreateGroupAction}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedContainer: {
    backgroundColor: '#f7f7f7',
  },
  createButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#5B5BFF',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default HubScreen;