// components/community/CommentInput.jsx
import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text, Platform, KeyboardAvoidingView } from 'react-native';
// ^^^^^^^^^^^ Added 'Platform' here
import { Ionicons } from '@expo/vector-icons';
// Constants is not strictly needed here but often useful for offset

const DUMMY_EMOJIS = ['👍', '❤️', '🔥', '😂', '💯', '👏']; 

const CommentInput = () => {
    const [comment, setComment] = useState('');

    const handleSend = () => {
        if (comment.trim()) {
            console.log('Sending comment:', comment);
            setComment('');
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // Adjusted offset slightly for better placement above the keyboard on iOS
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} 
            style={styles.keyboardAvoidingContainer}
        >
            <View style={styles.inputContainer}>
                {/* Quick Reaction Emojis */}
                <View style={styles.emojiBar}>
                    {DUMMY_EMOJIS.map((emoji, index) => (
                        <Pressable key={index} onPress={() => setComment(prev => prev + emoji)}>
                            <Text style={styles.emojiText}>{emoji}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* Main Text Input */}
                <View style={styles.mainInputRow}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Leave your comment..."
                        placeholderTextColor="#999"
                        value={comment}
                        onChangeText={setComment}
                        multiline
                    />
                    <Pressable onPress={handleSend} style={styles.sendButton} disabled={!comment.trim()}>
                        <Ionicons 
                            name="send" 
                            size={24} 
                            color={comment.trim() ? '#007AFF' : '#ccc'} 
                        />
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        backgroundColor: '#fff',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
    },
    inputContainer: {
        paddingHorizontal: 15,
        paddingBottom: Platform.OS === 'ios' ? 10 : 5, 
        paddingTop: 10,
    },
    emojiBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        backgroundColor: '#F5F5F5', 
        borderRadius: 20,
        paddingVertical: 5,
    },
    emojiText: {
        fontSize: 20,
        paddingHorizontal: 5,
    },
    mainInputRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    textInput: {
        flex: 1,
        minHeight: 40,
        maxHeight: 120, 
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 10 : 8,
        marginRight: 10,
        fontSize: 15,
    },
    sendButton: {
        alignSelf: 'flex-end',
        marginBottom: 5, 
    },
});

export default CommentInput;