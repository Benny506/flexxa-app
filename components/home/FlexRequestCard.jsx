import {Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function FlexRequestCard({ name, bio, image, onPress }) {
  return (
    <TouchableOpacity style={styles.requestCard} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.requestAvatar} />
      <Text style={styles.requestName}>{name}</Text>
      <Text style={styles.requestBio}>{bio}</Text>
      <TouchableOpacity style={styles.viewProfileButton} onPress={onPress}>
        <Text style={styles.viewProfileText}>View profile</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  requestCard: {
    width: 140,  
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,  
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  requestAvatar: {
    width: 80,  
    height: 80, 
    borderRadius: 40,
    marginBottom: 12, 
  },
  requestName: {
    fontSize: 16, 
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  requestBio: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  viewProfileButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  viewProfileText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
  },
});