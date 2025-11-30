// src/backend/authBackend.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const USERS_KEY = "USERS_DB";
export const LOGGED_IN_KEY = "LOGGED_IN_USER";
export const FIXED_OTP = "1234";

/* LOAD USERS */
export async function loadUsers() {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

/* SAVE USERS */
export async function saveUsers(users: any[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* CHECK IF PHONE EXISTS */
export async function checkPhoneExists(phone: string): Promise<boolean> {
  const users = await loadUsers();
  return users.some((u: any) => u.phone === phone);
}

/* SEND OTP */
export async function sendOtp(phone: string) {
  console.log("Sending OTP:", phone);
  return FIXED_OTP;
}

/* VERIFY OTP */
export async function verifyOtp(code: string): Promise<boolean> {
  return code === FIXED_OTP;
}

/* REGISTER NEW USER */
export async function registerUser(user: { phone: string; name: string; email?: string }) {
  const users = await loadUsers();
  users.push(user);
  await saveUsers(users);

  await AsyncStorage.setItem(LOGGED_IN_KEY, user.phone);
}

/* LOGIN EXISTING USER */
export async function loginUser(phone: string) {
  await AsyncStorage.setItem(LOGGED_IN_KEY, phone);
}

/* CHECK LOGIN STATUS */
export async function isLoggedIn(): Promise<boolean> {
  const phone = await AsyncStorage.getItem(LOGGED_IN_KEY);
  return phone !== null;
}

/* GET LOGGED-IN USER PHONE */
export async function getLoggedInUser(): Promise<string | null> {
  return await AsyncStorage.getItem(LOGGED_IN_KEY);
}

/* GET FULL USER OBJECT */
export async function getCurrentUser() {
  const phone = await getLoggedInUser();
  if (!phone) return null;

  const users = await loadUsers();
  return users.find((u: any) => u.phone === phone) || null;
}

/* LOGOUT */
export async function logout() {
  await AsyncStorage.removeItem(LOGGED_IN_KEY);
}
