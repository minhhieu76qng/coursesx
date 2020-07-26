import AsyncStorageComp from '@react-native-community/async-storage';

class AsyncStorage {
  static Keys = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
  };

  static async getAccessToken() {
    try {
      const token = await AsyncStorageComp.getItem(AsyncStorage.Keys.ACCESS_TOKEN);
      return token;
    } catch (e) {
      console.log('AsyncStorage -> getAccessToken -> e', e);
      return null;
    }
  }

  static async setAccessToken(token) {
    try {
      await AsyncStorageComp.setItem(AsyncStorage.Keys.ACCESS_TOKEN, token);
      return true;
    } catch (e) {
      console.log('AsyncStorage -> setAccessToken -> e', e);
      return false;
    }
  }
}

export default AsyncStorage;
