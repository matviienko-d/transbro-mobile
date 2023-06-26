import {View} from "react-native";
import {StatusBar} from "expo-status-bar";
import axios from "axios";
import {LIBRE_BASE_URL} from "../configs/environment";
import {useEffect, useState} from "react";
import styled from "styled-components/native";
import {useFonts} from "expo-font";
import {LanguagePicker} from "../components/LanguagePicker";

const Logo = styled.Text`
  fontSize: 25px;
  fontFamily: "Raleway-Bold";
  color: #9E9E9E;
  fontWeight: 700;
  text-align: center;
`;

const Header = styled.View`
  padding: 20px 12px;
  width: 100%;
  background-color: #fafafa;
`;

const MainView = styled.View`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: flex-start;
`;

export const Home = () => {
    const [languageItems, setLanguageItems] = useState();
    const [fontsLoaded] = useFonts({
        'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf')
    })

    const fetchLanguageItems = () => {
        axios.get(`${LIBRE_BASE_URL}/languages`)
            .then(({data}) => {
                setLanguageItems(data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(fetchLanguageItems, []);

    if (!fontsLoaded) {
        console.error('Fonts are not loaded!');
    }

    return (
        <MainView>
            <Header>
                <Logo>transbro</Logo>
                <View>
                    {
                        languageItems?.length &&
                        <LanguagePicker
                            languageItems={languageItems}
                        >
                        </LanguagePicker>
                    }
                </View>
            </Header>
            <StatusBar style="auto"/>
        </MainView>
    );
}
