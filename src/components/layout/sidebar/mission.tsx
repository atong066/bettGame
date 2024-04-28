import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import './mission.css'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../main/userCenter/common/table';
import eventDetails from '../../main/eventPage/eventDetails';
import { missTittle2, missionTitle } from '../../main/userCenter/common/selectOtions';
import NoData from '../../noData/no-data';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function DefaultType(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const color = ChangeColorPallte()
  const defaultTypedata = props.data

  async function taskDetails() {
    const response = await axios.post('/getTaskDetail.do', {
      taskId: defaultTypedata.id
    }, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
  }

  return (
    <>
      <div className="contextBox" style={{ backgroundColor: color.third }}>
        <label htmlFor="">{defaultTypedata?.title}</label>
        <div className='imgContainer'>
          {defaultTypedata?.titleImg && <img src={defaultTypedata?.titleImg} alt="" />}
        </div>
        <div className='missionLabels'>
          {defaultTypedata?.actDesc}
        </div>
      </div>
    </>
  )
}
function Type1Mission(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const type1Data = props.data
  const color = ChangeColorPallte()
  async function taskDetails() {
    const response = await axios.post('/getTaskDetail.do', {
      taskId: type1Data.id
    }, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
  }

  return (
    <>
      <div className="banner" style={{ backgroundColor: color.third }}>
        <div className="phoneImageBox">
          <img src="/sidebarImages/downloadPhone.png" alt="Download Phone" className="phoneImage" />
        </div>
        <div className="labelBox">
          <label className="boxLabel">Download APP,Install and log in to the APP for the first time</label>
          <label className="boxLabel bonusLabel" style={{ color: color.text }}>Bonus: <span className="boxLabel labelContent" style={{ color: color.forGround }}>{type1Data.taskBonus}</span></label>
        </div>
        <div className="buttonBox">
          <Button style={{ backgroundColor: color.forGround, color: color.text }} variant="contained" className="downloadButton">{t("ts650", { ns: "ts" })}</Button>
        </div>
      </div>
      <div className="contextBox" style={{ backgroundColor: color.third }}>
        <div className='imgContainer'>
          {type1Data.titleImg && <img src={type1Data.titleImg} alt="" />}
        </div>
        <div className='missionLabels'>
          {type1Data.actDesc}
        </div>
      </div>
    </>
  )
}
function Type2Mission(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const type2Data = props.data
  const color = ChangeColorPallte()
  async function taskDetails() {
    const response = await axios.post('/getTaskDetail.do', {
      taskId: type2Data.id
    }, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
  }
  return (
    <>
      <div className="contextBox" style={{ backgroundColor: color.backGorund }}>

        <div className='missionLabels' style={{ textAlign: "center", fontSize: "20px", color: "white", textIndent: "0" }}>
          <div className='missionTitle'> {type2Data.title}</div>
          <Table>
            <TableHeader>
              <TableRow>
                {type2Data.taskTargetType === 2 ? <TableCell>{t("ts617", { ns: "ts" })}</TableCell> : <TableCell>{t("ts809", { ns: "ts" })}</TableCell>}
                <TableCell>{t("ts602", { ns: "ts" })}</TableCell>
              </TableRow>

            </TableHeader>
            <TableBody>

              {Object.keys(type2Data?.bonusConfigs).length !== 0 && JSON.parse(type2Data?.bonusConfigs).map((item: any, index: number) =>
                <TableRow key={index}>
                  <TableCell>{'≥'} {item.money}</TableCell>
                  <TableCell>{item.giftMoney}</TableCell>
                </TableRow>
              )
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
function MissionModal(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const missionInfo = props.children
  const color = ChangeColorPallte()
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md');
  const [actButton, setActButton] = useState<any>(0)

  const activeBackGround = { backgroundColor: color.forGround, color: color.text, height: "7ch" }
  const inactiveBackGround = { backgroundColor: color.third, color: color.text, height: "7ch" }

  function getTabContent(value: any) {
    // const arivalType=missionInfo[value]?.newArrivalTaskType
    const type = missionInfo[value]?.type
    switch (type) {
      case 1:
        const arivalType = missionInfo[value]?.newArrivalTaskType
        switch (arivalType) {
          case 1:
            return <Type1Mission data={missionInfo[value]} />
          default:
            return <DefaultType data={missionInfo[value]} />
        }
      case 2:
        return <Type2Mission data={missionInfo[value]} />
      case 3:
        return <Type2Mission data={missionInfo[value]} />
      default:
        return <DefaultType data={missionInfo[value]} />
    }

  }
  const getTrans = (types: any, sub: any) => {

    if (types == 1) {
      const title = missionTitle.filter((item: any) => item.value === sub.toString())
      return t(title[0].label, { ns: "ts" })
    }
    else if (types == 2 || types == 3) {
      const title = missTittle2.filter((item: any) => item.value === sub.toString())
      return t(title[0].label, { ns: "ts" })

    }
  }
  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={props.openState}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: color.backGorund }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1, fontWeight: 600 }} variant="h6" align='center' component={'span'}>
              {t("ts453", { ns: "ts" })}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.closeModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="missionContainer" style={{ backgroundColor: color.backGorund }}>
          <div className="fixedLeft">
            {
              missionInfo.map((value: any, index: number) =>
                <Button onClick={() => setActButton(index)} variant="contained" className="leftSideButton" style={index == actButton ? activeBackGround : inactiveBackGround}><div className='leftSideButtonTitle'>{getTrans(value.type, value.taskTargetType ? value.taskTargetType : value.newArrivalTaskType)}</div></Button>
              )
            }
            <Button variant="contained" className="leftSideButton" style={{ backgroundColor: color.third, color: color.text }}><Link style={{ color: color.text }} to="/record-collection">{t("ts588", { ns: "ts" })}</Link></Button>
          </div>
          <div className="scrollRight">
            {missionInfo != '' ? getTabContent(actButton) :
              <div className="noDataMissionImpossible" style={{ background: color.third }}>
                <NoData />
              </div>
            }
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default MissionModal