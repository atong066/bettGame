import axios from "axios";
import Select from 'react-select'
import { useEffect, useReducer, useState } from "react";
import { TableHeader, Table, TableRow, TableCell, TableBody } from "../common/table";
import { Button, Pagination, TextField } from "@mui/material";
import { statuses } from "../common/selectOtions";
import { dates } from "../../common/selectOtions";
import SearchIcon from '@mui/icons-material/Search';
import { dateReducer, initialDate } from "../../reducers/dateReduce";
import DateModal from "../../common/dateModal";
import { DatePicker } from "../../common/components/dropdownComponent";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
function WithdrawHistory(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const [historySport, setHistorySport] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [accountName, setAccountName] = useState("")
  const [orderID, setOrderID] = useState("")
  const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
  async function getPersonalReport() {
    const response = await axios.post('/userCenter/report/withdrawRecordList.do', {
      startTime: commonReducer.startDate,
      endTime: commonReducer.endDate,
      pageNumber: currentPage,
      orderId: orderID,
      username: accountName,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    if (response.data.rows) {
      setPageCount(response.data.totalPageCount)
      setHistorySport(response.data.rows)
    }

  }
  useEffect(() => {
    getPersonalReport()
  }, [currentPage, commonReducer])
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const handleAccountNameChange = (value: any) => {
    setAccountName(value)
  };
  const handleDepoID = (value: any) => {
    setOrderID(value);
  };
  const getType = (type: any) => {
    const selType = statuses.find((item: any) => item.value == type)
    return selType ? t(selType.label, { ns: ["ts"] }) : ""
  }
  const handleGetdateEven = (e: any) => {
    console.log(e)
    dispatch({ type: e.value, dates: e })
  }
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <div className="accntActions">
          <DatePicker placeholder="Select date..." onChange={handleGetdateEven} />
          <TextField value={accountName} id="outlined-basic" label="Account" variant="outlined" size="small" onChange={(e) => handleAccountNameChange(e.target.value)} />
          <TextField value={orderID} id="outlined-basic" label="Order No" variant="outlined" size="small" onChange={(e) => handleDepoID(e.target.value)} />
          <Select placeholder="Select Status..." options={statuses} />
          <Button onClick={() => getPersonalReport()} variant='contained' className="searchButton" startIcon={<SearchIcon />}>Search</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Order No</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Withdrawal Time</TableCell>
              <TableCell>Application ammount</TableCell>
              <TableCell>Amount of Withrawal</TableCell>
              <TableCell>Service charge</TableCell>
              <TableCell>Withdrawal bank</TableCell>
              <TableCell>Bank card number</TableCell>
              <TableCell>Withdrawal status</TableCell>
              <TableCell>Remark</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historySport.map((value: any, index: any) =>
              <TableRow>
                <TableCell>{value.orderId}</TableCell>
                <TableCell>{value.username}</TableCell>
                <TableCell>{value.createDatetime}</TableCell>
                <TableCell>{value.drawMoney}</TableCell>
                <TableCell>{value.trueMoney}</TableCell>
                <TableCell>{value.feeMoney}</TableCell>
                <TableCell>{value.bankName}</TableCell>
                <TableCell>{value.cardNo}</TableCell>
                <TableCell>{getType(value.status)}</TableCell>
                <TableCell>{value.remark}</TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
        <div className="pagination">
          <Pagination
          variant="outlined" shape="rounded" sx={{
            ".MuiButtonBase-root": {
                height: ".4rem",
                width: ".4rem",
                color: "nude",
                borderRadius:".06rem",
                border:"",
                borderColor:"#313843",
                fontSize:".18rem"
            },
            ".MuiButtonBase-root.Mui-selected": {
                backgroundColor: colorP.forGround,
                color: "#874404 !important",
                borderColor:colorP.forGround
            },
            ".MuiButtonBase-root.Mui-selected:hover": {
                backgroundColor: colorP.forGround
            },
        }}  count={pageCount} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
        </div>
        <DateModal openValue={commonReducer.customDate} closeModal={handleGetdateEven}></DateModal>
      </div>
    </>
  )
}
export default WithdrawHistory;