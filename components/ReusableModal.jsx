import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function ReusableModal({
  visible,
  onClose,
  title,
  message,
  icon,
  iconColor,
  iconBgColor,
  primaryButton,
  secondaryButton,
  children,
  showCloseButton = false,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />

        <View style={styles.modalContainer}>
          {showCloseButton && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#999" />
            </TouchableOpacity>
          )}

          {icon && (
            <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
              <Ionicons name={icon} size={48} color={iconColor} />
            </View>
          )}

          {title && <Text style={styles.modalTitle}>{title}</Text>}
          
          {message && <Text style={styles.modalMessage}>{message}</Text>}

          {children}

          <View style={styles.buttonContainer}>
            {secondaryButton && (
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={secondaryButton.onPress}
              >
                <Text style={styles.secondaryButtonText}>
                  {secondaryButton.text}
                </Text>
              </TouchableOpacity>
            )}

            {primaryButton && (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.primaryButton,
                  !secondaryButton && styles.fullWidthButton,
                ]}
                onPress={primaryButton.onPress}
              >
                <Text style={styles.primaryButtonText}>
                  {primaryButton.text}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButton: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#484ED4',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#484ED4',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#484ED4',
    fontSize: 16,
    fontWeight: '600',
  },
});
