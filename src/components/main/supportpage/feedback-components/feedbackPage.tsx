import Button from '@mui/material/Button';
import { Box, Tab, Tabs, Typography } from "@mui/material";

import { useState } from 'react';
import FeedbackCreate from './feeedbackCreate';
import FeedbackRead from './feedbackRead';
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from '../../../globalFunctions/globalContext';
import { useGlobalVariables } from '../../../globalFunctions/store';

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
    const colorP = ChangeColorPallte()
    const [bonus, setBonus] = useState(0);
    const handleChangeBonus = (newValue: number) => {
        setBonus(newValue);
    };
    function getTab(bonus: any) {
        useGlobalVariables.setState({ showContent: false });
        switch (bonus) {
            case 0:
                return <FeedbackCreate />;
            case 1:
                return <FeedbackRead />;
        }
    }
    return (
        <>
            <div className="bonusContainer" style={{ backgroundColor: colorP.backGorund }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 2, borderColor: '#313843' }}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div className='tab-container'>
                                <button onClick={() => handleChangeBonus(0)} style={bonus == 0 ? { backgroundColor: colorP.forGround, color: colorP.text2 } : { backgroundColor: "#313843", color: "#68707B" }}>{t("ts132", { ns: ["ts"] })}</button>
                                <button onClick={() => handleChangeBonus(1)} style={bonus == 1 ? { backgroundColor: colorP.forGround, color: colorP.text2 } : { backgroundColor: "transparent", color: "#68707B" }}>{t("ts133", { ns: ["ts"] })}</button>
                            </div>
                           {bonus == 1 && <div style={{display:"flex",gap:".05rem",alignItems:"center",marginRight:".2rem"}}>
                                <span style={{color:"#68707b",fontSize:".2rem"}}>{t('ts455', {ns: 'ts'})} <span style={{color:"#ffaa09",fontSize:".2rem"}}>R$ 0,00</span></span>
                                <button className='collectionBtn' disabled><span>{t('ts1071', {ns: 'ts'})}</span></button>
                            </div>}
                        </div>
                    </Box>
                    <div>
                        {getTab(bonus)}
                    </div>
                </Box>
            </div>
        </>
    )
}