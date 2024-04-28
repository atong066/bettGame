import { TextField } from "@mui/material"
import { ChangeColorPallte } from "../../../globalFunctions/globalContext"
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { useJoinActibity } from "../../../hooks/getUserInfoHook";
import Loader from "../../../backdropLoader/backdrop-loader";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import SubmitModal from "../../common/modal/submit-modal/submit-modal";

function RequestModal(props: any) {
    const colorP = ChangeColorPallte()
    const { t, i18n } = useTranslation(["home", "main"]);
    const { isLoading, mutate: joinAct, data: jointData, isSuccess, reset } = useJoinActibity()
    const replyFeedBacks = useRef<any>()

    const handleSubmitModalClose = () => {
        props.modalAction(false)
    }
    const handleSubmitModalOpen = (value: any) => {

    }
    const submitReply = (e: any) => {
        const id = props.children.data.id
        const message = replyFeedBacks.current.value
        const payLoad = { id, message }
        joinAct(payLoad)
    }
    if (isSuccess) {
        console.log(".........LOADING...")
        if (jointData.data.success) {
            ToastrPngk({ msg: jointData.data.msg, type: "success" })
            reset()
            props.modalAction(false)
            props.children.refetch()
        }
        else {
            ToastrPngk({ msg: jointData.data.msg, type: "error" })
            reset()
        }
    }
    return (
        <SubmitModal submitAction={submitReply} submitTitle={props?.children?.data?.applyQuestionConfig} openSubModal={props.modalStatus} closeSubModal={handleSubmitModalClose}>
            <div className="replyContainer">
                <Loader setLoader={isLoading}></Loader>
                <TextField
                    className="textAreaReply"
                    id="filled-multiline-static"
                    multiline
                    label={t("ts572", { ns: "ts" })}
                    rows={7}
                    variant="filled"
                    inputRef={replyFeedBacks}
                    sx={{
                        '.MuiFormLabel-root': {
                            color: "#fff !important",
                            fontSize: ".18rem"
                        },
                        '.MuiInputBase-input': {
                            color: "#fff",
                            fontSize: ".18rem"
                        },
                        '.MuiInputBase-root': {
                            backgroundColor: colorP.third,
                            fontSize: ".18rem"
                        },
                        '.css-phksla-MuiInputBase-root-MuiFilledInput-root::after': {
                            borderBottom: "1px solid " + colorP.text,
                        },
                        '.css-phksla-MuiInputBase-root-MuiFilledInput-root.Mui-focused': {
                            backgroundColor: colorP.third,
                        },
                        '.css-phksla-MuiInputBase-root-MuiFilledInput-root:hover': {
                            backgroundColor: colorP.third,
                        },
                    }}
                />
            </div>
        </SubmitModal>
    )
}
export default RequestModal