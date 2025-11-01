import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppLoading from '../components/loaders/AppLoading';
import { automaticLogin } from '../database/dbInit';
import { setColorScheme } from '../redux/slices/colorSchemeSlice';
import { getUserDetailsState, setUserDetails } from '../redux/slices/userDetailsSlice';

const ONBOARDING_KEY = 'hasSeenOnboarding';

export default function Index() {
  const dispatch = useDispatch()

  const router = useRouter();

  const profile = useSelector(state => getUserDetailsState(state).profile)

  useEffect(() => {
    const init = async () => {
      try {
        const userData = await automaticLogin();

        if (userData) {
          const { session, user, profile, phone_number } = userData

          dispatch(setUserDetails({
            ...userData
          }))

          checkOnboarding({
            profileFinished: userData?.profile?.gender ? true : false
          })
        }

        throw new Error()

      } catch (error) {
        console.log(error)
        goToSplash()
      }
    };

    init();
  }, []);

  useEffect(() => {
    if(!profile?.usertype) return;

    dispatch(setColorScheme({ usertype: profile?.usertype }))
  }, [profile])

  const checkOnboarding = async ({ profileFinished }) => {

    const seen = await AsyncStorage.getItem(ONBOARDING_KEY);

    if (seen === 'true') {
      if (profileFinished) {
        goHome()

      } else {
        goToFinishProfile()
      }

    } else {
      goToSplash()
    }
  };

  const goHome = () => router.replace('/(main)/(tabs)/home');
  const goToFinishProfile = () => router.replace('/(main)/(tabs)/home');
  const goToSplash = () => router.replace('/splash');

  return (
    <View style={styles.container}>
      <AppLoading
        tempLoading={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
