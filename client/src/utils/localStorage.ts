import { User } from '../types';

const addUserToLocalStorage = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
};

const removeUserFromLocalStorage = (): void => {
    localStorage.removeItem('user');
};

// const getUserFromLocalStorage = (): User | null => {
//     const result = localStorage.getItem('user');
//     const user = result ? JSON.parse(result) : null;
//     return user;
// };

const getUserFromLocalStorage = (): User | null => {
    try {
        const result = localStorage.getItem('user');
        return result ? JSON.parse(result) : null;
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
    }
};

export {
    addUserToLocalStorage,
    removeUserFromLocalStorage,
    getUserFromLocalStorage
};
