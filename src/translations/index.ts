import AsyncStorage from "@react-native-async-storage/async-storage";

// All available languages
const translations: any = {
    nl: require("./languages/nl-NL.json"),
    en: require("./languages/en-EN.json")
};

// Fallback language if no language is selected
const fallbackLanguage: {} = translations.nl;


/**
 * GetLanguage Function
 * 
 * Selects language based on value in local storage
 * 
 * @returns { object }
 */
export const getLanguage = async (): Promise<any> => {
    const selectedLanguage: string | null = await AsyncStorage.getItem("language");
    if (typeof selectedLanguage === null) return fallbackLanguage;

    const languages: string[] = Object.keys(translations);
    const languageIndex: number = languages.findIndex((language): boolean => language === selectedLanguage);
    if (languageIndex === -1) return fallbackLanguage;

    return Object.values(translations)[languageIndex];
};

/**
 * SetLanguage Function
 * 
 * Changes value local storage if language exists
 * 
 * @param { string } lang
 */
export const setLanguage = async (lang: string): Promise<void> => {
    const languages: string[] = Object.keys(translations);
    if(!languages.includes(lang)) return;

    await AsyncStorage.setItem("language", lang);
}