import {useContext, useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import styled from "styled-components/native";
import {activeLanguagesContext} from "../providers/ActiveLanguagesProvider";

const LanguageBar = styled.View`
  justifyContent: space-between;
  flexDirection: row;
  margin-top: 16px;
  width: 100%;
`;

const DropdownItem = styled.View`
  width: 43%;
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

    return (
        <LanguageBar>
            <DropdownItem>
                <DropDownPicker
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
                />
            </DropdownItem>
            <DropdownItem>
                <DropDownPicker
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
                />
            </DropdownItem>
        </LanguageBar>
    );
}
