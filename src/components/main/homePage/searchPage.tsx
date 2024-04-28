import { GameHeader } from "../common/header";
import { useEffect, useRef, useState } from "react";
import "./gamesTab.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import MainLayout from "../../layout";
import { useOpenGame } from "../../hooks/getUserInfoHook";
import Loader from "../../backdropLoader/backdrop-loader";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";

import {
  useGlobalVariables,
  useSearchHIst,
  userRegstore,
} from "../../globalFunctions/store";
import { useSearchGameItem } from "../../hooks/curstomHooks";
import { v4 as uuidv4 } from "uuid";
import GameSearchEngine from "./components/gameSearchEngine";
import { ToastrPngk } from "../../globalFunctions/toastr";
import { Box } from "@mui/material";
function GameSearch() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const color = ChangeColorPallte()

  const [searchBox, setSearchBox] = useState<any>("");
  const searchItemG = useSearchGameItem();
  const topReff = useRef<any>();
  const gameOp = useOpenGame();
  const searchHistItem = useSearchHIst((state) => state.searchItem);
  const userInfo = useGlobalVariables((state) => state.userDetails);
  const scrollToBottom = () => {
    topReff?.current.scrollIntoView();
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, []);

  const handleSearchInput = (e: any) => {
    setSearchBox(e.target.value);
  };
  function searchGameEngine(e: any, item?: any) {
    useGlobalVariables.setState({ tabIndex2: 0 });
    const keyWord = item ? item : searchBox;
    const index = searchHistItem.findIndex(
      (item: any) => item.keyword == searchBox
    );
    const payload = {
      id: uuidv4(),
      keyword: keyWord,
    };

      searchItemG.mutate(payload);
      if (!item && index < 0 && keyWord !== "") {
        useSearchHIst.getState().addSearchHIst(payload);
      }
 

  }

  function removeFromHist(id: any) {
    useSearchHIst.getState().removeSearchHist(id);
  }
  function clearSearchBar() {
    setSearchBox("");
  }
  useEffect(() => {
    useGlobalVariables.setState({ tabIndex2: 1 });
    const cookies = new Cookies();
    cookies.remove("tabName");
  }, []);
  return (
    <MainLayout>
      <Loader setLoader={gameOp.isLoading}></Loader>
      <section ref={topReff} className="mainEvent">
        <GameHeader> {t("ts042", { ns: "ts" })}</GameHeader>
        <div className="searchHistory" style={{ backgroundColor: color.backGorund }}>
          <Box sx={{
            "input:focus": {
              borderColor: color.forGround
            },
            " .entryHItem:hover": {
              " .keyHover": {
                color: color.forGround
              }
            }
          }}>
            <div className="searchBarContainer" style={{ backgroundColor: color.backGorund }}>
              <input
                value={searchBox}
                onChange={(e) => handleSearchInput(e)}
                type="text"
                placeholder={t("ts1033", { ns: "ts" })}
              />
              <span className="searchIcon">
                <img width={30} height={30} src="/images/searchIcon.png" alt="" />
              </span>
              {(searchBox !== "" && searchBox.length >= 3) && (
                <span onClick={clearSearchBar} className="closeIcon">
                  <img width={30} height={30} src="/images/closeS.png" alt="" />
                </span>
              )}
              <button style={{ backgroundColor: color.forGround, color: color.text2 }} onClick={(e) => searchGameEngine(e)}>{t("ts042", { ns: "ts" })}</button>
            </div>
            {searchHistItem && searchHistItem.length !== 0 && searchHistItem.length !== 0 && (
              <div className="searchHistoryItems">
                <div className="topItem">
                  <div className="searchRecentLabel">
                    <img src="/images/history.png" alt="" />
                    <span>Pesquisas Recentes</span>
                  </div>
                  <div
                    className="deleteSearchAll"
                    onClick={() => useSearchHIst.getState().reset()}
                  >
                    <img src="/images/delete.png" alt="" />
                    <span>Limpar tudo</span>
                  </div>
                </div>
                <div className="searchEntries" >
                  {searchHistItem &&
                    searchHistItem?.map((item: any, index: any) => (
                      <div className="entryHItem">
                        <div className="keyHover" onClick={(e) => searchGameEngine(e, item.keyword)}>
                          {item.keyword}
                        </div>
                        <img
                          onClick={() => removeFromHist(item.id)}
                          src="/images/closeS.png"
                          alt=""
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </Box>
        </div>

        <GameSearchEngine
          width="100%"
          searchAction={setSearchBox}
          search={searchGameEngine}
          clear={setSearchBox}
        />
      </section>
    </MainLayout>
  );
}
export default GameSearch;
