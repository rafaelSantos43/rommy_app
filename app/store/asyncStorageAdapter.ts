import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorageAdapter = {
  getItem: async (key:any) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting item from AsyncStorage', error);
      return null;
    }
  },
  setItem: async (key:any, value:any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in AsyncStorage', error);
    }
  },
  removeItem: async (key:any) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from AsyncStorage', error);
    }
  },
};

export default asyncStorageAdapter;
