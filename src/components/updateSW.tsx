import './updateSW.css'

import { useRegisterSW } from 'virtual:pwa-register/react'
import { pwaInfo } from 'virtual:pwa-info'
import { useTranslation } from 'react-i18next'
import { version } from '../version';

console.log(pwaInfo)

function UpdateSW() {

    const { t } = useTranslation();
    
    // replaced dynamically
    //const buildDate = '__DATE__'
    const buildDate = version
    // replaced dyanmicaly
    //const reloadSW = '__RELOAD_SW__'
    const reloadSW = 'true'

    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl, r) {
            console.log(`Service Worker at: ${swUrl}`)
            if (reloadSW === 'true') {
                if (r) {
                    setInterval(() => {
                        //console.log('Checking for sw update')
                        r.update()
                    }, 60000)
                }
            }
            else {
                //console.log('SW Registered: ' + r)
            }
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
    })

    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
    }

    return (
        <div className="ReloadPrompt-container">
            {(offlineReady || needRefresh)
                && (
                    <div className="ReloadPrompt-toast">
                        <div className="ReloadPrompt-message">
                            {<span>{t('appHasUpdate')}</span>}
                        </div>
                        {needRefresh && <button className="ReloadPrompt-toast-button" onClick={() => updateServiceWorker(true)}>{t('appUpdateBtn')}</button>}
                        <button className="ReloadPrompt-toast-button" onClick={() => close()}>{t('appUpdateLaterBtn')}</button>
                    </div>
                )}
            <div className="ReloadPrompt-date">{buildDate}</div>
        </div>
    )
}

export default UpdateSW