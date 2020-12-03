import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../store/index'
import {getLanguage} from '../enums/enumLanguages'

Vue.use(VueI18n)

//#region Locales
import en from './en/index'
import tr from './tr/index'
//#endregion

const messages = {
    en: en,
    tr: tr
}

const locale = () => {
    if(store.getters.isAuthenticated){
        var currentUser = store.getters.getUser;
        var language = getLanguage(currentUser.LanguageId);
        if(language != undefined){
            return language.Language;
        }else{
            return "en";
        }                
    }else{
        return "en";
    }
}

export default new VueI18n({
    locale: locale(),
    messages
})