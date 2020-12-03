export const languages = [
    {
        Id: 1,
        Language: 'tr'
    },
    {
        Id: 2,
        Language: 'en'
    }
]

export const getLanguage = (languageId) => {
    var returnItem = undefined;
    languages.filter(x => x.Id == languageId).forEach(item => {
        returnItem = item
    })
    return returnItem;
}

