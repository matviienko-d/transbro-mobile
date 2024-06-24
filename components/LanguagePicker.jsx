import {useContext, useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import styled from "styled-components/native";
import {activeLanguagesContext} from "../providers/ActiveLanguagesProvider";
import {RECENT_INPUT_LANGUAGES} from "../configs/language-picker";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const LanguageBar = styled.View`
  justifyContent: space-between;
  flexDirection: row;
  margin-top: 16px;
  width: 100%;
`;

const DropdownItem = styled.View`
  width: 43%;
`;

const SwitchLanguagesIcon = styled.View`
    cursor: pointer;
    flex-wrap: wrap;
    flex: 1;
    height: 100%;
    align-content: center;
    justify-content: center;
`;

export const LanguagePicker = ({languageItems}) => {
    const [inputLanguageOpen, setInputLanguageOpen] = useState(false);
    const [outputLanguageOpen, setOutputLanguageOpen] = useState(false);
    const [inputLanguageValue, setInputLanguageValue, outputLanguageValue, setOutputLanguageValue] = useContext(activeLanguagesContext);
    const [items, setItems] = useState([...languageItems]);

    const onInputLanguageOpen = () => {
        setOutputLanguageOpen(false);
    };

    const onOutputLanguageOpen = () => {
        setInputLanguageOpen(false);
    };

    const switchLanguages = () => {
        setOutputLanguageOpen(false);
        setInputLanguageOpen(false);
        setInputLanguageValue(outputLanguageValue);
        setOutputLanguageValue(inputLanguageValue);
    }

    const onSelectItem = (languageItem) => {
        const storedRecentlyUsed = JSON.parse(localStorage.getItem(RECENT_INPUT_LANGUAGES))
        const langItems = [];
        !storedRecentlyUsed?.length && langItems.push({label: 'Recent', value: 'recent'});
        const recentlyUsed = [
            ...new Set([
                languageItem.value, ...(storedRecentlyUsed ?? [])
            ])
        ]
            .slice(0, 3)

        langItems.push(...items.map((languageItem) => {
            if (!languageItem.parent) {
                return languageItem;
            }

            if (recentlyUsed.includes(languageItem.value)) {
                return {
                    ...languageItem,
                    parent: 'recent'
                }
            }

            return {
                ...languageItem,
                parent: 'all'
            }
        }))

        localStorage.setItem(RECENT_INPUT_LANGUAGES, JSON.stringify(recentlyUsed))
        setItems(langItems);
    }

    return (
        <LanguageBar>
            <DropdownItem>
                <DropDownPicker
                    listParentLabelStyle={{
                        fontWeight: "bold"
                    }}
                    categorySelectable={false}
                    searchable={true}
                    style={{
                        backgroundColor: '#FAFAFA',
                        border: '1px solid rgba(158, 158, 158, .25)'
                    }}
                    open={inputLanguageOpen}
                    value={inputLanguageValue}
                    items={items}
                    setOpen={setInputLanguageOpen}
                    setValue={setInputLanguageValue}
                    setItems={setItems}
                    onOpen={onInputLanguageOpen}
                    closeAfterSelecting={true}
                    onSelectItem={onSelectItem}
                />
            </DropdownItem>
            <SwitchLanguagesIcon >
                <FontAwesome6 name="arrows-rotate" size={24} color="black" onPress={switchLanguages}/>
            </SwitchLanguagesIcon>
            <DropdownItem>
                <DropDownPicker
                    listParentLabelStyle={{
                        fontWeight: "bold"
                    }}
                    listChildLabelStyle={{
                        color: "grey"
                    }}
                    categorySelectable={false}
                    searchable={true}
                    style={{
                        backgroundColor: '#FAFAFA',
                        border: '1px solid rgba(158, 158, 158, .25)'
                    }}
                    open={outputLanguageOpen}
                    value={outputLanguageValue}
                    items={items}
                    setOpen={setOutputLanguageOpen}
                    setValue={setOutputLanguageValue}
                    setItems={setItems}
                    onOpen={onOutputLanguageOpen}
                    onSelectItem={onSelectItem}
                />
            </DropdownItem>
        </LanguageBar>
    );
}
