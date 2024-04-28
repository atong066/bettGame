import MainLayout from "../../layout";
import './regManagement.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte, UserUSerConfig } from "../../globalFunctions/globalContext";
import { ToastrPngk } from "../../globalFunctions/toastr";
import { useGetPromoInfo, useStationConfig } from "../../hooks/getUserInfoHook";
import { useGetAgentPromoInfo } from "../../hooks/curstomHooks";
import RegFieldsPromoAgent from "./regMgmtComponent/regTextFields";
import RebateDropdown from "../promoRegistrationPage/components/rebateDropdown";
import FormControler from "../common/components/formController";

export default function RegManagement() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const formRef = useRef<any>()
    const regPfields = useGetAgentPromoInfo()
    const config = useStationConfig()
    const userConifg = config?.data?.data
    const getPromoInfo = useGetPromoInfo(userConifg?.username)
    const configList = getPromoInfo?.data?.data

    const [formData, setFormData] = useState<any>({})

    const [type, setUserAgent] = useState<any>(120);
    const [agentType, setAgentType] = useState<any>();
    const [defagentType, setdefagentType] = useState<any[]>([]);

    if (getPromoInfo.isSuccess == true) {
        if (!formData.fishing && userConifg?.game?.fishing === 2) {
            formData.fishing = configList?.fishingArray && configList?.fishingArray[0]?.value
        }
        if (!formData.live && userConifg?.game?.live === 2) {
            formData.live = configList?.liveArray && configList?.liveArray[0]?.value
        }
        if (!formData.chess && userConifg?.game?.chess === 2) {
            formData.chess = configList?.chessArray && configList?.chessArray[0]?.value
        }
        if (!formData.egame && userConifg?.game?.egame === 2) {
            formData.egame = configList?.egameArray && configList?.egameArray[0]?.value
        }
        if (!formData.esport && userConifg?.game?.esport === 2) {
            formData.esport = configList?.esportArray && configList?.esportArray[0]?.value
        }
        if (!formData.lottery && userConifg?.game?.lottery === 2) {
            formData.lottery = configList?.lotteryArray && configList?.lotteryArray[0]?.value
        }
        if (!formData.sport && userConifg?.game?.sport === 2) {
            formData.sport = configList?.sportArray && configList?.sportArray[0]?.value
        }
        if (!formData.type) {
            formData.type = 120
        }
    }

    const handleChangeUserAgent = (event: SelectChangeEvent) => {
        setUserAgent(event.target.value);
        setFormData({ ...formData, ["userType"]: event.target.value })
        setAgentType(event.target.value)
    }

    const handlePromoIP = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value === 0 ? "" : event.target.value })
        console.log(event.target.value)
    }

    async function register(e: any) {
        if (formData['pwd'] !== formData['rpwd']) { ToastrPngk({ msg: t("ts865", { ns: ["ts"] }), type: "error" }); return }
        const response = await axios.post('/userCenter/agentManage/registerSave.do',
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        )
        if (response.data.success == true) {
            ToastrPngk({ msg: response.data.msg, type: "success", id: "020" })
            setFormData({})
        } else {
            ToastrPngk({ msg: response.data.msg, type: "error", id: "010" })
        }
    }

    useEffect(() => {
        if (type == 130) {
            setFormData({ ...formData, ["userType"]: type })
            setdefagentType(regPfields?.data?.memberRegConfigs)
        }
        else {
            setFormData({ ...formData, ["userType"]: type })
            setdefagentType(regPfields?.data?.proxyRegConfigs)
        }
    }, [type, agentType])

    const MenuProps = {

        PaperProps: {
            sx: {
                background: colorP.backGorund,
                color: colorP.text,
                "& em": {
                    fontSize: ".16rem",
                    color: "#68707b !important",
                },
                " .MuiButtonBase-root": {
                    fontSize: ".16rem",
                    color: "#68707b !important",
                },
            }
        },
    };


    return (
        <>
            <section className="regManagementMainContainer">
                <div className="regManagementBodyContainer" style={{ backgroundColor: colorP.backGorund }}>
                    <div className="inputSelectBox">
                        <Stack spacing={2} direction={"column"} alignItems={'center'} sx={{
                            " .MuiInputBase-root": {
                                width: "3.5rem"
                            }
                        }}>
                            <FormControler>
                                <InputLabel id="demo-simple-select-label">{t("ts254", { ns: ["ts"] })}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label={t("ts254", { ns: ["ts"] })}
                                    onChange={handleChangeUserAgent}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value={120}>{t("ts274", { ns: ["ts"] })}</MenuItem>
                                    <MenuItem value={130}>{t("ts273", { ns: ["ts"] })}</MenuItem>
                                </Select>
                            </FormControler>
                            <form ref={formRef} id="formSET">
                                <Stack spacing={2} direction={"column"}>
                                    {
                                        (regPfields.isLoading == false && regPfields.isSuccess) && type == 130 ? regPfields?.data?.memberRegConfigs?.map((item: any, index: any) =>
                                            <>
                                                {
                                                    item.eleName != "captcha" &&
                                                    <RegFieldsPromoAgent valueS={formData} agentType={agentType} handleChange={handlePromoIP}>{item}</RegFieldsPromoAgent>
                                                }
                                            </>

                                        ) : regPfields?.data?.proxyRegConfigs?.map((item: any, index: any) =>
                                            <>
                                                {
                                                    item.eleName != "captcha" &&
                                                    <RegFieldsPromoAgent valueS={formData} agentType={agentType} handleChange={handlePromoIP}>{item}</RegFieldsPromoAgent>
                                                }
                                            </>

                                        )
                                    }
                                </Stack>
                            </form>
                            <Button style={{ backgroundColor: colorP.forGround, color: colorP.text2 }} onClick={register} className="registerButton" variant="contained">{t("ts001", { ns: ["ts"] })}</Button>
                        </Stack>
                    </div>
                    <div className="agentRabateBox">
                        <div className="rebateBoxHeader" style={{ backgroundColor: colorP.forGround }}>
                            <label className="rebateBoxTitle">{t("ts118", { ns: ["ts"] })}</label>
                        </div>
                        <div className="agentRabateBody" style={{ backgroundColor: colorP.third }}>
                            <div className="inputDownBox">

                                {userConifg?.game?.chess === 2 &&
                                    <div className="inputBox" style={{ backgroundColor: colorP.backGorund }}>
                                        <div className="selectBox">
                                            <Box sx={{ minWidth: 120 }}>
                                                <RebateDropdown
                                                    rebates={configList?.chessArray}
                                                    MenuProps={MenuProps}
                                                    label={t("ts280", { ns: ["ts"] })}
                                                    default={configList?.chessArray && configList?.chessArray[0]?.value}
                                                    onChange={handlePromoIP}
                                                />
                                            </Box>
                                        </div>
                                        <div className="imageBox">
                                            <img src="/regManagementImages/qipai_tab_icon_active.png" className="iconImage" />
                                        </div>
                                    </div>}
                                {userConifg?.game?.egame === 2 &&
                                    <div className="inputBox" style={{ backgroundColor: colorP.backGorund }}>
                                        <div className="selectBox">
                                            <Box sx={{ minWidth: 120 }}>
                                                <RebateDropdown
                                                    rebates={configList?.fishingArray}
                                                    MenuProps={MenuProps}
                                                    label={t("ts284", { ns: ["ts"] })}
                                                    default={configList?.fishingArray && configList?.fishingArray[0]?.value}
                                                    onChange={handlePromoIP}
                                                />
                                            </Box>
                                        </div>
                                        <div className="imageBox">
                                            <img src="/regManagementImages/dianzi_tab_icon_active.png" className="iconImage" />
                                        </div>
                                    </div>}
                                {userConifg?.game?.esport === 2 &&
                                    <div className="inputBox" style={{ backgroundColor: colorP.backGorund }}>
                                        <div className="selectBox">
                                            <Box sx={{ minWidth: 120 }}>
                                                <RebateDropdown
                                                    rebates={configList?.esportArray}
                                                    MenuProps={MenuProps}
                                                    label={t("ts281", { ns: ["ts"] })}
                                                    default={configList?.esportArray && configList?.esportArray[0]?.value}
                                                    onChange={handlePromoIP}
                                                />
                                            </Box>
                                        </div>
                                        <div className="imageBox">
                                            <img src="/regManagementImages/icon_esport.png" className="iconImage" />
                                        </div>
                                    </div>}
                                {userConifg?.game?.fishing === 2 &&
                                    <div className="inputBox" style={{ backgroundColor: colorP.backGorund }}>
                                        <div className="selectBox">
                                            <Box sx={{ minWidth: 120 }}>
                                                <RebateDropdown
                                                    rebates={configList?.fishingArray}
                                                    MenuProps={MenuProps}
                                                    label={t("ts285", { ns: ["ts"] })}
                                                    default={configList?.fishingArray && configList?.fishingArray[0]?.value}
                                                    onChange={handlePromoIP}
                                                />
                                            </Box>
                                        </div>
                                        <div className="imageBox">
                                            <img src="/regManagementImages/duyu_tab_icon_active.png" className="iconImage" />
                                        </div>
                                    </div>}
                                {userConifg?.game?.live === 2 &&
                                    <div className="inputBox" style={{ backgroundColor: colorP.backGorund }}>
                                        <div className="selectBox">
                                            <Box sx={{ minWidth: 120 }}>
                                                <RebateDropdown
                                                    rebates={configList?.liveArray}
                                                    MenuProps={MenuProps}
                                                    label={t("ts282", { ns: ["ts"] })}
                                                    default={configList?.liveArray && configList?.liveArray[0]?.value}
                                                    onChange={handlePromoIP}
                                                />
                                            </Box>
                                        </div>
                                        <div className="imageBox">
                                            <img src="/regManagementImages/real_tab_icon_active.png" className="iconImage" />
                                        </div>
                                    </div>}
                                {userConifg?.game?.lottery === 2 &&
                                    <div className="inputBox" style={{ backgroundColor: colorP.backGorund }}>
                                        <div className="selectBox">
                                            <Box sx={{ minWidth: 120 }}>
                                                <RebateDropdown
                                                    rebates={configList?.lotteryArray}
                                                    MenuProps={MenuProps}
                                                    label={t("ts286", { ns: ["ts"] })}
                                                    default={configList?.lotteryArray && configList?.lotteryArray[0]?.value}
                                                    onChange={handlePromoIP}
                                                />
                                            </Box>
                                        </div>
                                        <div className="imageBox">
                                            <img src="/regManagementImages/rebate_tab_icon_active.png" className="iconImage" />
                                        </div>
                                    </div>}
                                {userConifg?.game?.sport === 2 &&
                                    <div className="inputBox" style={{ backgroundColor: colorP.backGorund }}>
                                        <div className="selectBox">
                                            <Box sx={{ minWidth: 120 }}>
                                                <RebateDropdown
                                                    rebates={configList?.sportArray}
                                                    MenuProps={MenuProps}
                                                    label={t("ts283", { ns: ["ts"] })}
                                                    default={configList?.sportArray && configList?.sportArray[0]?.value}
                                                    onChange={handlePromoIP}
                                                />
                                            </Box>
                                        </div>
                                        <div className="imageBox">
                                            <img src="/regManagementImages/sport_tab_icon_active.png" className="iconImage" />
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}