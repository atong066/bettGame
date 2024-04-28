import axios from "axios";
// import Select from 'react-select'
import { useEffect, useReducer, useState } from "react";
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Pagination, Select, Stack, TextField } from "@mui/material";
// import { dates,statuses,depositMethod} from "../../userCenter/common/selectOtions";
import { dates, statuses, depositMethod } from "../../common/selectOtions";
import SearchIcon from '@mui/icons-material/Search';
import { TableHeader, Table, TableRow, TableCell, TableBody } from "../../userCenter/common/table";
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import { DatePicker, DatePickerV2, UserLevel, UserType } from "../../common/components/dropdownComponent";
import DateModal from "../../common/dateModal";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import NoData from "../../../noData/no-data";
import Loader from "../../../backdropLoader/backdrop-loader";
import { ToastrPngk } from "../../../globalFunctions/toastr";
import { useGlobalVariables } from "../../../globalFunctions/store";
function UserList(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const [historySport, setHistorySport] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [accountName, setAccountName] = useState("")
  const [orderID, setOrderID] = useState("")
  const [includType, setIncludeType] = useState(false)
  const [tabs, setActiveTabs] = useState(1)
  const [date, setDate] = useState('');
  const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
  const [userType, setUserType] = useState([])
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")
  const [totalDepo, setTotalDepo] = useState("")
  const [lowerLevel, setLowerLevel] = useState(false)
  const [isData, setIsData] = useState(false)
  const [setLoader, setOpenLoader] = useState(true);
  async function getPersonalReport() {
    setOpenLoader(true)
    try {
      const response = await axios.post('/userCenter/agentManage/userListData.do', {
        startTime: commonReducer.startDate,
        endTime: commonReducer.endDate,
        pageNumber: currentPage,
        include: lowerLevel,
        username: accountName,
        minBalance: minAmount,
        maxBalance: maxAmount,
        depositTotal: totalDepo,
        level: userType
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      if (response.data.success == false) {
        setIsData(false)
        ToastrPngk({ msg: response.data.msg, type: "error", id: "error" })
        setOpenLoader(false);
        return
      }
      if (response.data.rows) {
        if (response.data.rows != '') {
          setPageCount(response.data.totalPageCount)
          setHistorySport(response.data.rows)
          setIsData(true)
          setOpenLoader(false)

        } else {
          setIsData(false)
          setOpenLoader(false)

        }
      } else {
        setIsData(false)
        setOpenLoader(false)

      }
    } catch (error) {
      setIsData(false)
      setOpenLoader(false)
    }
  }

  useEffect(() => {
    getPersonalReport()
  }, [currentPage])
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const handleAccountNameChange = (value: any) => {
    setAccountName(value)
  };
  const handleTotalDepo = (value: any) => {
    setTotalDepo(value);
  };
  const getType = (arrType: any, type: any) => {
    if (arrType == 2) {
      const selType = statuses.find((item: any) => item.value == type)
      return selType ? selType.label : ""
    }
    else if (arrType == 1) {
      const selType = depositMethod.find((item: any) => item.value == type)
      return selType ? selType.label : ""
    }
  }
  const handleMinAmount = (value: any) => {
    setMinAmount(value)
  }
  const handleMaxAmount = (value: any) => {
    setMaxAmount(value)
  }
  const handleLowerLevel = (e: any) => {
    setLowerLevel(e.target.checked)
  }
  const handleGetdateEven = (e: any) => {
    setDate(e.value)
    dispatch({ type: e.value, dates: e })
  }
  const handleUserType = (e: any) => {
    setUserType(e.value)
  }
  function pageType(type: any) {
    if (type == 120) {
      return t("ts274", { ns: ["ts"] })
    } else if (type == 130) {
      return t("ts273", { ns: ["ts"] })
    }
  }
  function pageOnlineSatus(type: any) {
    if (type == 1) {
      return t("ts384", { ns: ["ts"] })
    } else if (type == 2) {
      return t("ts383", { ns: ["ts"] })
    }
  }
  function pageSatus(type: any) {
    if (type == 1) {
      return t("ts386", { ns: ["ts"] })
    } else if (type == 2) {
      return t("ts385", { ns: ["ts"] })
    }
  }

  const GoToTeam = () => {
    useGlobalVariables.setState({ tabIndex2: 1 });
  }

  return (
    <>
      <Loader setLoader={setLoader}></Loader>
      <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
      <div style={{ borderRadius: "7px", padding: ".2rem", backgroundColor: colorP.backGorund }}>
        <div className="accntActions">
          <Stack useFlexGap flexWrap="wrap" spacing={2} direction={"row"}>
            <DatePickerV2 options={dates} onChange={handleGetdateEven} />
            <UserLevel onChange={handleUserType} />
            <TextField
              sx={{
                width: 250,
                "& .MuiInputBase-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colorP.fourth + " !important",
                    fontSize: ".18rem",
                    borderRadius: "1rem",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: colorP.text4 + " !important",
                    fontSize: ".18rem"
                  },
                  height: ".5rem",
                },
                "& .MuiFormLabel-root": {
                  color: "#808080 !important",
                  fontSize: ".18rem",
                  lineHeight: ".3rem"
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  fontSize: ".18rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid !important",
                    borderColor: colorP.forGround + " !important",
                    fontSize: ".18rem"
                  }
                }
              }}
              value={accountName} id="outlined-basic" label={t("ts034", { ns: ["ts"] })} variant="outlined" size="small" onChange={(e) => handleAccountNameChange(e.target.value)} />
            <TextField
              sx={{
                width: 250,
                "& .MuiInputBase-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colorP.fourth + " !important",
                    fontSize: ".18rem",
                    borderRadius: "1rem",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: colorP.text4 + " !important",
                    fontSize: ".18rem"
                  },
                  height: ".5rem",
                },
                "& .MuiFormLabel-root": {
                  color: "#808080 !important",
                  fontSize: ".18rem",
                  lineHeight: ".3rem"
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  fontSize: ".18rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid !important",
                    borderColor: colorP.forGround + " !important",
                    fontSize: ".18rem"
                  }
                }
              }}
              value={totalDepo} id="outlined-basic" label={t("ts369", { ns: ["ts"] })} variant="outlined" size="small" onChange={(e) => handleTotalDepo(e.target.value)} />
            <TextField
              sx={{
                width: 250,
                "& .MuiInputBase-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colorP.fourth + " !important",
                    fontSize: ".18rem",
                    borderRadius: "1rem",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: colorP.text4 + " !important",
                    fontSize: ".18rem"
                  },
                  height: ".5rem",
                },
                "& .MuiFormLabel-root": {
                  color: "#808080 !important",
                  fontSize: ".18rem",
                  lineHeight: ".3rem"
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  fontSize: ".18rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid !important",
                    borderColor: colorP.forGround + " !important",
                    fontSize: ".18rem"
                  }
                }
              }}
              value={minAmount} id="outlined-basic" label={t("ts370", { ns: ["ts"] })} variant="outlined" size="small" onChange={(e) => handleMinAmount(e.target.value)} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: ".18rem !important"
              }}
            >
              <label style={{ color: colorP.text, fontSize: 18 }}>~</label>
            </div>
            <TextField
              sx={{
                width: 250,
                "& .MuiInputBase-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colorP.fourth + " !important",
                    fontSize: ".18rem",
                    borderRadius: "1rem",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: colorP.text4 + " !important",
                    fontSize: ".18rem"
                  },
                  height: ".5rem",
                },
                "& .MuiFormLabel-root": {
                  color: "#808080 !important",
                  fontSize: ".18rem",
                  lineHeight: ".3rem"
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  fontSize: ".18rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid !important",
                    borderColor: colorP.forGround + " !important",
                    fontSize: ".18rem"
                  }
                }
              }}
              value={maxAmount} id="outlined-basic" label={t("ts371", { ns: ["ts"] })} variant="outlined" size="small" onChange={(e) => handleMaxAmount(e.target.value)} />
            <FormControlLabel
              sx={{
                color: colorP.text,
                ".MuiCheckbox-root": {
                  color: colorP.fourth + " !important",
                },
                ".MuiCheckbox-root.Mui-checked": {
                  color: "#04be02 !important",
                },
                ".MuiSvgIcon-root": {
                  fontSize: ".25rem"
                },
                ".MuiTypography-root": {
                  fontSize: ".18rem",
                  color: "#adb6c3"
                },
              }}
              control={<Checkbox onChange={(e) => handleLowerLevel(e)} />} label={t("ts057", { ns: ["ts"] })} />
            {/* <Button style={{ backgroundColor: colorP.forGround }} onClick={() => getPersonalReport()} variant='contained' className="searchButton" startIcon={<SearchIcon />}>{t("ts042", { ns: ["ts"] })}</Button> */}
            <Button style={{ backgroundColor: colorP.forGround, fontSize: ".18rem", textTransform: "capitalize", borderRadius: ".1rem", color: colorP.text2, height: ".5rem" }} onClick={() => getPersonalReport()} variant='contained' className="searchButton" startIcon={<SearchIcon style={{ height: ".2rem", width: ".2rem" }} />}>{t("ts042", { ns: ["ts"] })}</Button>

          </Stack>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts056", { ns: ["ts"] })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts372", { ns: ["ts"] })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts373", { ns: ["ts"] })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts374", { ns: ["ts"] })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts375", { ns: ["ts"] })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts376", { ns: ["ts"] })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts377", { ns: ["ts"] })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts378", { ns: ["ts"] })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts379", { ns: ["ts"] })}</span></TableCell>
              <TableCell><span style={{ color: colorP.text4 }}>{t("ts380", { ns: ["ts"] })}</span></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isData == true && historySport.map((value: any, index: any) =>
              <TableRow key={index}>
                <TableCell>{value.username}</TableCell>
                <TableCell>{value.level}</TableCell>
                <TableCell>{value.degreeName}</TableCell>
                <TableCell>{pageType(value.type)}</TableCell>
                <TableCell>{value.createDatetime}</TableCell>
                <TableCell>{value.lastLoginDatetime}</TableCell>
                <TableCell>{pageOnlineSatus(value.onlineStatus)}</TableCell>
                <TableCell><span style={{ color: "#ffaa09" }}>{value.money}</span></TableCell>
                <TableCell>{pageSatus(value.status)}</TableCell>
                <TableCell>
                  <Stack spacing={1} >
                    <Button onClick={GoToTeam} style={{ width: "1.5rem", backgroundColor: colorP.forGround, color: colorP.text2, textTransform: "capitalize" }} className="operationButtonUserList" size="small" variant="contained">{t("ts381", { ns: ["ts"] })}</Button>
                    <Link to="/account-details"><Button style={{ width: "1.5rem", backgroundColor: colorP.forGround, color: colorP.text2, textTransform: "capitalize" }} className="operationButtonUserList" size="small" variant="contained">{t("ts382", { ns: ["ts"] })}</Button></Link>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {isData != true ? <NoData padding={"1rem 0 0 0"} /> :
          <div className="pagination">
            <Pagination variant="outlined" shape="rounded" sx={{
              ".MuiButtonBase-root": {
                height: ".4rem",
                width: ".4rem",
                color: colorP.text4 + "!important",
                borderRadius: ".06rem",
                border: "",
                borderColor: "#313843",
                fontSize: ".18rem",
                " .MuiSvgIcon-root": {
                  color: colorP.text4 + "!important",
                }
              },
              ".MuiButtonBase-root.Mui-selected": {
                backgroundColor: colorP.forGround,
                color: colorP.text2 + "!important",
                borderColor: colorP.forGround
              },
              ".MuiButtonBase-root.Mui-selected:hover": {
                backgroundColor: colorP.forGround
              },
            }} count={pageCount} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
          </div>
        }
      </div>
    </>
  )
}
export default UserList;