import {ActivityIndicator, SafeAreaView, View, TouchableWithoutFeedback, Keyboard} from "react-native";
import {StatusBar} from "expo-status-bar";
import axios from "axios";
import {API_VERSION, MICROSOFT_TRANSLATOR_URL} from "../configs/environment";
import {useCallback, useContext, useEffect, useState} from "react";
import styled from "styled-components/native";
import {LanguagePicker} from "../components/LanguagePicker";
import debounce from "lodash.debounce";
import {convertLanguageItemsToList} from "../utils/language-items";
import {activeLanguagesContext} from "../providers/ActiveLanguagesProvider";
import {LANGUAGES_ITEMS_LIST} from "../mocks/languages";
import Feather from '@expo/vector-icons/Feather';

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
    overflow-y: scroll;
    z-index: 0;
`;

const SpinnerView = styled.View`
    padding: 20px 0 12px 0;
`;

const InpurArea = styled.View`
    position: relative;
    width: 100%;
    min-height: 350px;
    border-bottom-width: 1px;
    borderBottomStyle: 'solid';
    border-bottom-color: rgba(158, 158, 158, .5);
`;

const InputToTranslate = styled.TextInput`
    width: 100%;
    height: 100%;
    padding: 10px 12px;
    text-align: left;
    fontFamily: "Bitter-Regular";
    font-size: 18px;
    font-weight: 500;
`;

const OutputArea = styled.View`
    position: relative;
    width: 100%;
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

const InputTextActionIcon = styled.View`
    cursor: pointer;
    position: absolute;
    width: max-content;
    right: 15px;
    top: 15px;
`;

export const Home = () => {
    const [isLoading, setLoading] = useState(false);
    const [languageItems, setLanguageItems] = useState([]);
    const [textToTranslate, setTextToTranslate] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [inputLanguageValue, setInputLanguageValue, outputLanguageValue, setOutputLanguageValue] = useContext(activeLanguagesContext);

    const fetchLanguageItems = () => {
        // TODO: mocked until microsoft subscription update
        /*axios.get(`${MICROSOFT_TRANSLATOR_URL}/languages`, {
            params: {
                'api-version': API_VERSION
            },
            headers: {
                'Ocp-Apim-Subscription-Key': 'b395cb02cea349fe94a98f2e43d4ffb4',
                'Ocp-Apim-Subscription-Region': 'westeurope',
            },
        })*/
        new Promise(resolve => {
            setTimeout(() => resolve(LANGUAGES_ITEMS_LIST), 1000)
        })
            .then(({data: {translation}}) => {
                setLanguageItems(convertLanguageItemsToList(translation));
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const translateText = (textToTranslate) => {
        setLoading(true);
        // TODO: mocked until microsoft subscription update
        /*axios.post(`${MICROSOFT_TRANSLATOR_URL}/translate`,
            [
                {
                    text: textToTranslate,
                },
            ],
            {
                params: {
                    'api-version': API_VERSION,
                    to: outputLanguageValue,
                },
                headers: {
                    'Ocp-Apim-Subscription-Key': 'b395cb02cea349fe94a98f2e43d4ffb4',
                    'Ocp-Apim-Subscription-Region': 'westeurope',
                    'Content-Type': 'application/json',
                },
            })*/
        new Promise(resolve => {
            setTimeout(() => resolve(textToTranslate
                ? `Translated from: ${textToTranslate}`
                : ''
            ), 1000)
        })
            .then((translatedText) => {
                setLoading(false);
                setTranslatedText(translatedText);
                // TODO: mocked until microsoft subscription update
                // setTranslatedText(data[0].translations[0].text);
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
            translateText(textToTranslate);
        }, 500), [outputLanguageValue]);

    const removeEnteredText = () => {
        setTextToTranslate('');
        debouncedTextTranslate('');
    }

    useEffect(fetchLanguageItems, []);

    useEffect(() => {
        translateText(textToTranslate);
    }, [inputLanguageValue, outputLanguageValue]);

    /*    if (!fontsLoaded) {
            console.error('Fonts are not loaded!');
        }*/

    return (
        <SafeAreaView style={{flex: 1}}>
            <MainView>
                <Header>
                    <Logo>transbro</Logo>
                    <View>
                        {
                            languageItems?.length ?
                                <LanguagePicker
                                    languageItems={languageItems}
                                >
                                </LanguagePicker> : null
                        }
                    </View>
                </Header>
                <MainContent>
                    <InpurArea>
                        <InputTextActionIcon>
                            <Feather name="x" size={24} color="black" onPress={removeEnteredText}/>
                        </InputTextActionIcon>
                        <InputToTranslate
                            multiline={true}
                            value={textToTranslate}
                            onChangeText={handleTranslateInputChange}
                            placeholder={'Translate...'}
                        />
                    </InpurArea>
                    {isLoading ?
                        <SpinnerView>
                            <ActivityIndicator
                                color='#9E9E9E'
                                size="large"
                            />
                        </SpinnerView>
                        : <OutputArea>
                            {
                                translatedText
                                    ? <InputTextActionIcon>
                                        <Feather name="copy" size={24} color="black" />
                                    </InputTextActionIcon>
                                    : null
                            }
                            <TranslationResultText
                                isEmpty={!!translatedText}
                            >{translatedText}</TranslationResultText>
                        </OutputArea>
                    }
                </MainContent>
                <StatusBar style="auto"/>
            </MainView>
        </SafeAreaView>
    );
}
