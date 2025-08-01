import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppSettings {
    getUrl: () => Promise<string>;
    BASE_URL: () => Promise<string>;
}

const getUrlFromStorage = async (): Promise<string> => {
    try {
        const val = await AsyncStorage.getItem('selectenv');
        let currentURL = 'https://jwtauth.jwtechinc.com';

        if (val === 'deve') {
            currentURL = 'https://devjwtauth.jwtechinc.com';
            
        } else if (val === 'val') {
            currentURL = 'https://valjwtauth.jwtechinc.com';

        }
        console.log('currentURL',currentURL)
        return currentURL;
    } catch (error) {
        console.error('Error retrieving environment setting:', error);
        return 'https://jwtauth.jwtechinc.com'; 
    }
};

const AppSettings: AppSettings = {
    getUrl: async () => {
        const url = await getUrlFromStorage();
        return url;
    },
    BASE_URL: async () => {
        return await AppSettings.getUrl();
    },

};

export default AppSettings;