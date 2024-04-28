import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout";
import Loader from "../../../backdropLoader/backdrop-loader";
import { HeaderWithAction } from "../../common/header";
import { useTranslation } from "react-i18next";
import { useGetActivities } from "../../../hooks/activeEvent";
import { useSetActivityValue } from "../../../globalFunctions/store";
import { useNavigate } from "react-router";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import NoData from "../../../noData/no-data";

function ActiveEvent() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const color = ChangeColorPallte();
  const navigate = useNavigate();
  const getActivity = useGetActivities();
  const image = getActivity?.data?.data;

  const goToActivityPage = (value: any) => {
    useSetActivityValue.setState({ activityValue: value });
    navigate("/active-event");
  };

  useEffect(() => {
    getActivity.refetch();
    
  }, []);

  return (
    <div>
      <MainLayout>
        <section className="mainEvent">
          <>
            <Loader setLoader={getActivity.isLoading}></Loader>
            <HeaderWithAction>{t("ts797", { ns: "ts" })}</HeaderWithAction>
            <div className="eventContainer eventContainer2">
              {!getActivity.isLoading &&
                image?.activity?.map((value: any, index: any) => (
                  <div
                    className="fetchImg"
                    key={index}
                    onClick={() => goToActivityPage(value)}
                  >
                    <img
                      style={{
                        backgroundColor: color.backGorund,
                        cursor: "pointer",
                        borderColor: color.forGround,
                      }}
                      src={value?.titleImgUrl}
                    />
                  </div>
                ))}
            </div>
            {!image?.activity ||(image?.activity?.length === 0 && (
                <div style={{ marginTop: "10vh" }}>
                  <NoData />
                </div>
              ))}
          </>
        </section>
      </MainLayout>
    </div>
  );
}
export default ActiveEvent;
