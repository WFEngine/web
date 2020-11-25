import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

//#region Locales
import en from './en/index'
import tr from './tr/index'
//#endregion

const messages = {
    en: en,
    tr: tr
}

export default new VueI18n({
    locale: 'tr',
    messages
})