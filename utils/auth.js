// utils/auth.js
export const isAdmin = (user) => {
    return user && user.role === 'admin';
  };
  