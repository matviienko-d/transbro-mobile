export const convertLanguageItemsToList = (translationLanguages) => {
    return  Object.entries(translationLanguages).map(([key, value]) => {
        return {
            value: key,
            label: value.name
        };
    })
}
