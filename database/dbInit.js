import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { DateTime } from 'luxon';
import 'react-native-url-polyfill/auto';
import { getPublicImageUrl } from '../utils/apiRequests/requestApi';
import { getAgeFromDate } from '../utils/dateUtils';
import { getNotificationToken } from '../utils/notifications/useNotificationHandler';
import { convertToTimezone, timezones } from '../utils/utils';


const SUPABASE_URL = 'https://nknoqpcyjcxpoirzizgz.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rbm9xcGN5amN4cG9pcnppemd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NTExNjksImV4cCI6MjA2NzAyNzE2OX0.JmzTn1FOMmplRIiUrQoau0UU5biVVrbQtl0qWoRveI8'


// Secure storage adapter for Expo
const ExpoSecureStoreAdapter = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};


// Create client with persistent session storage
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});


const updateNotificationToken = async ({ userId }) => {
  console.log("Updating token")

  const tableName = 'user_profiles'

  const { notification_token } = await getNotificationToken()

  if (notification_token) {
    const { error: notificationTokenUpdateError } = await supabase
      .from(tableName)
      .update({ notification_token })
      .eq('id', userId)
      .select()
      .single()

    if (notificationTokenUpdateError) {
      console.log(notificationTokenUpdateError)
    }
  }

  return;
}


export async function createOrUpdateOtp({ email }) {

  // 1. Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // 2. Upsert into otps
  const { error: otpError } = await supabase
    .from('otps')
    .upsert(
      {
        email,
        code: otp,
        expires_at: convertToTimezone({
          isoString: DateTime.now().setZone(timezones.UTC).plus({ minutes: 10 }).toISO(),
          targetZone: timezones.UTC
        })
      },
      { onConflict: ['email'] }
    );

  if (otpError) {
    console.log('Error upserting OTP:', otpError);

    return { error: 'Error sending OTP to mail' }
  }

  return { token: otp };
}


export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error);
  }
}


export async function login({ email, password }) {

  const tableName = 'user_profiles'

  // Step 1: Authenticate
  const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError || !authData?.user) {
    console.log('Login error:', loginError);
    return { error: loginError };
  }

  const userId = authData.user.id;

  await updateNotificationToken({ userId })

  // Step 2: Fetch user profile using id
  const { data: profile, error: profileError } = await supabase
    .from(tableName)
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError) {
    console.log('Profile fetch error:', profileError);
    return { error: { message: 'Invalid credentials' } };
  }

  const _profile = { ...profile }

  if (_profile?.profile_imgs) {

    const urls = _profile?.profile_imgs?.map(imgUrl => getPublicImageUrl({ path: imgUrl, bucket_name: 'user_profiles' }))

    _profile['image_urls'] = urls
    _profile['profile_img'] = urls?.[0]
  }

  _profile['age'] = profile?.dob && getAgeFromDate({ dateOfBirth: profile?.dob })

  const { data: userData, error: userDataError } = await fetchUserData({ id: userId })

  if (userDataError || !userData) {
    return { error: userDataError }
  }

  return {
    data: {
      session: authData.session,
      user: authData.user,
      profile: { ..._profile, phoneData: userData.phoneData },
      ...userData
    }
  };
}

export async function automaticLogin() {

  const profileTableName = 'user_profiles'

  try {
    // 1. Get session from SecureStore
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      console.log("No active session");
      return null;
    }

    const user = session.user;
    const userId = user.id;

    await updateNotificationToken({ userId })

    // 2. Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from(profileTableName)
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.log("Error fetching profile:", profileError);
      return null;
    }

    const { data: userData, error: userDataError } = await fetchUserData({ id: userId })

    if (userDataError || !userData) {
      throw new Error()
    }

    const _profile = { ...profile }

    if (_profile?.profile_imgs) {
      const urls = _profile?.profile_imgs?.map(imgUrl => getPublicImageUrl({ path: imgUrl, bucket_name: 'user_profiles' }))

      _profile['image_urls'] = urls
      _profile['profile_img'] = urls?.[0]
    }

    _profile['age'] = profile?.dob && getAgeFromDate({ dateOfBirth: profile?.dob })

    return {
      session,
      user,
      profile: { ..._profile, phoneData: userData.phoneData },
      ...userData
    };

  } catch (error) {
    console.log(error)
    return null
  }
}

const fetchUserData = async ({ id }) => {

  const { data: phoneData, error: phoneError } = await supabase
    .from('unique_phones')
    .select("*")
    .eq("user_id", id)
    .single()

  const { data: flexrRequests, error: flexrRequestsError } = await supabase
    .from('flexr_requests')
    .select(`
      *,
      events (
        *,
        hostInfo: flexr_id ( * )
      )
    `)
    .eq("flex_id", id)

  const { data: myEvents, error: myEventsError } = await supabase
    .from('events')
    .select(`
      *
    `)
    .eq("flexr_id", id)

  if (phoneError || flexrRequestsError || myEventsError) {
    console.log('phoneError', phoneError)
    console.log('flexrRequestsError', flexrRequestsError)
    console.log("myEventsError", myEventsError)
    throw new Error()
  }

  const enrichedFlexrRequests = flexrRequests.map((r) => {

    const { events } = r

    const { hostInfo, cover_imgs } = events

    const evtImageUrls = cover_imgs?.map(imgPath => getPublicImageUrl({ path: imgPath, bucket_name: 'events' }))
    const hostInfoProfileUrl = getPublicImageUrl({ path: hostInfo?.profile_imgs?.[0], bucket_name: 'user_profiles' })

    return {
      ...r,
      events: {
        ...events,
        image_urls: evtImageUrls,
        hostInfo: {
          ...hostInfo,
          image_url: hostInfoProfileUrl
        }
      },
    };
  })

  const enrichedMyEvents = myEvents?.map(evt => {
    const { cover_imgs } = evt

    const image_urls = cover_imgs?.map(imgPath => getPublicImageUrl({ path: imgPath, bucket_name: 'events' }))

    return {
      ...evt,
      image_urls
    }
  })


  return {
    data: {
      phoneData,
      myEvents: enrichedMyEvents,
      flexrRequests: enrichedFlexrRequests
    },
    error: null
  }
}

export const phoneNumberInUse = async ({ country_code, phone_number }) => {
  try {

    const { data, error } = await supabase
      .from("unique_phones")
      .select("*")
      .eq('country_code', country_code)
      .eq('phone_number', phone_number)

    if (error) {
      console.log(error)
      throw new Error()
    }

    if (data?.length === 0) {
      return {
        exists: false,
        error: null
      }
    }

    return {
      exists: true,
      error: null
    }


  } catch (error) {
    console.log(error)

    return {
      exists: null,
      error
    }
  }
}

export default supabase