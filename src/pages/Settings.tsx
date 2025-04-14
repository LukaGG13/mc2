import React from 'react';
import { useAuth } from '../contexts/authContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { doSignOut } from '../firebase/auth';
import LocaleSwitcher from '../components/lang';

const Settings: React.FC = () => {
    const { t } = useTranslation();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <div className="settings-content">
                <h4>{t('loggedInStatus')}: {currentUser?.displayName ? currentUser.displayName : currentUser?.email}</h4>
                <button onClick={() => navigate('/')}>{t('goBack')}</button>
                <button onClick={() => doSignOut()}>{t('signOut')}</button>
                <LocaleSwitcher />
            </div>
        </div>
    );
};

export default Settings;