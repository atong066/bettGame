import Stack from "@mui/material/Stack"
import './promo-reg.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import NoData from "../../noData/no-data";
import { useDeleteLink, useGenerateLink, useGetGenerateLinks, useGetPromoInfo } from "../../hooks/getUserInfoHook";
import Loader from "../../backdropLoader/backdrop-loader";
import RebateDropdown from "./components/rebateDropdown";
import LinkTable from "./components/agentLinkTable";
import FormController from "../common/components/formController";
import { useGlobalVariables } from "../../globalFunctions/store";

export default function PromoRegistration() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [userTypes, setUserType] = useState<any>(120);
    const [linkPage, setLinkPage] = useState<any>(1);
    const userConifg = useGlobalVariables(state => state.userConfig)
    const useGetPromoInfos = useGetPromoInfo(userConifg.username)
    const useGenerateLinks = useGenerateLink()
    const getGenerateLinks = useGetGenerateLinks()
    const useDeleteLinks = useDeleteLink()
    const rebates = useGetPromoInfos?.data?.data
    const [formData, setFormData] = useState<any>({})

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
                }
            }
        },
    };

    const submit = () => {
        useGenerateLinks.mutate(formData)
        useGenerateLinks.reset()
    }

    const hanldeFormData = (event: any) => {
        console.log(event.target.value)
        console.log(event.target.name)
        event.target.name === "accessPage" && setLinkPage(event.target.value)
        event.target.name === "type" && setUserType(event.target.value)
        setFormData({ ...formData, [event.target.name]: event.target.value === 0 ? 0 : event.target.value })
    }
    function promoteCodeType(type: any) {
        if (type == 1) {
            return t("ts360", { ns: ["ts"] })
        }
        else if (type == 2) {
            return t("ts361", { ns: ["ts"] })
        }
    }
    function userType(type: any) {
        if (type == 120) {
            return t("ts274", { ns: ["ts"] })
        }
        else if (type == 130) {
            return t("ts273", { ns: ["ts"] })
        }
    }
    function pageType(type: any) {
        if (type == 1) {
            return t("ts357", { ns: ["ts"] })
        }
        else if (type == 2) {
            return t("ts275", { ns: ["ts"] })
        }
        else if (type == 3) {
            return t("ts276", { ns: ["ts"] })
        }
    }

    useEffect(() => {
        useGetPromoInfos.refetch()
        getGenerateLinks.refetch()
    }, [])

    if (useGetPromoInfos.isSuccess == true) {
        if (!formData.fishing && userConifg?.game?.fishing === 2) {
            formData.fishing = rebates?.fishingArray && rebates?.fishingArray[0]?.value
        }
        if (!formData.live && userConifg?.game?.live === 2) {
            formData.live = rebates?.liveArray && rebates?.liveArray[0]?.value
        }
        if (!formData.chess && userConifg?.game?.chess === 2) {
            formData.chess = rebates?.chessArray && rebates?.chessArray[0]?.value
        }
        if (!formData.egame && userConifg?.game?.egame === 2) {
            formData.egame = rebates?.egameArray && rebates?.egameArray[0]?.value
        }
        if (!formData.esport && userConifg?.game?.esport === 2) {
            formData.esport = rebates?.esportArray && rebates?.esportArray[0]?.value
        }
        if (!formData.lottery && userConifg?.game?.lottery === 2) {
            formData.lottery = rebates?.lotteryArray && rebates?.lotteryArray[0]?.value
        }
        if (!formData.sport && userConifg?.game?.sport === 2) {
            formData.sport = rebates?.sportArray && rebates?.sportArray[0]?.value
        }
        if (!formData.type) {
            formData.type = 120
        }
        if (!formData.accessPage) {
            formData.accessPage = linkPage
        }
    }

    if (useGetPromoInfos.isLoading) {
        return <Loader setLoader={useGetPromoInfos.isLoading}></Loader>
    }
    return (
        <>
            <Loader setLoader={useGetPromoInfos.isLoading}></Loader>
            <div className="promoRegistrationMainContainer">
                <div className="promoMainContainer" style={{ backgroundColor: colorP.backGorund }}>
                    <div className="optionInputContainer">
                        <Stack spacing={2} useFlexGap flexWrap="wrap">
                            <Stack spacing={2} direction={"row"} useFlexGap flexWrap="wrap">
                                <FormController width={"25ch"}>
                                    <InputLabel id="demo-select-small-label">{t("ts253", { ns: ["ts"] })}</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        label={t("ts253", { ns: ["ts"] })}
                                        MenuProps={MenuProps}
                                        value={1}
                                    >
                                        <MenuItem value={1}>{t("ts356", { ns: ["ts"] })}</MenuItem>
                                    </Select>
                                </FormController>
                                <FormController width={"25ch"}>
                                    <InputLabel id="demo-select-small-label">{t("ts254", { ns: ["ts"] })}</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        label={t("ts254", { ns: ["ts"] })}
                                        name="type"
                                        value={userTypes}
                                        onChange={hanldeFormData}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value={120}>{t("ts274", { ns: ["ts"] })}</MenuItem>
                                        <MenuItem value={130}>{t("ts273", { ns: ["ts"] })}</MenuItem>
                                    </Select>
                                </FormController>
                                <FormController width={"25ch"}>
                                    <InputLabel id="demo-select-small-label">{t("ts255", { ns: ["ts"] })}</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        label={t("ts255", { ns: ["ts"] })}
                                        name="accessPage"
                                        value={linkPage}
                                        onChange={hanldeFormData}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value={1}>{t("ts357", { ns: ["ts"] })}</MenuItem>
                                        <MenuItem value={2}>{t("ts275", { ns: ["ts"] })}</MenuItem>
                                        <MenuItem value={3}>{t("ts276", { ns: ["ts"] })}</MenuItem>
                                    </Select>
                                </FormController>
                            </Stack>
                            <Stack
                                useFlexGap flexWrap="wrap"
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                justifyContent="start"
                                alignItems="center">
                                {userConifg?.game?.chess === 2 && <RebateDropdown
                                    rebates={rebates?.chessArray}
                                    MenuProps={MenuProps}
                                    name="chess"
                                    label={t("ts256", { ns: ["ts"] })}
                                    default={rebates?.chessArray && rebates?.chessArray[0]?.value}
                                    onChange={hanldeFormData}
                                />}
                                {userConifg?.game?.egame === 2 && <RebateDropdown
                                    rebates={rebates?.egameArray}
                                    MenuProps={MenuProps}
                                    name="egame"
                                    label={t("ts257", { ns: ["ts"] })}
                                    default={rebates?.egameArray && rebates?.egameArray[0]?.value}
                                    onChange={hanldeFormData}
                                />}
                                {userConifg?.game?.esport === 2 && <RebateDropdown
                                    rebates={rebates?.esportArray}
                                    MenuProps={MenuProps}
                                    name="esports"
                                    label={t("ts258", { ns: ["ts"] })}
                                    default={rebates?.esportArray && rebates?.esportArray[0]?.value}
                                    onChange={hanldeFormData}
                                />}

                                {userConifg?.game?.fishing === 2 && <RebateDropdown
                                    rebates={rebates?.fishingArray}
                                    MenuProps={MenuProps}
                                    name="fishing"
                                    label={t("ts259", { ns: ["ts"] })}
                                    default={rebates?.fishingArray && rebates?.fishingArray[0]?.value}
                                    onChange={hanldeFormData}
                                />}
                                {userConifg?.game?.live === 2 && <RebateDropdown
                                    rebates={rebates?.liveArray}
                                    MenuProps={MenuProps}
                                    name="live"
                                    label={t("ts260", { ns: ["ts"] })}
                                    default={rebates?.liveArray && rebates?.liveArray[0]?.value}
                                    onChange={hanldeFormData}
                                />}
                                {userConifg?.game?.lottery === 2 && <RebateDropdown
                                    rebates={rebates?.lotteryArray}
                                    MenuProps={MenuProps}
                                    name="lottery"
                                    label={t("ts261", { ns: ["ts"] })}
                                    default={rebates?.lotteryArray && rebates?.lotteryArray[0]?.value}
                                    onChange={hanldeFormData}
                                />}
                                {userConifg?.game?.sport === 2 && <RebateDropdown
                                    rebates={rebates?.sportArray}
                                    MenuProps={MenuProps}
                                    label={t("ts262", { ns: ["ts"] })}
                                    name="sports"
                                    default={rebates?.sportArray && rebates?.sportArray[0]?.value}
                                    onChange={hanldeFormData}
                                />}
                                <FormControl sx={{ width: 250 }} size="small">
                                    <Button style={{ backgroundColor: colorP.forGround, color: colorP.text2 }} onClick={submit} type="submit" variant="contained" className="generateButton">{t("ts271", { ns: ["ts"] })}</Button>
                                </FormControl>
                            </Stack>
                        </Stack>
                    </div>
                    <div className="tableContainer">
                        <LinkTable useDeleteLinks={useDeleteLinks} userConifg={userConifg} userType={userType} promoteCodeType={promoteCodeType} pageType={pageType} getGenerateLinks={getGenerateLinks}></LinkTable>
                        {getGenerateLinks?.data?.data.success == false || getGenerateLinks?.data?.data?.rows == '' && <NoData padding={"1rem 0 0 0"} />}
                    </div>
                </div>
            </div>

        </>
    )
}