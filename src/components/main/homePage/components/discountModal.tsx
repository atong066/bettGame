import { useEffect, useRef, useState } from "react";
import DiscountModal from "../../common/modal/submit-modal/discount-modal"
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useDiscount } from "../../../hooks/getUserInfoHook";
import { FormControlLabel, Checkbox, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGlobalVariables, useLoginStore } from "../../../globalFunctions/store";
import Cookies from "universal-cookie";
import './discountModal.css'


function DisountModal() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const { isLoading, data: discount, refetch } = useDiscount(); // CustomHook
    const [includType, setIncludeType] = useState(false)
    const [includType2, setIncludeType2] = useState(false)
    const colorP = ChangeColorPallte()
    const userInfo = useGlobalVariables(state => state.userDetails)
    const openModa = useLoginStore(state => state.isOpen)
    const openSubmitModal = useGlobalVariables(state => state.disCountModal)
    const navigate = useNavigate()
    const discountList = useRef()
    const handleSubmitModalClose = () => {
        useGlobalVariables.setState({ disCountModal: false });

    };
    const handleJoinType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeType(event.target.checked);
        setIncludeType2(!event.target.checked);
    };
    const handleJoinType2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeType2(event.target.checked);
        setIncludeType(!event.target.checked);
    };

    if (isLoading == false) {
        try {
            if (discount?.data?.bonusConfigs !== undefined) {
                if (!!discount?.data?.bonusConfigs) {
                    discountList.current = JSON.parse(discount?.data?.bonusConfigs)
                }
            }

        } catch (e) {
            
        }

    }
    function validate() {
        if (userInfo?.isLogin === false) {
            useLoginStore.setState({ isOpen: true })
            useGlobalVariables.setState({ disCountModal: false });
        }
        else {
            const cookies = new Cookies();
            cookies.set('eventID', discount?.data.id);

            navigate('event-details')
        }
    }
    useEffect(() => {
        refetch()
        useGlobalVariables.setState({ disCountModal: true });
    }, [])

    return (
        <DiscountModal
            submitTitle={discount?.data.title}
            openSubModal={discount?.data.popAfterLoginType === 1 ? false : (discount?.data.popAfterLoginType === 2 && openSubmitModal)}
            closeSubModal={handleSubmitModalClose}
        >
            <div className="popUpModalTableContainer" style={{ background: colorP.backGorund }}>
                <div className="table">
                    <div className="tableHeads" style={{ borderColor: colorP.backGorund }}>
                        <div className="tableRow" style={{ background: colorP.third }}>
                            <div className="tableCell">{t("ts832", { ns: "ts" })}</div>
                            <div className="tableCell">{t("ts602", { ns: "ts" })}</div>
                        </div>
                    </div>
                    <div className="tableBodys">
                        {
                            isLoading == false && !!discount?.data?.bonusConfigs && JSON.parse(discount?.data?.bonusConfigs).map((value: any, index: any) =>
                                <div key={index} className="tableRow" style={index % 2 == 0 ? { background: colorP.backGorund } : { background: colorP.third }}>
                                    <div className="tableCell">≥ {value.giftMoney}</div>
                                    <div className="tableCell">{value.depositMoney}</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingTop: ".3rem", paddingBottom: ".05rem" }}>
                <FormControlLabel
                    sx={{
                        marginLeft: "0",
                        ".MuiButtonBase-root": {
                            color: "#313843",
                            fontSize: ".18rem"
                        },
                        ".MuiButtonBase-root.Mui-checked": {
                            color: "#04BE02",
                        },
                        " .MuiTypography-root": {
                            fontSize: ".18rem",
                            color: "#fff",
                            marginLeft: "6px",
                        },
                        " .MuiSvgIcon-root": {
                            width: ".35rem",
                            height: ".35rem",
                        }
                    }}
                    label="Ocultar permanentemente"
                    control={
                        <div className="checkbox-wrapper-4">
                            <input type="checkbox" className="inp-cbx" id="checker" checked={includType} onChange={handleJoinType} />
                            <label className="cbx" htmlFor="checker"><span>
                                <svg width=".18rem" height=".18rem">
                                    <use xlinkHref="#check-4"></use>
                                </svg></span></label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                    }
                />
                <FormControlLabel
                    sx={{
                        marginLeft: ".3rem",
                        ".MuiButtonBase-root": {
                            color: "#313843",
                            fontSize: ".18rem"
                        },
                        ".MuiButtonBase-root.Mui-checked": {
                            color: "#04BE02",
                        },
                        " .MuiTypography-root": {
                            fontSize: ".18rem",
                            color: "#fff",
                            marginLeft: "6px",
                        },
                        " .MuiSvgIcon-root": {
                            width: ".35rem",
                            height: ".35rem",
                        },
                    }}
                    label="Ocultar permanentemente"
                    control={
                        <div className="checkbox-wrapper-4">
                            <input type="checkbox" className="inp-cbx" id="checker" checked={includType2} onChange={handleJoinType2} />
                            <label className="cbx" htmlFor="checker"><span>
                                <svg width=".18rem" height=".18rem">
                                    <use xlinkHref="#check-4"></use>
                                </svg></span></label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                    }
                />
                <Button onClick={validate} style={{ color: "#874404", borderColor: colorP.forGround, height: "fit-content", background: colorP.forGround, marginLeft: "auto", fontSize: ".16rem", borderRadius: ".1rem", textTransform: "capitalize" }} variant='outlined' >{t("ts799", { ns: "ts" })}</Button>
            </div>
        </DiscountModal>
    )
}
export default DisountModal