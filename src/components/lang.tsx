import { useEffect } from "react";
import i18n from "../i18n";

export default function LocaleSwitcher() {

    useEffect(() => {
        const lang = localStorage.getItem('language');
        if (lang) {
            i18n.changeLanguage(lang);
        }
    }, []);

    function setLocale(lang: string) {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
    }

    const changeLanguage = (lng: string) => {
        setLocale(lng);
    }

    return (
        <select
            value={i18n.resolvedLanguage}
            onChange={(e) => changeLanguage(e.target.value)}>
            <option value={"en"} key={"en"}>
                English
            </option>
        </select>
    );
}