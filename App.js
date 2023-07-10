import {Home} from "./screens/Home";
import ActiveLanguagesProvider from "./providers/ActiveLanguagesProvider";
import {useFonts} from "./hooks/useFonts";
import {useState} from "react";
import AppLoading from "expo-app-loading";

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
                onError={() => {}}
            />
        );
    }

    return (
        <ActiveLanguagesProvider>
            <Home/>
        </ActiveLanguagesProvider>
    )
}
