import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import BackButton from '../../../components/back-button';
import SetupHeader from '../../(main)/event-setup/auxiliary/SetupHeader';
import CustomDropDown from '../../../components/dropdown/CustomDropDown';
import DatePicker from '../../../components/DatePicker';

export default function BasicInfo() {
  const router = useRouter();

  // Form state
  const [eventImage, setEventImage] = useState(null);
  const [eventName, setEventName] = useState('');
  const [aboutEvent, setAboutEvent] = useState('');
  const [eventType, setEventType] = useState(null);
  const [eventVenue, setEventVenue] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [eventMonth, setEventMonth] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState('0 hours');
  const [genderRequest, setGenderRequest] = useState(null);
  const [minFlexes, setMinFlexes] = useState('');
  const [maxFlexes, setMaxFlexes] = useState('');
  const [flexPayment, setFlexPayment] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [otherInterests, setOtherInterests] = useState('');
  const [eventInstructions, setEventInstructions] = useState('');

  // Modal states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Dropdown options
  const eventTypes = [
    { value: 'party', title: 'Party' },
    { value: 'concert', title: 'Concert' },
    { value: 'club', title: 'Club Event' },
    { value: 'pool', title: 'Pool Party' },
    { value: 'corporate', title: 'Corporate Event' },
  ];

  const genderOptions = [
    { value: 'male', title: 'Male' },
    { value: 'female', title: 'Female' },
    { value: 'nonbinary', title: 'Nonbinary' },
    { value: 'all', title: 'All Genders' },
  ];

  const activities = ['Music', 'Stripping', 'Social', 'Games', 'Networking', 'Others'];

  // Image picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setEventImage(result.assets[0].uri);
    }
  };

  // Toggle activity selection
  const toggleActivity = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Date/Time handlers
  const handleDateConfirm = ({ fullDate, day, month }) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    setEventDate(day);
    setEventMonth(monthNames[month]);
    setShowDatePicker(false);
  };

  const handleStartTimeConfirm = ({ hour, minute }) => {
    const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    setStartTime(formattedTime);
    setShowStartTimePicker(false);
    calculateDuration(formattedTime, endTime);
  };

  const handleEndTimeConfirm = ({ hour, minute }) => {
    const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    setEndTime(formattedTime);
    setShowEndTimePicker(false);
    calculateDuration(startTime, formattedTime);
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return;
    
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    
    let totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle next day
    
    const hours = Math.floor(totalMinutes / 60);
    setDuration(`${hours} hours`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton onPress={() => router.back()} />
          <Text style={styles.headerTitle}>Event Setup</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <SetupHeader activeIndex={0} />
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Add Photo */}
          <TouchableOpacity style={styles.photoUpload} onPress={pickImage}>
            {eventImage ? (
              <Image source={{ uri: eventImage }} style={styles.uploadedImage} />
            ) : (
              <>
                <Ionicons name="image-outline" size={32} color="#999" />
                <Text style={styles.addPhotoText}>+ Add Photo</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Event Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name of your event"
              placeholderTextColor="#999"
              value={eventName}
              onChangeText={setEventName}
            />
          </View>

          {/* About Event */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>About Event</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your event"
              placeholderTextColor="#999"
              value={aboutEvent}
              onChangeText={setAboutEvent}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Event Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Type</Text>
            <CustomDropDown
              options={eventTypes}
              selectedValue={eventType?.title}
              onValueChange={setEventType}
              placeholder="Select an option"
            />
          </View>

          {/* Event Venue */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Venue</Text>
            <TextInput
              style={styles.input}
              placeholder="Input venue"
              placeholderTextColor="#999"
              value={eventVenue}
              onChangeText={setEventVenue}
            />
          </View>

          {/* Event Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Date</Text>
            <View style={styles.dateRow}>
              <TouchableOpacity 
                style={[styles.input, styles.dateInput]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={eventDate ? styles.dateText : styles.placeholderText}>
                  {eventDate || 'Date'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.input, styles.dateInput]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={eventMonth ? styles.dateText : styles.placeholderText}>
                  {eventMonth || 'Month'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Event Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Time</Text>
            <View style={styles.timeRow}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>Start time</Text>
                <TouchableOpacity 
                  style={styles.timeInput}
                  onPress={() => setShowStartTimePicker(true)}
                >
                  <Text style={startTime ? styles.dateText : styles.placeholderText}>
                    {startTime || '00:00'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>End time</Text>
                <TouchableOpacity 
                  style={styles.timeInput}
                  onPress={() => setShowEndTimePicker(true)}
                >
                  <Text style={endTime ? styles.dateText : styles.placeholderText}>
                    {endTime || '00:00'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>Duration</Text>
                <View style={styles.durationInput}>
                  <Text style={styles.durationText}>{duration}</Text>
                  <Ionicons name="chevron-down" size={16} color="#999" />
                </View>
              </View>
            </View>
          </View>

          {/* Gender Request */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender request</Text>
            <CustomDropDown
              options={genderOptions}
              selectedValue={genderRequest?.title}
              onValueChange={setGenderRequest}
              placeholder="Select an option"
            />
          </View>

          {/* Expected Number of Flexes */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Expected number of flexes</Text>
            <View style={styles.flexRow}>
              <View style={styles.flexColumn}>
                <Text style={styles.flexLabel}>Minimum</Text>
                <TextInput
                  style={styles.flexInput}
                  placeholder="0"
                  placeholderTextColor="#999"
                  value={minFlexes}
                  onChangeText={setMinFlexes}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.flexColumn}>
                <Text style={styles.flexLabel}>Maximum</Text>
                <TextInput
                  style={styles.flexInput}
                  placeholder="0"
                  placeholderTextColor="#999"
                  value={maxFlexes}
                  onChangeText={setMaxFlexes}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>

          {/* Flex Payment */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Flex payment</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g ₦20,000"
              placeholderTextColor="#999"
              value={flexPayment}
              onChangeText={setFlexPayment}
              keyboardType="number-pad"
            />
          </View>

          {/* Activities */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Activities</Text>
            <View style={styles.activitiesContainer}>
              {activities.map((activity) => (
                <TouchableOpacity
                  key={activity}
                  style={[
                    styles.activityChip,
                    selectedActivities.includes(activity) && styles.activityChipActive
                  ]}
                  onPress={() => toggleActivity(activity)}
                >
                  <Text style={[
                    styles.activityText,
                    selectedActivities.includes(activity) && styles.activityTextActive
                  ]}>
                    {activity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={[styles.input, { marginTop: 12 }]}
              placeholder="Input other interests"
              placeholderTextColor="#999"
              value={otherInterests}
              onChangeText={setOtherInterests}
            />
          </View>

          {/* Event Instructions */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Instructions</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Type instructions"
              placeholderTextColor="#999"
              value={eventInstructions}
              onChangeText={setEventInstructions}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Next Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={() => {
              // Navigate to next step
              console.log('Form data:', {
                eventImage, eventName, aboutEvent, eventType, eventVenue,
                eventDate, eventMonth, startTime, endTime, duration,
                genderRequest, minFlexes, maxFlexes, flexPayment,
                selectedActivities, otherInterests, eventInstructions
              });
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* Date/Time Pickers */}
        <DatePicker
          visible={showDatePicker}
          onConfirm={handleDateConfirm}
          onCancel={() => setShowDatePicker(false)}
        />
        <DatePicker
          visible={showStartTimePicker}
          onConfirm={handleStartTimeConfirm}
          onCancel={() => setShowStartTimePicker(false)}
        />
        <DatePicker
          visible={showEndTimePicker}
          onConfirm={handleEndTimeConfirm}
          onCancel={() => setShowEndTimePicker(false)}
        />
      </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  photoUpload: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FAFAFA',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  addPhotoText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  dateText: {
    color: '#333',
    fontSize: 14,
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  timeColumn: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  timeInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  durationInput: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationText: {
    color: '#333',
    fontSize: 14,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 12,
  },
  flexColumn: {
    flex: 1,
  },
  flexLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  flexInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#333',
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  activityChip: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activityChipActive: {
    backgroundColor: '#E8E9F8',
    borderColor: '#484ED4',
  },
  activityText: {
    fontSize: 14,
    color: '#666',
  },
  activityTextActive: {
    color: '#484ED4',
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  nextButton: {
    backgroundColor: '#484ED4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});