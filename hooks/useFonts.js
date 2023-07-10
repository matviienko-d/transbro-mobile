import * as Font from "expo-font";

export const useFonts = async () => {
    await Font.loadAsync({
        'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
        'Bitter-Regular': require('../assets/fonts/Bitter-Regular.ttf')
    });
};
