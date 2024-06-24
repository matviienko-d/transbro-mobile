export const convertLanguageItemsToList = (translationLanguages, recentlyUsed) => {
    const languageItemsList =  Object.entries(translationLanguages).map(([key, value]) => {
        return {
            value: key,
            label: value.name,
            parent: recentlyUsed?.includes(key) ? 'recent': 'all'
        };
    })

    recentlyUsed.length && languageItemsList.push({label: 'Recent', value: 'recent'})
    languageItemsList.push({label: 'All', value: 'all'});

    return languageItemsList;
}
