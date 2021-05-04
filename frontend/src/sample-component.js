import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./languageSelect";

export default function App() {
    const { t } = useTranslation();
    return <>
        <LanguageSelect />
        <p>{t("hello_welcome_to_react")}</p>
        <p>{t("this_is_an_example")}</p>
    </>
}
