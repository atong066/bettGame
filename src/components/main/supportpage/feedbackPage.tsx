
import Button from '@mui/material/Button';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useTranslation } from "react-i18next";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanelBonus(props: TabPanelProps) {
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

function a11yPropsBanus(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function FeedbackPage() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const [bonus, setBonus] = useState(0);
    const handleChangeBonus = (event: React.SyntheticEvent, newValue: number) => {
        setBonus(newValue);
    };
    return (
        <>
            <div className="bonusContainer">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 2, borderColor: '#313843' }}>
                        <Tabs value={bonus} onChange={handleChangeBonus} TabIndicatorProps={{ style: { backgroundColor: "#e4b74f" } }} aria-label="basic tabs example">
                            <Tab className='supportTabs' label={t("ts132", { ns: ["ts"] })} {...a11yPropsBanus(0)} />
                            <Tab className='supportTabs' label={t("ts133", { ns: ["ts"] })} {...a11yPropsBanus(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanelBonus value={bonus} index={0}>
                        <div className="createBonusContainer">
                            <div className="textAreaLabelBox"><label className="textAreaLabel">{t('ts1146', {ns:'ts'})}</label><label className="textAreaLabel textAreaLabelNote">{t('ts1147', {ns: 'ts'})}</label></div>
                            <div className="textAreaBox">
                                <textarea
                                    placeholder={t('ts11534', {ns: 'ts'})}
                                    className="bonusTextArea"
                                >
                                </textarea>
                                <label className="textAreaCounter">0/200</label>
                            </div>
                            <div className="imagePickerContainer">
                                <div className="imagePickerLabelBox">
                                    <label className="imagePickerLabel">{t('ts1148', {ns: 'ts'})} </label>
                                    <label className="imagePickerLabel imagePickerLabelNote">{t('ts1149', {ns: 'ts'})}</label>
                                </div>
                                <div className="imagePicker">
                                    <AddIcon className="addIcon"></AddIcon>
                                </div>
                                <label className="imageSizeLabel">{t('ts1145', {ns:'ts'})}</label>
                            </div>
                            <div className="noticeImageContainer">
                                <div className="title">{t('ts1150', {ns:'ts'})}</div>
                                <div className="titleBody">{t('ts1151', {ns:'ts'})}</div>
                            </div>
                            <div className="buttonContainer">
                                <Button variant='contained' className='imagePickerButton'>{t('ts1152', {ns:'ts'})}</Button>
                            </div>
                        </div>
                    </CustomTabPanelBonus>
                    <CustomTabPanelBonus value={bonus} index={1}>
                        <div className="pendingBonus">
                            <div className="pendingContainer">
                                <Button variant='contained' className='pendingButton'>{t('ts153', {ns: 'ts'})}</Button>
                                <label className="pendingTitleContent">R$ 0,00</label>
                                <label className="pendingTitle">{t('ts455', {ns: 'ts'})}</label>
                            </div>
                            <div className="pendingBonusContainer">

                            </div>
                        </div>
                    </CustomTabPanelBonus>
                </Box>
            </div>
        </>
    )
}