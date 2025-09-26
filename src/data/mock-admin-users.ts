// Mock admin users - Replace with database later
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  password: string; // In real app, this should be hashed
  role: 'admin' | 'super_admin';
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

// Demo admin users for local testing
export const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@infinityzone.com',
    password: 'admin123', // In production, this should be hashed
    role: 'super_admin',
    firstName: 'Super',
    lastName: 'Admin',
    avatar: '/placeholder-user.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@infinityzone.com',
    password: 'manager123',
    role: 'admin',
    firstName: 'Store',
    lastName: 'Manager',
    avatar: '/placeholder-user.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    username: 'john_admin',
    email: 'john@infinityzone.com',
    password: 'john123',
    role: 'admin',
    firstName: 'John',
    lastName: 'Smith',
    avatar: '/placeholder-user.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
  }
];

// Helper function to find user by credentials
export const findUserByCredentials = (username: string, password: string): AdminUser | null => {
  const user = mockAdminUsers.find(
    u => (u.username === username || u.email === username) && u.password === password && u.isActive
  );
  return user || null;
};

// Helper function to get all admin users
export const getAllAdminUsers = (): Omit<AdminUser, 'password'>[] => {
  return mockAdminUsers.map(({ password, ...user }) => user);
};

// Helper function to add new admin user
export const addAdminUser = (userData: Omit<AdminUser, 'id' | 'createdAt'>): AdminUser => {
  const newUser: AdminUser = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  mockAdminUsers.push(newUser);
  return newUser;
};

// Helper function to update user last login
export const updateLastLogin = (userId: string): void => {
  const userIndex = mockAdminUsers.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    mockAdminUsers[userIndex].lastLogin = new Date().toISOString();
  }
};
