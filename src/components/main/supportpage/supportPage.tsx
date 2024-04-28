
import Button from '@mui/material/Button';
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { ChangeColorPallte, UserUSerConfig2 } from '../../globalFunctions/globalContext';
import { useGlobalVariables } from '../../globalFunctions/store';
import { TabContainer, TabItem } from '../common/components/tabComponent';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanelTele(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}

function a11yPropsTelegram(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SupportPage() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const [values, setValues] = useState(0);
    const [bonus, setBonus] = useState(0);

    const teleUser = useGlobalVariables(state => state.stationConfig)

    const handleChangeTele = (event: React.SyntheticEvent, newValue: number) => {
        setValues(newValue);
    };
    const handleChangeBonus = (event: React.SyntheticEvent, newValue: number) => {
        setBonus(newValue);
    };

    console.log(teleUser.telegram_url.replace("https://", "").split("/").slice(-1))
    return (
        <>
            <div className="supportBox" style={{ backgroundColor: colorP.backGorund }}>
                <div className="imageBox">
                    <img className="supportImage" src="/supportImages/supportProfile.png" alt="" />
                </div>
                <div className="supportMessage">
                    <div className="supportTitleBox"><label className="supportTitle">{t("ts461", { ns: "ts" })} 24/7</label></div>
                    <div className="supportContentBox"><label className="supportContent">{t("ts460", { ns: "ts" })}</label></div>
                </div>
                <div className="buttonBox">
                    <Button onClick={() => window.open(teleUser.kfUrl, "_blank")} style={{ borderColor: colorP.forGround, color: colorP.forGround }} variant='outlined' className='supportButton'>{t("ts873", { ns: "ts" })}</Button>
                </div>
            </div>

            {teleUser?.stationCode !== "yd101" &&
                <div className="supportBoxContent" style={{ backgroundColor: colorP.backGorund }}>
                    <Box sx={{ ".MuiTabs-scroller": { height: ".7rem" } }}>
                        <TabContainer>
                            <TabItem className="active" index={0}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <img width={23} className="teleImage" src="/supportImages/telegram.png" />
                                    {t("ts131", { ns: ["ts"] })}
                                </div>
                            </TabItem>
                        </TabContainer>
                        {/* <Box sx={{ borderBottom: 1, borderColor: colorP.third, height: ".7rem", backgroundColor: " #1C1E23", borderTopRightRadius: ".1rem", borderTopLeftRadius: ".1rem" }}>
                        <Tabs value={values} onChange={handleChangeTele} TabIndicatorProps={{ style: { backgroundColor: colorP.forGround } }} aria-label="basic tabs example">
                            <Tab  iconPosition="start" icon={ <img width={23}  className="teleImage" src="/supportImages/telegram.png" />} style={{color:"#f0c059"}} className='supportTabs' label={t("ts131", { ns: ["ts"] })} {...a11yPropsTelegram(0)} />
                        </Tabs>
                    </Box> */}
                        <CustomTabPanelTele value={values} index={0}>
                            <div className="supportTele">
                                <div className="teleContent">
                                    <div className="imageBox">
                                        <img className="teleImage" src="/supportImages/telegram.png" />
                                    </div>
                                    <div className="contentBox">
                                        <div className="contentLabel contentTitle">{t("ts873", { ns: "ts" })}</div>
                                        <div className="contentLabel contentLink">
                                            {teleUser?.stationCode === "yd102" ?
                                                (teleUser.telegram_url.replace("https://", "").split("/").slice(-1) !== "" ? teleUser.telegram_url.replace("https://", "").split("/").slice(-1) : teleUser.telegram_url)
                                                :
                                                teleUser.telegram_url
                                            }
                                        </div>
                                    </div>
                                    <div className="boxButton">
                                        <Button onClick={() => window.open(teleUser.telegram_url, "_blank")} style={{ backgroundColor: colorP.forGround, color: colorP.text2 }} variant='contained' className='supportButton'>Contactar agora</Button>
                                    </div>
                                </div>
                            </div>
                        </CustomTabPanelTele>
                    </Box>
                </div>
            }
        </>
    )
}