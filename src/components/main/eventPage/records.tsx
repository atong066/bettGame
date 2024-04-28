import MainLayout from "../../layout";
import { HeaderWithAction } from "../common/header";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import eventDetails from "./eventDetails";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";

function EventRecords(){
    const colorP=ChangeColorPallte()
    return(
        <>
        <MainLayout>
            <section>
                <HeaderWithAction>Records</HeaderWithAction>
                <div className="recordData" style={{background:colorP.backGorund}}>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableCell>Valid bet amount</TableCell>
                        <TableCell>Reward value</TableCell>
                        </TableRow>
                    </TableHeader>
                <TableBody>
                    {/* { eventDetails?.configs?.map((value: any, index: any) =>
                    <TableRow>
                        <TableCell>{value.validBetnum}</TableCell>
                        <TableCell>{value.giftMoney}</TableCell>
                    </TableRow>
                    )} */}
                </TableBody>
                </Table>
                </div>
            </section>
        </MainLayout>
        </>
    )
}
export default EventRecords;