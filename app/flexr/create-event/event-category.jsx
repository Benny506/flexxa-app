import React, { useState } from 'react';
import {
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
import { useRouter } from 'expo-router';
import BackButton from '../../../components/back-button';
import SetupHeader from '../../(main)/event-setup/auxiliary/SetupHeader';
import CustomDropDown from '../../../components/dropdown/CustomDropDown';

export default function EventCategory() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [celebrityName, setCelebrityName] = useState('');
  const [numOfDancers, setNumOfDancers] = useState('');
  const [dancerType, setDancerType] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  // Main categories
  const categories = [
    { id: 'invite_celebrity', label: 'Invite celebrity' },
    { id: 'hire_fillers', label: 'Hire fillers' },
    { id: 'rent_party_starter', label: 'Rent party starter' },
    { id: 'rent_dancers', label: 'Rent dancers' },
    { id: 'hire_a_stripper', label: 'Hire a stripper' },
    { id: 'hire_video_vixen', label: 'Hire video vixen' },
    { id: 'hire_models', label: 'Hire models' },
  ];

  // Sub-options for different categories
  const partyStarterOptions = [
    { id: 'pool', label: 'Pool' },
    { id: 'house', label: 'House' },
    { id: 'club', label: 'Club' },
    { id: 'concert', label: 'Concert' },
  ];

  const hireFillerOptions = [
    { id: 'seat_fillers', label: 'Seat fillers' },
    { id: 'audience', label: 'Audience' },
    { id: 'crowd_fillers', label: 'Crowd fillers' },
  ];

  const dancerTypeOptions = [
    { value: 'professional', title: 'Professional' },
    { value: 'amateur', title: 'Amateur' },
    { value: 'exotic', title: 'Exotic' },
  ];

  const stripperOptions = [
    { id: 'nude', label: 'Nude' },
    { id: 'mask', label: 'Mask' },
  ];

  const videoVixenOptions = [
    { id: 'main_act', label: 'Main act' },
    { id: 'sub_acts', label: 'Sub acts' },
    { id: 'extras', label: 'Extras' },
  ];

  const modelOptions = [
    { id: 'face_models', label: 'Face models' },
    { id: 'fashion_models', label: 'Fashion models' },
    { id: 'nude_models', label: 'Nude models' },
    { id: 'feet_nails', label: 'Feet and Nails' },
    { id: 'runway', label: 'Runway' },
  ];

  const genderOptions = [
    { value: 'male', title: 'Male' },
    { value: 'female', title: 'Female' },
    { value: 'nonbinary', title: 'Nonbinary' },
    { value: 'all', title: 'All Genders' },
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Reset sub-selections when changing category
    setSelectedSubOption(null);
    setCelebrityName('');
    setNumOfDancers('');
    setDancerType(null);
    setSelectedGender(null);
  };

  const handleSubOptionSelect = (optionId) => {
    setSelectedSubOption(optionId);
  };

  // Show conditional sections based on selection
  const shouldShowCelebrityInput = selectedCategory === 'invite_celebrity';
  const shouldShowHireFillers = selectedCategory === 'hire_fillers';
  const shouldShowPartyStarterOptions = selectedCategory === 'rent_party_starter';
  const shouldShowRentDancers = selectedCategory === 'rent_dancers';
  const shouldShowStripper = selectedCategory === 'hire_a_stripper';
  const shouldShowVideoVixen = selectedCategory === 'hire_video_vixen';
  const shouldShowModels = selectedCategory === 'hire_models';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton onPress={() => router.back()} />
          <Text style={styles.headerTitle}>Event Category</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <SetupHeader activeIndex={1} />
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Section Title */}
          <Text style={styles.sectionTitle}>Event Category</Text>
          <Text style={styles.sectionSubtitle}>Select a category for your event</Text>

          {/* Categories List */}
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryOption,
                  selectedCategory === category.id && styles.categoryOptionActive
                ]}
                onPress={() => handleCategorySelect(category.id)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.label}
                </Text>
                <View style={[
                  styles.radioButton,
                  selectedCategory === category.id && styles.radioButtonActive
                ]}>
                  {selectedCategory === category.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conditional: Celebrity Input */}
          {shouldShowCelebrityInput && (
            <View style={styles.conditionalSection}>
              <Text style={styles.conditionalTitle}>Invite Celebrity</Text>
              <Text style={styles.conditionalSubtitle}>Input a celebrity of choice</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g davido..."
                placeholderTextColor="#999"
                value={celebrityName}
                onChangeText={setCelebrityName}
              />
            </View>
          )}

          {/* Conditional: Hire Fillers */}
          {shouldShowHireFillers && (
            <View style={styles.conditionalSection}>
              <Text style={styles.conditionalTitle}>Hire Fillers</Text>
              <Text style={styles.conditionalSubtitle}>Select an option for hire fillers</Text>
              
              <View style={styles.subOptionsContainer}>
                {hireFillerOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.categoryOption,
                      selectedSubOption === option.id && styles.categoryOptionActive
                    ]}
                    onPress={() => handleSubOptionSelect(option.id)}
                  >
                    <Text style={[
                      styles.categoryText,
                      selectedSubOption === option.id && styles.categoryTextActive
                    ]}>
                      {option.label}
                    </Text>
                    <View style={[
                      styles.radioButton,
                      selectedSubOption === option.id && styles.radioButtonActive
                    ]}>
                      {selectedSubOption === option.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Conditional: Party Starter Sub-options */}
          {shouldShowPartyStarterOptions && (
            <View style={styles.conditionalSection}>
              <Text style={styles.conditionalTitle}>Rent Party Starter</Text>
              <Text style={styles.conditionalSubtitle}>Select an option for rent party starter</Text>
              
              <View style={styles.subOptionsContainer}>
                {partyStarterOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.categoryOption,
                      selectedSubOption === option.id && styles.categoryOptionActive
                    ]}
                    onPress={() => handleSubOptionSelect(option.id)}
                  >
                    <Text style={[
                      styles.categoryText,
                      selectedSubOption === option.id && styles.categoryTextActive
                    ]}>
                      {option.label}
                    </Text>
                    <View style={[
                      styles.radioButton,
                      selectedSubOption === option.id && styles.radioButtonActive
                    ]}>
                      {selectedSubOption === option.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Conditional: Rent Dancers */}
          {shouldShowRentDancers && (
            <View style={styles.conditionalSection}>
              <Text style={styles.conditionalTitle}>Rent Dancers</Text>
              <Text style={styles.conditionalSubtitle}>Input the following details</Text>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Type of dancers</Text>
                <CustomDropDown
                  options={dancerTypeOptions}
                  selectedValue={dancerType?.title}
                  onValueChange={setDancerType}
                  placeholder="Select an option"
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="No of dancers"
                placeholderTextColor="#999"
                value={numOfDancers}
                onChangeText={setNumOfDancers}
                keyboardType="number-pad"
              />

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Gender</Text>
                <CustomDropDown
                  options={genderOptions}
                  selectedValue={selectedGender?.title}
                  onValueChange={setSelectedGender}
                  placeholder="Select an option"
                />
              </View>
            </View>
          )}

          {/* Conditional: Hire Stripper */}
          {shouldShowStripper && (
            <View style={styles.conditionalSection}>
              <Text style={styles.conditionalTitle}>Hire a Stripper</Text>
              <Text style={styles.conditionalSubtitle}>Select an option for hire a stripper</Text>
              
              <View style={styles.subOptionsContainer}>
                {stripperOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.categoryOption,
                      selectedSubOption === option.id && styles.categoryOptionActive
                    ]}
                    onPress={() => handleSubOptionSelect(option.id)}
                  >
                    <Text style={[
                      styles.categoryText,
                      selectedSubOption === option.id && styles.categoryTextActive
                    ]}>
                      {option.label}
                    </Text>
                    <View style={[
                      styles.radioButton,
                      selectedSubOption === option.id && styles.radioButtonActive
                    ]}>
                      {selectedSubOption === option.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Gender</Text>
                <CustomDropDown
                  options={genderOptions}
                  selectedValue={selectedGender?.title}
                  onValueChange={setSelectedGender}
                  placeholder="Select an option"
                />
              </View>
            </View>
          )}

          {/* Conditional: Hire Video Vixen */}
          {shouldShowVideoVixen && (
            <View style={styles.conditionalSection}>
              <Text style={styles.conditionalTitle}>Hire Video Vixen</Text>
              <Text style={styles.conditionalSubtitle}>Select an option for hire video vixen</Text>
              
              <View style={styles.subOptionsContainer}>
                {videoVixenOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.categoryOption,
                      selectedSubOption === option.id && styles.categoryOptionActive
                    ]}
                    onPress={() => handleSubOptionSelect(option.id)}
                  >
                    <Text style={[
                      styles.categoryText,
                      selectedSubOption === option.id && styles.categoryTextActive
                    ]}>
                      {option.label}
                    </Text>
                    <View style={[
                      styles.radioButton,
                      selectedSubOption === option.id && styles.radioButtonActive
                    ]}>
                      {selectedSubOption === option.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Gender</Text>
                <CustomDropDown
                  options={genderOptions}
                  selectedValue={selectedGender?.title}
                  onValueChange={setSelectedGender}
                  placeholder="Select an option"
                />
              </View>
            </View>
          )}

          {/* Conditional: Hire Models */}
          {shouldShowModels && (
            <View style={styles.conditionalSection}>
              <Text style={styles.conditionalTitle}>Hire Models</Text>
              <Text style={styles.conditionalSubtitle}>Select an option for hire models</Text>
              
              <View style={styles.subOptionsContainer}>
                {modelOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.categoryOption,
                      selectedSubOption === option.id && styles.categoryOptionActive
                    ]}
                    onPress={() => handleSubOptionSelect(option.id)}
                  >
                    <Text style={[
                      styles.categoryText,
                      selectedSubOption === option.id && styles.categoryTextActive
                    ]}>
                      {option.label}
                    </Text>
                    <View style={[
                      styles.radioButton,
                      selectedSubOption === option.id && styles.radioButtonActive
                    ]}>
                      {selectedSubOption === option.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Gender</Text>
                <CustomDropDown
                  options={genderOptions}
                  selectedValue={selectedGender?.title}
                  onValueChange={setSelectedGender}
                  placeholder="Select an option"
                />
              </View>
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => console.log('Skip pressed')}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.nextButton}
            onPress={() => {
              console.log('Selected:', {
                category: selectedCategory,
                subOption: selectedSubOption,
                celebrityName,
                dancerType,
                numOfDancers,
                selectedGender
              });
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  categoryOptionActive: {
    borderColor: '#484ED4',
    backgroundColor: '#F8F8FE',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#484ED4',
    fontWeight: '600',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: '#484ED4',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#484ED4',
  },
  conditionalSection: {
    marginTop: 32,
  },
  conditionalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  conditionalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 15,
    color: '#333',
  },
  subOptionsContainer: {
    gap: 12,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  skipButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#484ED4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#484ED4',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
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