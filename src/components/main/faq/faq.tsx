import MainLayout from "../../layout";
import "./faq.css";
import { HeaderWithAction } from "../common/header";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFaqActivities, useFaqs } from "../../hooks/faqHook";
import Loader from "../../backdropLoader/backdrop-loader";
import NoData from "../../noData/no-data";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { isEmptyObject } from "jquery";

function Faq() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = ChangeColorPallte()
  const [selectedIndex, setSelectedIndex] = useState(0);
  const useFaq = useFaqs(state => state.faqs)

  const [data, setData] = useState<any>(isEmptyObject(useFaq) ? "" : useFaq?.menu[selectedIndex]?.content)
  const handleSelect = (index: any, data: any) => {
    setSelectedIndex(index);
    setData(data)
  };

  return (
    <MainLayout>
      <section className="mainEvent">
        <Loader setLoader={useFaq.isLoading}></Loader>
        <HeaderWithAction>{t("ts158", { ns: "ts" })}</HeaderWithAction>
        <div className="faqContainer">
          <div className="butts">
            {useFaq?.menu?.map((value: any, index: any) => (
              <button
                onClick={() => handleSelect(index, value.content)}
                className={selectedIndex === index ? "acitveBtn" : ""}
                style={selectedIndex === index ? { backgroundColor: "#f0b83f" } : { backgroundColor: colorP.backGorund }}
              >
                {value.title ? value.title : "-"}
              </button>
            ))}
          </div>
          {useFaq?.menu?.content != '' &&
            <div className="contents">
              {useFaq?.menu?.length !== 0 &&
                <>
                  {data ?
                    <div
                      dangerouslySetInnerHTML={{ __html: data }}
                      className="main-content"
                      style={{ backgroundColor: colorP.backGorund }}
                    />
                    :
                    <div className="main-content" style={{ backgroundColor: colorP.backGorund }}><NoData /></div>
                  }
                </>
              }
            </div>
          }
        </div>
        {(!useFaq ||
          !useFaq.menu ||
          useFaq.menu.length === 0) && (
            <div style={{ marginTop: "" }}>
              <NoData />
            </div>
          )}
      </section>
    </MainLayout>
  );
}
export default Faq;
