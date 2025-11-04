import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/back-button';

export default function FAQsScreen() {
  const [expandedId, setExpandedId] = useState(null);

  const faqData = [
    {
      section: 'Account Setup and Verification',
      items: [
        {
          id: '1',
          question: 'How do I create an account on Flexxa?',
          answer:
            'Download the app, sign up with your email or phone number, and follow the setup process to complete your profile.',
        },
        {
          id: '2',
          question: 'Why do I need to verify my identity?',
          answer:
            'Identity verification helps us maintain a safe and trusted community. It ensures that all users are authentic and helps prevent fraudulent activities.',
        },
      ],
    },
    {
      section: 'Events and Hangouts',
      items: [
        {
          id: '3',
          question: 'How do I join an event?',
          answer:
            'Browse available events in the app, select one that interests you, and click "Join" to participate. You\'ll receive confirmation and details about the event.',
        },
        {
          id: '4',
          question: 'Can I update my availability after accepting an event?',
          answer:
            'Yes, you can update your availability by going to the event details and selecting a new time slot, as long as the event hasn\'t started yet.',
        },
      ],
    },
    {
      section: 'Earnings and Rewards',
      items: [
        {
          id: '5',
          question: 'How do I create an account on Flexxa?',
          answer:
            'Download the app, sign up with your email or phone number, and follow the setup process to complete your profile.',
        },
        {
          id: '6',
          question: 'Why do I need to verify my identity?',
          answer:
            'Identity verification helps us maintain a safe and trusted community. It ensures that all users are authentic and helps prevent fraudulent activities.',
        },
      ],
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>FAQs</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Frequently Asked Questions</Text>
          <Text style={styles.subtitle}>
            Get quick answers to common questions about Flexxa.
          </Text>

          {faqData.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.section}</Text>

              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.faqItem}
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.questionRow}>
                    <Text style={styles.question}>{item.question}</Text>
                    <Feather
                      name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color="#333"
                    />
                  </View>

                  {expandedId === item.id && (
                    <Text style={styles.answer}>{item.answer}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 28,
    lineHeight: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  question: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginRight: 12,
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
});