import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../../layout";
import "../discountPage/discount.css";
import { Typography } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Discount(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const [text, setText] = useState<any>([]);
  const [time, updateTime] = useState<any>([]);
  const [ot, overTime] = useState<any>([]);
  const navigate = useNavigate();
  const [showDiscount, setShowDiscount] = useState(true);

  const showData = () => {
    setShowDiscount(false);
    props.showData(showDiscount);
  };
  const fetchData = async () => {
    const url = "/activityPage.do";

    try {
      const response = await axios.get(url);
      const firstobject = response.data.activity[0];
      const at = response.data.activity[0].updateTime;
      const ot = response.data.activity[0].overTime;

      const dateFormat = (timeStamp: any) => {
        const date = new Date(timeStamp);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return `${year}-${month}-${day}`;
      };

      updateTime(dateFormat(at));
      overTime(dateFormat(ot));
      setText(firstobject);
    } catch (error) {
    
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <div className="discount-container">
        <>
          <div className="discount-header">
            {/* <Link to="/home"> */}
            <Typography
              variant="h5"
              display={"flex"}
              alignItems={"center "}
              onClick={() => showData()}
            >
              <ArrowBackIcon />
              {t("ts180", { ns: "ts" })}
            </Typography>
            {/* </Link> */}
            <div className="header">
              <img className="titleWing" src="vipImages/titleWing.png" />
              <span className="headerTitle">{text.title}</span>
              <img className="titleWing" src="vipImages/titleWing.png" />
            </div>
            <span></span>
          </div>
          <div
            className="discount-label"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <span>
      
              {t("ts861", { ns: "ts" })} {time}
            </span>
            <span>
     
              {t("ts862", { ns: "ts" })} {ot}
            </span>
          </div>
          <div className="discount-body">
            <Typography
              dangerouslySetInnerHTML={{ __html: text.content }}
            sx={{color: 'white'}}></Typography>
            <div className="body-label label2">
              {/* <span>{text.content}</span> */}
            </div>
          </div>
        </>
      </div>
    </section>
  );
}

export default Discount;


// import React from 'react'

// function Discount(props: any) {
//   const data = props.names?.data?.data
//   return (
//     <div>{props.isLoading == false && data?.activity?.map((value: any) => (
//       <div>{value.title}</div>
      
//       ))}

//       {data?.activity[0]?.title}
//     </div>
//   )
// }

// export default Discount
