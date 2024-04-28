import { useTranslation } from "react-i18next";
import { useGetMissionTasks } from "../../hooks/curstomHooks";
import MainLayout from "../../layout";
import { missTittle2, missionTitle } from "../userCenter/common/selectOtions";
import './missionPage.css'
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import axios from "axios";
import { Button } from "@mui/material";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import { useState } from "react";
import { useGlobalList, useGlobalVariables } from "../../globalFunctions/store";
import { useNavigate } from "react-router";
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
      <div className="contextBox" style={{ padding: ".2rem" }}>
        <label htmlFor="" style={{ color: color.text4 }}>{defaultTypedata?.title}</label>
        <div className='imgContainer'>
          {defaultTypedata?.titleImg && <img src={defaultTypedata?.titleImg} alt="" />}
        </div>
        <div className='missionLabels' style={{ color: color.text4 }} dangerouslySetInnerHTML={{ __html: defaultTypedata?.actDesc.replace(/\r\n/g, '<br>') }}>
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
      <div className="contextBox" style={{ padding: ".2rem" }}>
        <div className='imgContainer'>
          {type1Data.titleImg && <img src={type1Data.titleImg} alt="" />}
        </div>
        <div className='missionLabels' style={{ color: color.text4 }} dangerouslySetInnerHTML={{ __html: type1Data?.actDesc.replace(/\r\n/g, '<br>') }}>
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
      <div className="contextBox" style={{ padding: ".2rem" }}>

        <div className='missionLabels' style={{ textAlign: "center", fontSize: "20px", color: color.text4, textIndent: "0" }}>
          <div className='missionTitle' style={{ marginBottom: ".2rem" }}> {type2Data.title}</div>
          <Table>
            <TableHeader>
              <TableRow>
                {type2Data.taskTargetType === 2 ? <TableCell><span style={{ color: color.text4 }}>{t("ts617", { ns: "ts" })}</span></TableCell> : <TableCell><span style={{ color: color.text4 }}>{t("ts809", { ns: "ts" })}</span></TableCell>}
                <TableCell><span style={{ color: color.text4 }}>{t("ts602", { ns: "ts" })}</span></TableCell>
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

function Type3Mission(props: any) {
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
      <div className="contextBox" style={{ padding: ".2rem" }}>

        <div className='missionLabels' style={{ textAlign: "center", fontSize: "20px", color: color.text4, textIndent: "0" }}>
          <div className='missionTitle' style={{ marginBottom: ".2rem" }}> {type2Data.title}</div>
          <Table>
            <TableHeader>
              <TableRow>
                {type2Data.taskTargetType === 2 ? <TableCell><span style={{ color: color.text4 }}>{t("ts617", { ns: "ts" })}</span></TableCell> : <TableCell><span style={{ color: color.text4 }}>{t("ts809", { ns: "ts" })}</span></TableCell>}
                <TableCell><span style={{ color: color.text4 }}>{t("ts602", { ns: "ts" })}</span></TableCell>
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

function Mission() {
  const missiondetails = useGetMissionTasks()
  const color = ChangeColorPallte()
  const actButton = useGlobalList(state => state.actButton)
  const staConfig = useGlobalVariables(state => state.stationConfig)
  const navigate = useNavigate()
  const { t, i18n } = useTranslation(["home", "main"]);
  const activeButton = {
    // backgroundImage: "url(" + color.activeTab + ")",
    backgroundColor: color.forGround,
    borderRadius: ".1rem",
    fontSize: ".14rem",
    color: color.text2 + "!important"
  }
  const disabledButton = {
    backgroundColor: "#999",
    borderRadius: ".1rem",
    padding: " 0 .05rem",
    color: color.text2 + "!important",
    width: "1rem",
    fontSize: ".15rem",
    height: ".4rem",
    justifyContent: "center",
  }
  const smallActive = {
    // backgroundImage: "url(" + color.activeTab + ")",
    backgroundColor: color.forGround,
    borderRadius: ".1rem",
    padding: " 0 .05rem",
    color: color.text2 + "!important",
    width: "1rem",
    fontSize: ".15rem",
    height: ".4rem",
    justifyContent: "center",
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
  function getTabContent(value: any) {
    // const arivalType=missionInfo[value]?.newArrivalTaskType

    const type = missiondetails.data[value]?.type
    if (type == 1) {
      const arivalType = missiondetails.data[value]?.newArrivalTaskType
      if (arivalType == 1) {
        return <Type1Mission data={missiondetails.data[value]} />
      }
      else {
        return <DefaultType data={missiondetails.data[value]} />
      }
    } else if (type == 2) {
      return <Type2Mission data={missiondetails.data[value]} />
    } else if (type == 2) {
      return <Type2Mission data={missiondetails.data[value]} />
    } else if (type == 3) {
      return <Type3Mission data={missiondetails.data[value]} />
    } else {
      return <DefaultType data={missiondetails.data[value]} />
    }
  }
  function getMission(index: number) {
    useGlobalList.setState({ actButton: index })
  }
  function goTpReg() {
    navigate("/record-collection")
  }
  return (
    <MainLayout>
      <section>
        <div className="missaoContainer" style={{ marginTop: ".2rem" }}>
          <div className="buttonContainers">
            {/* <button style={activeButton}><span>Benefícios para novos jogadores</span></button> */}
            {
              missiondetails.isSuccess && missiondetails?.data && missiondetails?.data?.map((value: any, index: any) =>
                // <button style={smallActive}><span>{getTrans(value.type, val....ue.taskTargetType ? value.taskTargetType : value.newArrivalTaskType)}</span></button>
                <button onClick={() => getMission(index)} style={activeButton}><span style={{ color: color.text2 }}>{value.title}</span></button>
              )
            }
            <button style={disabledButton}><span style={{ color: color.text2 }}>{t('ts1071', { ns: 'ts' })}</span></button>
            <button onClick={goTpReg} style={smallActive}><span style={{ color: color.text2 }}>{t('ts1072', { ns: 'ts' })}</span></button>
          </div>
          <div className="mainContainerMission">
            {missiondetails.isSuccess && missiondetails.data[actButton]?.type == 1 && missiondetails.data[actButton]?.newArrivalTaskType == 1 &&
              <div className="missionContainer top" style={{ backgroundColor: color.backGorund }}>
                <div className="containerLeft">
                  <img src="https://cdntoos.bullsslot.com/siteadmin/skin/lobby_asset/common/common/task/img_dr.png?manualVersion=1&version=660d463084" alt="" />
                  <div className="missDetailsContainer">
                    <span style={{ color: color.text4, fontSize: ".2rem" }}>{t('ts1073', { ns: 'ts' })}</span>
                    <span>
                      <span style={{ color: "#68707b", fontSize: ".2rem" }}>{t('ts025', { ns: 'ts' })}</span>
                      <span style={{ color: "#ffaa09", fontSize: ".2rem" }}> {missiondetails?.data[actButton]?.taskBonus}</span>
                    </span>
                  </div>
                </div>
                <div className="containerRight">
                  <a style={{ color: color.text2, backgroundColor: color.forGround }} href={staConfig.iosDownloadLink} target="_blank">{t('ts799', { ns: 'ts' })}</a>
                </div>
              </div>}
            <div className="missionContainer bottom" style={{ backgroundColor: color.backGorund }}>
              <div className="details" style={{ width: "100%" }}>
                {missiondetails.isSuccess &&
                  <div style={{ color: "white" }}>
                    {
                      getTabContent(actButton)
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
export default Mission;