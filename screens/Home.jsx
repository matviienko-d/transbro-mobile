import {TextInput, View} from "react-native";
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
  border-bottom: 1px solid rgba(158, 158, 158, .5);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(158, 158, 158, .5);
`;

const MainView = styled.View`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: flex-start;
`;

const MainContent = styled.View`
  width: 100%;
  height: calc(100% - 136.5px);
`;

const InputToTranslate = styled.TextInput`
  width: 100%;
  height: 400px;
  padding: 10px 12px;
  text-align: start;
  fontFamily: "Bitter-Regular";
  font-size: 18px;
  font-weight: 500;
`;

export const Home = () => {
    const [languageItems, setLanguageItems] = useState();
    const [textToTranslate, setTextToTranslate] = useState('');
    const [fontsLoaded] = useFonts({
        'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
        'Bitter-Regular': require('../assets/fonts/Bitter-Regular.ttf')
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
            <MainContent>
                <InputToTranslate
                    multiline={true}
                    value={textToTranslate}
                    onChangeText={(userName) => setTextToTranslate(userName)}
                    placeholder={'Translate...'}
                    /*placeholderStyle={{ textAlignVertical: "top", textAlign: 'start' }}*/
                />
            </MainContent>
            <StatusBar style="auto"/>
        </MainView>
    );
}
