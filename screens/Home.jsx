import {View} from "react-native";
import {StatusBar} from "expo-status-bar";
import axios from "axios";
import {API_VERSION, MICROSOFT_TRANSLATOR_URL} from "../configs/environment";
import {useCallback, useEffect, useState} from "react";
import styled from "styled-components/native";
import {useFonts} from "expo-font";
import {LanguagePicker} from "../components/LanguagePicker";
import debounce from "lodash.debounce";
import {convertLanguageItemsToList} from "../utils/language-items";
import ActiveLanguagesProvider from "../providers/ActiveLanguagesProvider";

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
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(158, 158, 158, .5);
  z-index: 100;
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
  overflow-y: scroll;
  z-index: 0;
`;

const InputToTranslate = styled.TextInput`
  width: 100%;
  height: calc((100% - 136.5px) / 2);
  padding: 10px 12px;
  text-align: start;
  fontFamily: "Bitter-Regular";
  font-size: 18px;
  font-weight: 500;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(158, 158, 158, .5);
`;

const TranslationResultText = styled.Text`
  fontSize: 18px;
  fontFamily: "Raleway-Bold";
  color: #000;
  fontWeight: 700;
  padding: 20px 0 12px 0;
  margin: 0 12px;
  border-bottom-width: ${props => props.isEmpty ? '1px' : '0'};
  border-bottom-style: solid;
  border-bottom-color: rgba(158, 158, 158, .5);
`;

export const Home = () => {
    const [languageItems, setLanguageItems] = useState([]);
    const [textToTranslate, setTextToTranslate] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [outputLanguageParam, setOutputLanguageParam] = useState('en');
    const [fontsLoaded] = useFonts({
        'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
        'Bitter-Regular': require('../assets/fonts/Bitter-Regular.ttf')
    });

    const fetchLanguageItems = () => {
        axios.get(`${MICROSOFT_TRANSLATOR_URL}/languages`, {
            params: {
                'api-version': API_VERSION
            },
            headers: {
                'Ocp-Apim-Subscription-Key': 'b395cb02cea349fe94a98f2e43d4ffb4',
                'Ocp-Apim-Subscription-Region': 'westeurope',
            },
        })
            .then(({data: {translation}}) => {
                setLanguageItems(convertLanguageItemsToList(translation));
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleTranslateInputChange = (textToTranslate) => {
        setTextToTranslate(textToTranslate)
        debouncedTextTranslate(textToTranslate);
    }

    const debouncedTextTranslate = useCallback(
        debounce((textToTranslate) => {
            axios.post(`${MICROSOFT_TRANSLATOR_URL}/translate`,
                [
                    {
                        text: textToTranslate,
                    },
                ],
                {
                    params: {
                        'api-version': API_VERSION,
                        to: outputLanguageParam,
                    },
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'b395cb02cea349fe94a98f2e43d4ffb4',
                        'Ocp-Apim-Subscription-Region': 'westeurope',
                        'Content-Type': 'application/json',
                    },
                })
                .then(({data}) => {
                    setTranslatedText(data[0].translations[0].text);
                })
                .catch((error) => {
                    console.error(error);
                })
        }, 500), [outputLanguageParam]);

    useEffect(fetchLanguageItems, []);

    if (!fontsLoaded) {
        console.error('Fonts are not loaded!');
    }

    return (
        <ActiveLanguagesProvider>
            <MainView>
                <Header>
                    <Logo>transbro</Logo>
                    <View>
                        {
                            languageItems?.length &&
                            <LanguagePicker
                                languageItems={languageItems}
                                onOutputLanguageChange={(outputParam) => {
                                    setOutputLanguageParam(outputParam);
                                    // TODO: translate text on picker update, try with useEffect(trigger debounce? or search?) on input/output language change Ex. useEffect()
                                }}
                            >
                            </LanguagePicker>
                        }
                    </View>
                </Header>
                <MainContent>
                    <InputToTranslate
                        multiline={true}
                        value={textToTranslate}
                        onChangeText={handleTranslateInputChange}
                        placeholder={'Translate...'}
                    />
                    <TranslationResultText
                        isEmpty={!!translatedText}
                    >{translatedText}</TranslationResultText>
                </MainContent>
                <StatusBar style="auto"/>
            </MainView>
        </ActiveLanguagesProvider>
    );
}
