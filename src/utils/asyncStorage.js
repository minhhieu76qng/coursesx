import AsyncStorageComp from '@react-native-community/async-storage';

class AsyncStorage {
  static Keys = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    CURRENT_LANGUAGE: 'CURRENT_LANGUAGE',
    CURRENT_THEME: 'CURRENT_THEME',
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

  static async removeAccessToken() {
    try {
      await AsyncStorageComp.removeItem(AsyncStorage.Keys.ACCESS_TOKEN);
      return true;
    } catch (e) {
      console.log('AsyncStorage -> removeAccessToken -> e', e);
      return false;
    }
  }

  static async getLanguage() {
    try {
      const language = await AsyncStorageComp.getItem(AsyncStorage.Keys.CURRENT_LANGUAGE);
      return language;
    } catch (e) {
      console.log('AsyncStorage -> getLanguage -> e', e);
      return null;
    }
  }

  static async setLanguage(language) {
    try {
      await AsyncStorageComp.setItem(AsyncStorage.Keys.CURRENT_LANGUAGE, language);
      return true;
    } catch (e) {
      console.log('AsyncStorage -> setLanguage -> e', e);
      return false;
    }
  }

  static async setThemeMode(theme) {
    try {
      await AsyncStorageComp.setItem(AsyncStorage.Keys.CURRENT_THEME, theme);
      return true;
    } catch (e) {
      console.log('AsyncStorage -> setThemeMode -> e', e);
      return false;
    }
  }

  static async getThemeMode() {
    try {
      const language = await AsyncStorageComp.getItem(AsyncStorage.Keys.CURRENT_THEME);
      return language;
    } catch (e) {
      console.log('AsyncStorage -> getThemeMode -> e', e);
      return null;
    }
  }
}

export default AsyncStorage;
