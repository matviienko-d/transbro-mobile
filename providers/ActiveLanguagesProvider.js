
import { createContext, useState } from 'react';

export const activeLanguagesContext = createContext(null);

const ActiveLanguagesProvider = (props) => {
    const [inputLanguageValue, setInputLanguageValue] = useState('uk');
    const [outputLanguageValue, setOutputLanguageValue] = useState('en');

    return (
        <activeLanguagesContext.Provider value={[inputLanguageValue, setInputLanguageValue, outputLanguageValue, setOutputLanguageValue]}>
            {props.children}
        </activeLanguagesContext.Provider>
    );
};

export default ActiveLanguagesProvider;
