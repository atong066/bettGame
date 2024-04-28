import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from '../../../globalFunctions/globalContext';
import { ToastrPngk } from '../../../globalFunctions/toastr';

export default function FeedbackCreate() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const feedbackContent = useRef<any>()

    const handleSend = () => {
        sendFeedback()
    }

    async function sendFeedback() {
        try {
            const response = await axios.post('userCenter/advice/saveAdvice.do', {
                sendType: 1,
                content: feedbackContent.current.value,
                load: true
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            if (response.data.success == true) {
                feedbackContent.current.value = null
                ToastrPngk({ msg: response.data.msg, type: "success" })
            } else {
                ToastrPngk({ msg: response.data.msg, type: "error" })
            }
        } catch (error) {
            console.log(`error ${error}`)
        }

    }
    return (
        <>
            <div className="createBonusContainer">
                <div className="textAreaLabelBox"><label className="textAreaLabel">{t("ts135", { ns: ["ts"] })}</label><label className="textAreaLabel textAreaLabelNote">{t("ts136", { ns: ["ts"] })}</label></div>
                <div className="textAreaBox">
                    <textarea
                        ref={feedbackContent}
                        placeholder={t("ts137", { ns: ["ts"] })}
                        className="bonusTextArea"
                        style={{
                            border: "thin solid",
                            borderColor: colorP.forGround,
                            backgroundColor: colorP.third,
                        }}
                    >
                    </textarea>
                    <label className="textAreaCounter">0/200</label>
                </div>
                <div className="noticeImageContainer">
                    <div className="title">{t('ts1148', {ns: 'ts'})} <span style={{ color: "#68707b", fontWeight: "100" }}>{t('ts1149', {ns: 'ts'})}</span></div>
                    <div className='fileUpload' style={{ backgroundColor: colorP.third, borderColor: colorP.forGround, }}>
                        <span className='fileX'></span>
                        <span className='fileY'></span>
                        <input type="file" accept="image/png,image/jpeg,image/jpg,image/gif,video/mp4,video/mp4,video/mp4,video/mp4,video/mp4" />
                    </div>
                    <div className="title"><span style={{ color: "#68707b", fontWeight: "100" }}> {t('ts1155', {ns: 'ts'})}</span></div>
                </div>
                <div className="noticeImageContainer" style={{marginTop: ".4rem"}}>
                    <div className="title">{t("ts138", { ns: ["ts"] })}</div>
                    <div className="titleBody">{t("ts139", { ns: ["ts"] })}</div>
                </div>
                <div className="buttonContainer">
                    <Button style={{ backgroundColor: colorP.forGround, color: colorP.text2 }} onClick={handleSend} variant='contained' className='imagePickerButton'>{t('ts1152', {ns: 'ts'})}</Button>
                </div>
            </div>
        </>
    )
}