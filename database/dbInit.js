import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import 'react-native-url-polyfill/auto';
import { getPublicUrl } from '../utils/apiRequests/requestApi';
import { getNotificationToken } from '../utils/notifications/useNotificationHandler';


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

const updateNotificationToken = async ({ userId, usertype }) => {
  console.log("Updating token")

  const tableName = usertype === 'flex' ? 'flex_profiles' : 'flexr_profiles'

  const { notification_token } = await getNotificationToken()

  if (notification_token) {
    const { error: notificationTokenUpdateError } = await supabase
      .from(tableName)
      .update({ notification_token })
      .eq('id', userId)
      .select()
      .single()

    if (notificationTokenUpdateError) {
      console.log(error)
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

export async function login({ email, password, usertype }) {

  const tableName = usertype === 'flex' ? 'flex_profiles' : 'flexr_profiles'

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

  const { publicUrl } = await getPublicUrl({ filePath: profile?.profile_img, bucket_name: 'user_profiles' })

  const _profile = {
    ...profile,
    profile_img: publicUrl
  }

  const { data: userData, error: userDataError } = await fetchUserData({ id: userId })

  if (userDataError || !userData) {
    return { error: userDataError }
  }

  return {
    data: {
      session: authData.session,
      user: authData.user,
      profile: _profile,
      ...userData
    }
  };
}

export async function automaticLogin() {
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
      .from('user_profiles')
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

    const { publicUrl } = await getPublicUrl({ filePath: profile?.profile_img, bucket_name: 'user_profiles' })

    const _profile = {
      ...profile,
      profile_img: publicUrl
    }

    return {
      session,
      user,
      profile: _profile,
      ...userData
    };

  } catch (error) {
    console.log(error)
    return null
  }
}

const fetchUserData = async ({ id }) => {
  return {
    data: { },
    error: null
  }
}

export default supabase