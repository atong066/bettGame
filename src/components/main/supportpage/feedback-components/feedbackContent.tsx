import { t } from "i18next"
import { useGlobalList } from "../../../globalFunctions/store"
import { useTranslation } from "react-i18next";


export default function FeedbackContent(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);

    const feedback = useGlobalList(state => state.advice)
    return (
        <>
            <div className="entriesFeedback">
                <div className="sentEntry" >
                    <div style={{ fontSize: '20px', color: "white" }}>{t('ts1203', { ns: 'ts' })} <span style={{ color: "#68707b" }}>{feedback?.advcie?.finalTime}</span></div>
                    <p>
                        {feedback?.advcie?.content}
                    </p>
                </div>
                {
                    feedback?.adviceList?.map((value: any, index: number) =>
                        <div className="receivetEntry">
                            <div style={{ fontSize: '20px', color: "white" }}>{t('ts1203', { ns: 'ts' })}<span style={{ color: "#68707b" }}>{value?.createTime}</span></div>
                            <p>
                                {value?.content}
                            </p>
                        </div>
                    )
                }

            </div>
        </>
    )
}