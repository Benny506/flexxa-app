import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function ReusableModal({
  visible,
  onClose,
  image,
  icon,
  iconColor = '#000',
  iconBgColor,
  title,
  message,
  children,
  primaryButton,
  secondaryButton,
  hideFooter = false,
  showCloseButton = false,
  styles = {}, // Custom styles object
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[defaultStyles.overlay, styles.overlay]}>
        <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />

        <View style={[defaultStyles.wrapper, styles.wrapper]}>
          <View style={[defaultStyles.modalContainer, styles.modalContainer]}>
            {/* Close Button */}
            {showCloseButton && onClose && (
              <View style={[defaultStyles.closeButtonWrapper, styles.closeButtonWrapper]}>
                <TouchableOpacity 
                  style={[defaultStyles.closeButton, styles.closeButton]} 
                  onPress={onClose}
                >
                  <Ionicons name="close" size={24} color="#999" />
                </TouchableOpacity>
              </View>
            )}

            {/* Image */}
            {image && (
              <View style={[defaultStyles.imageWrapper, styles.imageWrapper]}>
                <Image
                  source={typeof image === 'string' ? { uri: image } : image}
                  style={[defaultStyles.image, styles.image]}
                />
              </View>
            )}

            {/* Icon */}
            {(icon || iconBgColor) && !image && (
              <View style={[
                defaultStyles.iconContainer, 
                { backgroundColor: iconBgColor || '#F5F5F5' },
                styles.iconContainer
              ]}>
                {icon && (
                  typeof icon === 'object'
                    ? icon
                    : <Ionicons name={icon} size={48} color={iconColor} />
                )}
              </View>
            )}

            {/* Title */}
            {title && (
              <Text style={[defaultStyles.title, styles.title]}>
                {title}
              </Text>
            )}

            {/* Message/Description */}
            {message && (
              <Text style={[defaultStyles.message, styles.message]}>
                {message}
              </Text>
            )}

            {/* Body (Children Content) */}
            {children && (
              <View style={[defaultStyles.body, styles.body]}>
                {children}
              </View>
            )}

            {/* Footer Buttons */}
            {!hideFooter && (primaryButton || secondaryButton) && (
              <View style={[defaultStyles.footer, styles.footer]}>
                {secondaryButton && (
                  <TouchableOpacity
                    style={[
                      defaultStyles.button,
                      defaultStyles.secondaryButton,
                      secondaryButton.style,
                      styles.secondaryButton,
                    ]}
                    onPress={secondaryButton.onPress}
                  >
                    <Text style={[
                      defaultStyles.secondaryButtonText,
                      secondaryButton.textStyle,
                      styles.secondaryButtonText,
                    ]}>
                      {secondaryButton.text}
                    </Text>
                  </TouchableOpacity>
                )}

                {primaryButton && (
                  <TouchableOpacity
                    style={[
                      defaultStyles.button,
                      defaultStyles.primaryButton,
                      !secondaryButton && defaultStyles.fullWidthButton,
                      primaryButton.style,
                      styles.primaryButton,
                    ]}
                    onPress={primaryButton.onPress}
                  >
                    <Text style={[
                      defaultStyles.primaryButtonText,
                      primaryButton.textStyle,
                      styles.primaryButtonText,
                    ]}>
                      {primaryButton.text}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const defaultStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  wrapper: {
    width: '100%',
    maxWidth: 400,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  closeButton: {
    padding: 4,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  body: {
    width: '100%',
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginTop: 24,
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