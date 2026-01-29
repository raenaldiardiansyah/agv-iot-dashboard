// Auth utility functions
export interface User {
  username: string;
  password: string;
}

const USERS_STORAGE_KEY = "agv_users";
const CURRENT_USER_KEY = "operator_id";

/**
 * Get all registered users from storage
 */
export function getUsers(): User[] {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch {
    return [];
  }
}

/**
 * Save users array to storage
 */
function saveUsers(users: User[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Failed to save users:", error);
  }
}

/**
 * Register a new user (sign up)
 * Returns true if successful, false if username already exists
 */
export function signUp(username: string, password: string): { success: boolean; message: string } {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/d7de010a-ed7c-4a1b-a47c-6f7bb4b59610',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.ts:25',message:'signUp called',data:{username,hasPassword:!!password},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  if (!username || !password) {
    return { success: false, message: "Username dan password harus diisi" };
  }

  const users = getUsers();
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/d7de010a-ed7c-4a1b-a47c-6f7bb4b59610',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.ts:32',message:'Checking existing users',data:{userCount:users.length,usernameExists:users.some(u=>u.username===username)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  
  // Check if username already exists
  if (users.some(user => user.username === username)) {
    return { success: false, message: "Username sudah terdaftar" };
  }

  // Add new user
  users.push({ username, password });
  saveUsers(users);
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/d7de010a-ed7c-4a1b-a47c-6f7bb4b59610',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.ts:41',message:'User saved',data:{newUserCount:users.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  return { success: true, message: "Registrasi berhasil" };
}

/**
 * Login with username and password
 * Returns true if credentials are valid, false otherwise
 */
export function login(username: string, password: string): { success: boolean; message: string } {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/d7de010a-ed7c-4a1b-a47c-6f7bb4b59610',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.ts:50',message:'login called',data:{username,hasPassword:!!password},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  if (!username || !password) {
    return { success: false, message: "Username dan password harus diisi" };
  }

  const users = getUsers();
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/d7de010a-ed7c-4a1b-a47c-6f7bb4b59610',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.ts:57',message:'Searching user',data:{userCount:users.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
  // Check if user exists and password matches
  const user = users.find(u => u.username === username);
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/d7de010a-ed7c-4a1b-a47c-6f7bb4b59610',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.ts:61',message:'User found',data:{userFound:!!user,passwordMatch:user?.password===password},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  if (!user) {
    return { success: false, message: "Username tidak ditemukan. Silakan sign up terlebih dahulu." };
  }

  if (user.password !== password) {
    return { success: false, message: "Password salah" };
  }

  // Save current user
  localStorage.setItem(CURRENT_USER_KEY, username);
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/d7de010a-ed7c-4a1b-a47c-6f7bb4b59610',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.ts:72',message:'Login successful',data:{username},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion

  return { success: true, message: "Login berhasil" };
}

/**
 * Check if any users have been registered
 */
export function hasRegisteredUsers(): boolean {
  const users = getUsers();
  return users.length > 0;
}

/**
 * Get current logged in user
 */
export function getCurrentUser(): string | null {
  return localStorage.getItem(CURRENT_USER_KEY);
}

/**
 * Logout current user
 */
export function logout(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

