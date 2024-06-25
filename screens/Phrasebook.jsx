import {SafeAreaView, View, Text} from "react-native";
import styled from "styled-components/native";
import DropDownPicker from "react-native-dropdown-picker";
import {useCallback, useState} from "react";
import { FlashList } from "@shopify/flash-list";
import Feather from '@expo/vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';

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

const BackActionIcon = styled.View`
    cursor: pointer;
    position: absolute;
    width: max-content;
    left: 15px;
    top: 15px;
`;

const PhrasesListItem = styled.View`
    width: 100%;
    display: flex;
    padding: 0 20px;
    margin-top: 15px;
`;

const PhrasesListHeader = styled.Text`
        textTransform: uppercase;
        fontSize: 15px;
        fontFamily: "Raleway-Bold";
        color: #9E9E9E;
        fontWeight: 500;
    `;

const PhrasesListTranslationItem = styled.View`
    marginTop: 8px;
    width: 100%;
    display: flex;
    flexDirection: column;
`;

const TranslatedText = styled.Text`
    fontSize: 17px;
    fontFamily: "Raleway-Bold";
    color: #000;
    fontWeight: 700;
`;

const TextToTranslate = styled.Text`
    padding-top: 5px;
    fontFamily: "Bitter-Regular";
    font-size: 15px;
    font-weight: 400;
`;


export const Phrasebook = ({navigation}) => {
    const [phraseBookStored, setPhraseBookStored] = useState(JSON.parse(localStorage.getItem('phrase-book')));

    useFocusEffect(
        useCallback(() => {
            setPhraseBookStored(JSON.parse(localStorage.getItem('phrase-book')))

            return () => {
            };
        }, [])
    );

    return (
        <SafeAreaView style={{flex: 1}}>
            <MainView>
                <Header>
                    <BackActionIcon>
                        <Feather name="arrow-left" size={24} color="black" onPress={() => navigation.navigate('Home')}/>
                    </BackActionIcon>
                    <Logo>Phrasebook</Logo>
                </Header>
                <MainContent>
                    {
                        phraseBookStored && Object.keys(phraseBookStored)?.map((phrasesLanguageKey, index) => {
                            return <PhrasesListItem
                                    key={phrasesLanguageKey}
                                >
                                    <PhrasesListHeader>{phrasesLanguageKey}</PhrasesListHeader>
                                    <FlashList
                                        key={phrasesLanguageKey}
                                        data={phraseBookStored[phrasesLanguageKey]}
                                        renderItem={({ item }) => <PhrasesListTranslationItem>
                                            <TranslatedText>{item.translatedText}</TranslatedText>
                                            <TextToTranslate>{item.textToTranslate}</TextToTranslate>
                                        </PhrasesListTranslationItem>
                                        }
                                        estimatedItemSize={200}
                                    />
                                </PhrasesListItem>

                        })
                    }
                </MainContent>
            </MainView>
        </SafeAreaView>
    )
}
