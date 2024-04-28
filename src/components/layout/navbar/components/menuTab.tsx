import { Avatar, Divider, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGlobalList, useGlobalVariables, useTabStates } from "../../../globalFunctions/store";
import { useGetPromoInfo, useGetRecharge, useStationConfig } from "../../../hooks/getUserInfoHook";
import { ToastrPngk } from "../../../globalFunctions/toastr";

export function MenuTab(props: any) {
  const anchorEl = props.anchorEl
  const backgroundColor = ChangeColorPallte();
  const userconfigData = useGlobalVariables((state) => state.userConfig);
  const userInfo = useGlobalVariables((state) => state.userDetails);
  const { t, i18n } = useTranslation(["home", "main"]);
  const config = useStationConfig();
  const userConifg = config?.data?.data;
  const getPromoInfo = useGetPromoInfo(userConifg?.username);
  const navigate = useNavigate()
  const rechargeCn = useGetRecharge();
  const hoverColor = useGlobalList((state => state.hoverColor))
  const [copyIndex, setCopyIndex] = useState<any>();
  const handleClose = () => {
    props.action();
    useGlobalList.setState({ hoverColor: "" });
    setCopyIndex(0);
  };
  function GoTo(link: any) {
    useGlobalVariables.setState({ agentActivetab: 0 });
    getPromoInfo.refetch();
    navigate(link);
  }
  const support = () => {
    useGlobalVariables.setState({ supportTabindex: 1 });
    useGlobalVariables.getState().scrollToTop()
    navigate("/support");
  };
  function openWithdrawPage(link: any, index: any) {
    if (userInfo?.type == 150 || userInfo?.type == 160) {
      ToastrPngk({ msg: t("ts983", { ns: "ts" }), type: "error", id: link });
    } else {
      rechargeCn.mutate();
      useTabStates.setState({ type: 0 });
      if (link === "withdraw") {
        navigate("/withdraw");
        useTabStates.setState({ type: index });
      } else {
        navigate("/withdrawal");
      }
    }
  }
  async function logout() {
    useGlobalVariables.setState({ confirmOutModal: true });
  }
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={Boolean(anchorEl)}
      onClose={handleClose}
      onClick={handleClose}
      MenuListProps={{
        onMouseLeave: handleClose,
      }}
      sx={{
        "& .MuiPaper-root": {
          background: backgroundColor.backGorund,
          border: ".01rem solid #313843",
          minWidth: "2.5rem",
          borderRadius: ".1rem",
        },
        "& li": {
          color: "#ADB6C3",
          fontSize: ".16rem",
        },
        " .MuiDivider-root": {
          borderColor: "#313843",
          margin: "auto",
          width: "2.3rem",
        },
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          " .MuiSvgIcon-root": {
            width: ".32rem",
            height: ".32rem",
          },
          "& .MuiAvatar-root": {
            width: ".4rem",
            height: ".4rem",
            ml: -0.5,
            mr: 1,
            bgcolor: "transparent",
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            background: backgroundColor.backGorund,
            transform: "translateY(-50%) rotate(45deg)",
            borderTop: ".01rem solid #313843",
            borderLeft: ".01rem solid #313843",
            zIndex: 0,
          },
          "& .MuiPaper-root": {
            background: backgroundColor.backGorund,
            fontSize: ".16rem",
            color: "#68707b !important",
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Link to="/profile-information">
        <MenuItem onClick={handleClose}>
          <Avatar
            variant="square"
            sx={{ bgcolor: "transparent", width: "1rem" }}
          >
            <img
              style={{ width: ".35rem", padding: ".02rem" }}
              src="/navbarImages/icon_ProfileInformation.png"
              alt="N"
            />
          </Avatar>
          {t("ts175", { ns: "ts" })}
        </MenuItem>
      </Link>
      <Link to="/security">
        <MenuItem onClick={handleClose}>
          <Avatar
            variant="square"
            sx={{ bgcolor: "transparent", width: "1rem" }}
          >
            <img
              style={{ width: ".35rem", padding: ".02rem" }}
              src="/navbarImages/icon_SecurityCenter.png"
              alt="N"
            />
          </Avatar>
          <span>{t("ts176", { ns: "ts" })}</span>
        </MenuItem>
      </Link>
      <Link to="/promotionPage">
        <MenuItem>
          <Avatar
            variant="square"
            sx={{ bgcolor: "transparent", width: "1rem" }}
          >
            <img
              style={{ width: ".35rem", padding: ".02rem" }}
              src="/navbarImages/icon_Notice.png"
              alt="N"
            />
          </Avatar>
          <span>{t("ts457", { ns: "ts" })}</span>
        </MenuItem>
      </Link>
      <Divider />
      <Link to="/account-details">
        <MenuItem>
          <Avatar
            variant="square"
            sx={{ bgcolor: "transparent", width: "1rem" }}
          >
            <img
              style={{ width: ".35rem", padding: ".02rem" }}
              src="/navbarImages/icon_AccountDetails.png"
              alt="N"
            />
          </Avatar>
          <span>{t("ts170", { ns: "ts" })}</span>
        </MenuItem>
      </Link>
      <div onClick={() => GoTo("/agent-management")}>
        <MenuItem>
          <Avatar
            variant="square"
            sx={{ bgcolor: "transparent", width: "1rem" }}
          >
            <img
              style={{ width: ".35rem", padding: ".02rem" }}
              src="/navbarImages/icon_AgentManagement.png"
              alt="N"
            />
          </Avatar>
          <span>{t("ts351", { ns: "ts" })}</span>
        </MenuItem>
      </div>
      {userconfigData?.isExchange == true && (
        <Link to="/point-redemption">
          <MenuItem>
            <Avatar
              variant="square"
              sx={{ bgcolor: "transparent", width: "1rem" }}
            >
              <img
                style={{ width: ".35rem", padding: ".02rem" }}
                src="/navbarImages/icon_PointRedemption.png"
                alt="N"
              />
            </Avatar>
            <span>{t("ts330", { ns: "ts" })}</span>
          </MenuItem>
        </Link>
      )}
      <Link to="/betting-history">
        <MenuItem onClick={handleClose}>
          <Avatar
            variant="square"
            sx={{ bgcolor: "transparent", width: "1rem" }}
          >
            <img
              style={{ width: ".35rem", padding: ".02rem" }}
              src="/navbarImages/icon_BettingHistory.png"
              alt="N"
            />
          </Avatar>
          <span>{t("ts004", { ns: "ts" })}</span>
        </MenuItem>
      </Link>
      <Link to="/personal-report">
        <MenuItem onClick={handleClose}>
          <Avatar
            variant="square"
            sx={{ bgcolor: "transparent", width: "1rem" }}
          >
            <img
              style={{ width: ".35rem", padding: ".02rem" }}
              src="/navbarImages/icon_PersonalReport.png"
              alt="N"
            />
          </Avatar>
          <span>{t("ts172", { ns: "ts" })}</span>
        </MenuItem>
      </Link>
      <div onClick={support}>
        <MenuItem onClick={handleClose}>
          <Avatar
            variant="square"
            sx={{ bgcolor: "transparent", width: "1rem" }}
          >
            <img
              style={{ width: ".35rem", padding: ".02rem" }}
              src="/navbarImages/icon_MessageCenter.png"
              alt="N"
            />
          </Avatar>
          <span>{t("ts173", { ns: "ts" })}</span>
        </MenuItem>
      </div>
      <Divider />
      <Link to="/core-wallet">
        <MenuItem onClick={handleClose}>
          <Avatar
            variant="square"
            sx={{ bgcolor: "transparent", width: "1rem" }}
          >
            <img
              style={{ width: ".35rem", padding: ".02rem" }}
              src="/navbarImages/icon_CoreWallet.png"
              alt="N"
            />
          </Avatar>
          <span> {t("ts1067", { ns: "ts" })}</span>
        </MenuItem>
      </Link>
      <div onClick={() => openWithdrawPage("withdraw", 2)}>
        <MenuItem onClick={handleClose}>
          <Avatar
            variant="square"
            sx={{ bgcolor: "transparent", width: "1rem" }}
          >
            <img
              style={{ width: ".35rem", padding: ".02rem" }}
              src="/navbarImages/icon_WithdrawalCard.png"
              alt="N"
            />
          </Avatar>
          <span> {t("ts1068", { ns: "ts" })}</span>
        </MenuItem>
      </div>
      <Divider />
      {userconfigData?.onOffGiftWallet && (
        <Link to="/recharge">
          <MenuItem onClick={handleClose}>
            <Avatar
              variant="square"
              sx={{ bgcolor: "transparent", width: "1rem" }}
            >
              <img
                style={{ width: ".35rem", padding: ".02rem" }}
                src="/navbarImages/icon_BonusWallet.png"
                alt="N"
              />
            </Avatar>
            <span>{t("ts706", { ns: "ts" })}</span>
          </MenuItem>
        </Link>
      )}
      <Link to="/record">
        <MenuItem onClick={handleClose}>
          <Avatar
            variant="square"
            sx={{ bgcolor: "transparent", width: "1rem" }}
          >
            <img
              style={{ width: ".35rem", padding: ".02rem" }}
              src="/navbarImages/icon_BonusRecords.png"
              alt="N"
            />
          </Avatar>
          <span>{t("ts857", { ns: "ts" })}</span>
        </MenuItem>
      </Link>
      <MenuItem onClick={logout}>
        <Avatar
          variant="square"
          sx={{ bgcolor: "transparent", width: "1rem" }}
        >
          <img
            style={{ width: ".35rem", padding: ".02rem" }}
            src="/navbarImages/icon_Logout.png"
            alt="N"
          />
        </Avatar>
        <span>{t("ts179", { ns: "ts" })}</span>
      </MenuItem>
    </Menu>
  )
}