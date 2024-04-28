import * as React from 'react';
import MainLayout from '../../layout';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './fees.css'
import { HeaderWithAction } from '../common/header';
import BillPage from './bill-page';
import BalanceBonus from './balance-bonus';
import Introduction from './introduction';
import { useTranslation } from 'react-i18next';
import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import { TabContainer, TabItem } from '../common/components/tabComponent';
import { useGlobalVariables } from '../../globalFunctions/store';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function Fee(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const value = useGlobalVariables(state => state.tabIndex2)

    function getTab(index: any) {
        switch (index) {
            case 0:
                return <BillPage />
            case 1:
                return <Introduction />
            default:
                return <BillPage />
        }
    }
    return (
        <>
            <MainLayout>
                <section>
                    <div className="feesMainContainer">
                        <HeaderWithAction>{t('ts984', {ns: 'ts'})}</HeaderWithAction>
                        <div className="jurosContentContainer" style={{ backgroundColor: colorP.backGorund }}>
                            <div className="jurosMenuContainer">
                                <BalanceBonus />
                                <Box sx={{ width: '100%' }}>
                                        <TabContainer>
                                            {/* <TabItem className={value === 0 ? "active" : ""} index={0} >{t("ts508", { ns: "ts" })}</TabItem> */}
                                            <TabItem className={value === 0 ? "active" : ""} index={0}>{t("ts509", { ns: "ts" })}</TabItem>
                                            <TabItem className={value === 1 ? "active" : ""} index={1}>{t("ts510", { ns: "ts" })}</TabItem>
                                        </TabContainer>
                                    <div >
                                        {getTab(value)}
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    )
}

export default Fee