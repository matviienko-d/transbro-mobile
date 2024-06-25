import {Home} from "./screens/Home";
import ActiveLanguagesProvider from "./providers/ActiveLanguagesProvider";
import {useFonts} from "./hooks/useFonts";
import {useState} from "react";
import AppLoading from "expo-app-loading";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Phrasebook} from "./screens/Phrasebook";

const Stack = createNativeStackNavigator();

export default function App() {
    const [IsReady, SetIsReady] = useState(false);

    const LoadFonts = async () => {
        await useFonts();
    };

    if (!IsReady) {
        return (
            <AppLoading
                startAsync={LoadFonts}
                onFinish={() => SetIsReady(true)}
                onError={() => {
                }}
            />
        );
    }

    return (
        <ActiveLanguagesProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen
                        name="Phrasebook"
                        component={Phrasebook}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ActiveLanguagesProvider>
    )
}
