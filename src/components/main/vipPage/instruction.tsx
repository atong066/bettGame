import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";

export default function Instruction() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    return (
        <div className="instructionMainContainer" style={{ backgroundColor: color.backGorund }}>
            <div className="titleContainer">
                <div className="titleLabel">
                    <label style={{ color: color.text4 }}>{t("ts693", { ns: "ts" })}</label>
                </div>
            </div>
            <div className='divLine' />
            <div className="instructionContainer">
                <div>1. {t("ts685", { ns: "ts" })} </div>
                <div>2. {t("ts686", { ns: "ts" })} </div>
                <div>3. {t("ts687", { ns: "ts" })} </div>
                <div>4. {t("ts688", { ns: "ts" })} </div>
                <div>5. {t("ts689", { ns: "ts" })} </div>
                <div>6. {t("ts690", { ns: "ts" })} </div>
                <div>7. {t("ts691", { ns: "ts" })} </div>
                <div>8. {t("ts692", { ns: "ts" })} </div>
            </div>
        </div>
    )
}