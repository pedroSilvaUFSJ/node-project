import { useTranslation } from "vue-i18next";
import i18next from "i18next";

const languageMap = {
    en: { label: "English", dir: "ltr", active: true },
    pt: { label: "Portugues", dir: "ltr", active: false }
};

const LanguageSelect = () => {
    const selected = localStorage.getItem("i18nextLng") || "en";
    const { t } = useTranslation();

    return (
        <div className="d-flex justify-content-end align-items-center language-select-root">
            <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
                {languageMap[selected].label}
                <ArrowDropDown fontSize="small" />
            </Button>
            <Popover
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <div>
                    <List>
                        <ListSubheader>{t("select_language")}</ListSubheader>
                        {Object.keys(languageMap)?.map(item => (
                            <ListItem
                                button
                                key={item}
                                onClick={() => {
                                    i18next.changeLanguage(item);
                                    setMenuAnchor(null);
                                }}
                            >
                                {languageMap[item].label}
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Popover>
        </div>
    );
};

export default LanguageSelect;
