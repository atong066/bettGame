import axios from "axios";
import Select from 'react-select'
import { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel, Pagination, TextField } from "@mui/material";
// import { dates,statuses,depositMethod} from "../../userCenter/common/selectOtions";
import { dates, statuses, depositMethod } from "../../common/selectOtions";
import SearchIcon from '@mui/icons-material/Search';
import { TableHeader, Table, TableRow, TableCell, TableBody } from "../../userCenter/common/table";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
function UserList() {
  const colorP = ChangeColorPallte()
  const [historySport, setHistorySport] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [accountName, setAccountName] = useState("")
  const [orderID, setOrderID] = useState("")
  const [includType, setIncludeType] = useState(false)
  async function getPersonalReport() {
    const response = await axios.post('/userCenter/agentManage/userListData.do', {
      startTime: "2023-12-01 23:59:59",
      endTime: "2023-12-30 23:59:59",
      pageNumber: currentPage,
      orderId: orderID,
      username: accountName,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    if (response.data.rows) {
      setPageCount(response.data.totalPageCount)
      setHistorySport(response.data.rows)
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
  const handleDepoID = (value: any) => {
    setOrderID(value);
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
  return (
    <>
      <div className="sectionContainerSub">
        <div className="accntActions">
          <Select placeholder="Select date..." options={dates} />
          <Select placeholder="Select Levels..." options={dates} />
          <TextField value={accountName} id="outlined-basic" label="Account" variant="outlined" size="small" onChange={(e) => handleAccountNameChange(e.target.value)} />
          <TextField value={orderID} id="outlined-basic" label="Amount of deposits reached" variant="outlined" size="small" onChange={(e) => handleDepoID(e.target.value)} />

        </div>
        <div className="accntActions">
          <TextField value={orderID} id="outlined-basic" label="Balance from" variant="outlined" size="small" onChange={(e) => handleDepoID(e.target.value)} />
          <TextField value={orderID} id="outlined-basic" label="Balance to" variant="outlined" size="small" onChange={(e) => handleDepoID(e.target.value)} />
          <Button onClick={() => getPersonalReport()} variant='contained' className="searchButton" startIcon={<SearchIcon />}>Search</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Account</TableCell>
              <TableCell>User Level</TableCell>
              <TableCell>Member Level</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Registration Time</TableCell>
              <TableCell>Last Login Time</TableCell>
              <TableCell>Online Status</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Operation</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historySport.map((value: any, index: any) =>
              <TableRow>
                <TableCell>{value.orderId}</TableCell>
                <TableCell>{value.username}</TableCell>
                <TableCell>{value.createDatetime}</TableCell>
                <TableCell>{value.money}</TableCell>
                <TableCell>{getType(1, value.depositType)}</TableCell>
                <TableCell>{getType(2, value.status)}</TableCell>
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
          }} count={pageCount} onChange={handleChangePage} color="secondary" showFirstButton showLastButton />
        </div>
      </div>

    </>
  )
}
export default UserList;