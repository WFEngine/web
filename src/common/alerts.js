import Vue from 'vue'
import i18n from '../locales/index'
export const ShowSuccessMessage = (message) => {
    if (!message) {
        Vue.swal({
            position: 'top-end',
            icon: 'success',
            title: i18n.t('base.successful'),
            showConfirmButton: false,
            timer: 1250
        })
    } else {
        Vue.swal({
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1250
        })
    }
}

export const ShowErrorMessage = (message) => {
    if (!message) {
        Vue.swal({
            position: 'top-end',
            icon: 'error',
            title: i18n.t('base.error'),
            showConfirmButton: false,
            timer: 1250
        })
    } else {
        Vue.swal({
            position: 'top-end',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1250
        })
    }
}


export const ShowConfirmDialog = (message) => {
    return new Promise((resolve, reject) => {
        Vue.swal({
            title: i18n.t('base.areYouSure'),
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: i18n.t('base.no'),
            confirmButtonText: i18n.t('base.yes'),
        }).then((result) => {
            if (result.isConfirmed)
                resolve();
            else
                reject();
        })
    })
}
