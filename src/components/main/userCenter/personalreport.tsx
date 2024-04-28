import axios from "axios";
import { useEffect, useState } from "react";

function PersonalReport(){
    const[historySport,setHistorySport] = useState([]);
    useEffect(() => {
      axios.post('userCenter/report/personReport.do',{
        startTime: "2024-01-02 00:00:00",
        endTime: "2024-01-31 23:59:59",
        pageNumber: "1",
        username:" ",
        include: false,
      },{
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then((res)=>{
        setHistorySport(res.data.rows)
    
      })
   
    }, [])
    return(
        <>
           <div className="tableHeader">
                                        <div className="tableRow sevenRows">
                                            <div>Hours</div>
                                            <div>Types</div>
                                            <div>Platform</div>
                                            <div>Games</div>
                                            <div>Number of bets</div>
                                            <div>valid Bets</div>
                                            <div>Gains and Losses</div>
                                        </div>
                                    </div>
                                    <div className="">
                                        {/* <div className="emptyData">
                                            <img src="/images/img_none_jl.png" alt="" />
                                            <label htmlFor="">No Records</label>
                                        </div> */}
                                              {historySport.map((value: any, index: any) =>
                                        <div key={index} className="tableBody">
                                            <div>{value.platformType}</div>
                                            <div>{value.bettingTime}</div>
                                            <div>{value.username}</div>
                                            <div>{value.odds?value.odds:"-"}</div>
                                            <div>{value.realBettingMoney}</div>
                                            <div>{value.bettingMoney}</div>
                                            <div>{value.winMoney}</div>
                                            <div>{value.status=="C"?"Completed":"Failed"}</div>
                                            <div>View Details</div>
                                        </div>
                                        )}
                                    </div>
                                    <div className="tableFooter">
                                        <div></div>
                                    </div>
        </>
    )
}
export default PersonalReport;