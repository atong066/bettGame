import axios from "axios";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../userCenter/common/table";
import { useState } from "react";

function USDTManagement() {
    const [tronStatus, setTronStatus] = useState(false)
    async function getUSDTManagement() {
        const response = await axios.post('/userCenter/tronLink/getUserTronLink.do')
        if (response.data.success == false) {

        }
    }
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Change type</TableCell>
                        <TableCell>Point before change</TableCell>
                        <TableCell>Change points</TableCell>
                        <TableCell>Points after chnage</TableCell>
                        <TableCell>Time change(system)</TableCell>
                        <TableCell>Remark</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* {
                                        points.map((value: any, index: any) =>
                                            <TableRow>
                                                <TableCell>{setType(value.type)}</TableCell>
                                                <TableCell>{value.beforeScore}</TableCell>
                                                <TableCell>{value.score}</TableCell>
                                                <TableCell>{value.afterScore}</TableCell>
                                                <TableCell>{value.createDatetimeStr}</TableCell>
                                                <TableCell>{value.remark}</TableCell>
                                            </TableRow>
                                        )
                                    } */}

                </TableBody>
            </Table>
        </>
    )
}
export default USDTManagement;