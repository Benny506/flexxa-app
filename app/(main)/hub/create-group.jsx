import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import ReusableModal from '../../../components/ReusableModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateGroupScreen = () => {
  const router = useRouter();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [groupType, setGroupType] = useState('public');
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [createdGroupId, setCreatedGroupId] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setGroupImage(result.assets[0].uri);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    if (!groupDescription.trim()) {
      Alert.alert('Error', 'Please enter a group description');
      return;
    }

    setIsCreating(true);

    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      const newGroupId = 'g' + Date.now();
      setCreatedGroupId(newGroupId);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleGoToGroup = () => {
    setShowSuccessModal(false);
    router.push({
      pathname: '/(main)/community/group/[id]',
      params: { id: createdGroupId },
    });
  };

  const handleSendInvites = () => {
    setShowSuccessModal(false);
    setShowInviteModal(true);
  };

  const handleInvitesSent = () => {
    setShowInviteModal(false);
    router.push({
      pathname: '/(main)/community/group/[id]',
      params: { id: createdGroupId },
    });
  };

  const isFormValid = groupName.trim() && groupDescription.trim();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>New Group</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Group Image */}
        <View style={styles.section}>
          <Text style={styles.label}>Group image</Text>
          <Pressable style={styles.imageUpload} onPress={pickImage}>
            {groupImage ? (
              <Image source={{ uri: groupImage }} style={styles.uploadedImage} />
            ) : (
              <>
                <Ionicons name="image-outline" size={40} color="#999" />
                <Text style={styles.uploadText}>+ Add Photo</Text>
              </>
            )}
          </Pressable>
        </View>

        {/* Group Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Group name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Pool Party Enthusiasts"
            placeholderTextColor="#ccc"
            value={groupName}
            onChangeText={setGroupName}
          />
        </View>

        {/* Group Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Group description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="What is this group about?"
            placeholderTextColor="#ccc"
            multiline
            numberOfLines={4}
            value={groupDescription}
            onChangeText={setGroupDescription}
          />
        </View>

        {/* Group Type */}
        <View style={styles.section}>
          <Text style={styles.label}>Group type</Text>
          
          <Pressable
            style={[styles.typeOption, groupType === 'public' && styles.typeOptionSelected]}
            onPress={() => setGroupType('public')}
          >
            <View style={styles.typeContent}>
              <Text style={styles.typeTitle}>Public</Text>
              <Text style={styles.typeSubtitle}>(Anyone can join)</Text>
            </View>
            <View style={[styles.radio, groupType === 'public' && styles.radioSelected]}>
              {groupType === 'public' && <View style={styles.radioInner} />}
            </View>
          </Pressable>

          <Pressable
            style={[styles.typeOption, groupType === 'private' && styles.typeOptionSelected]}
            onPress={() => setGroupType('private')}
          >
            <View style={styles.typeContent}>
              <Text style={styles.typeTitle}>Private</Text>
              <Text style={styles.typeSubtitle}>(Approval required to join)</Text>
            </View>
            <View style={[styles.radio, groupType === 'private' && styles.radioSelected]}>
              {groupType === 'private' && <View style={styles.radioInner} />}
            </View>
          </Pressable>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Create Button */}
      <View style={styles.bottomContainer}>
        <Pressable
          style={[styles.createButton, !isFormValid && styles.createButtonDisabled]}
          onPress={handleCreateGroup}
          disabled={!isFormValid || isCreating}
        >
          {isCreating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.createButtonText}>Create Group</Text>
          )}
        </Pressable>
      </View>

      {/* Creating Modal */}
      <ReusableModal
        visible={isCreating}
        icon="logo-buffer"
        iconColor="#5B5BFF"
        iconBgColor="#E8E8FF"
        title="Creating group..."
      />

      {/* Success Modal */}
      <ReusableModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        icon="checkmark-circle"
        iconColor="#4CAF50"
        iconBgColor="#E8F5E9"
        title="Your Group Has Been Created!"
        message={`You've successfully created the group ${groupName}. Start sharing updates and inviting others to join the conversation`}
        primaryButton={{
          text: 'Send Invites',
          onPress: handleSendInvites,
        }}
        secondaryButton={{
          text: 'Go to Group',
          onPress: handleGoToGroup,
        }}
      />

      {/* Invite Sent Modal */}
      <ReusableModal
        visible={showInviteModal}
        onClose={handleInvitesSent}
        icon="mail"
        iconColor="#5B5BFF"
        iconBgColor="#E8E8FF"
        title="Invite Notification Sent!"
        message="Your group invite has been sent to other Flexes on the app. Sit tight and watch your group grow as others join in."
        primaryButton={{
          text: 'Go to Group',
          onPress: handleInvitesSent,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  imageUpload: {
    width: 140,
    height: 140,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  uploadedImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  uploadText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  typeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  typeOptionSelected: {
    borderColor: '#5B5BFF',
    backgroundColor: '#f9f9ff',
  },
  typeContent: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  typeSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#5B5BFF',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5B5BFF',
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  createButton: {
    backgroundColor: '#5B5BFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#D0D0FF',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CreateGroupScreen;