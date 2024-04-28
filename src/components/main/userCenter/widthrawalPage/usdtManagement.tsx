import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../common/table";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import * as React from "react";
import "./withdraw.css";
import { useTranslation } from "react-i18next";
import AlertModal from "../../common/modal/alert-modal/alert-modal";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import SubmitModal from "../../common/modal/submit-modal/submit-modal";
import NoData from "../../../noData/no-data";

function UsdtManagement() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const color = ChangeColorPallte()
  const [usdtCard, setUsdtCard] = useState<any[]>([]);
  const [openSubmitModal, setSubmitModalOpen] = useState(false);
  const [openAlert, setAlert] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [newOpenModal, setNewOpenModal] = useState(false);
  const [isData, setIsData] = useState(false)

  const setNewModal = () => {
    setNewOpenModal(!newOpenModal);
  };

  const handleSubmitModalOpen = () => {
    setSubmitModalOpen(true);
    getData();
  };
  const handleSubmitModalClose = () => {
    setSubmitModalOpen(false);
  };

  const openModalWithDifferentContent = () => {
    setModalContent("Please Confirm, Must be Same");
    setAlert(true);
  };

  const closeModalAlert = () => {
    setAlert(false);
  };
  const openAlertModal = () => {
    setModalContent("Please Input");
    setAlert(true);
  };

  async function subs(e: any) {
    e.preventDefault();
    console.log("click");
    const bank = document.getElementById("bank") as HTMLInputElement | null;
    const bankContent = document.getElementById(
      "bankContent"
    ) as HTMLInputElement | null;

    const bankCode = bank?.value;
    const cardNo = bankContent?.value;

    if (bank?.value.trim() === "" || bankContent?.value.trim() === "") {
      setModalContent(t("ts709", { ns: "ts" }));
      setAlert(true);
      return;
    } else if (bank?.value !== bankContent?.value) {
      setModalContent(t("ts710", { ns: "ts" }));
      setAlert(true);
    } else {
      try {
        const response = await axios.post(
          "/userCenter/userBank/bankAddSave.do",
          {
            bankCode: 'USDT',
            bankName: 'USDT',
            cardNo: bankCode
          },
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              'X-Requested-With': 'XMLHttpRequest'
            },
          }
        );
        getData();
        if (response.data.success === true) {
          setModalContent(response.data.msg);
          setAlert(true);
          handleSubmitModalClose()
        } else {
          setModalContent(response.data.msg);
          setAlert(true);
        }
      } catch (error) {
        setModalContent(`${error}`);
        setAlert(true);
      }
    }
  }

  async function getData() {
    const url = "/userCenter/userBank/list.do";
    try {
      const response = await axios.post(
        url,
        {
          type: "USDT",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            'X-Requested-With': 'XMLHttpRequest'
          },
        }
      );
      if (response.data.banks != '') {
        setUsdtCard(response.data.banks)
        setIsData(true)
      } else {
        setIsData(false)
      }

    } catch (error) {
      console.log(`error: ${error}`);
    }
  }

  async function handleDelete(id: number) {
    const url = "/userCenter/userBank/delUserBank.do";
    const data = { id: id };
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          'X-Requested-With': 'XMLHttpRequest'
        },
      });
      setModalContent(response.data.msg);
      setAlert(true);
      getData();
    } catch (error) {
      console.log(`error deleting: ${error}`);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function pageSatus(type: any) {
    if (type == 1) {
      return t("ts386", { ns: ["ts"] })
    } else if (type == 2) {
      return t("ts385", { ns: ["ts"] })
    }
  }

  return (
    <>
      <AlertModal
        openAlert={openAlert}
        closeAlert={closeModalAlert}
        alertTitle={t("ts205", { ns: "ts" })}
        alertMode="alertDefault"
      >
        <div className="alertContainer">
          {modalContent}
        </div>
      </AlertModal>
      <div style={{ padding: "1rem" }}>
        <Button
          onClick={handleSubmitModalOpen}
          style={{
            backgroundColor: color.forGround,
            color: color.text,
            fontWeight: 600,
            marginBottom: "20px",
          }}
        >
          {t("ts197", { ns: "ts" })}
        </Button>
        <SubmitModal
          submitTitle={t("ts197", { ns: "ts" }) + " USDT"}
          openSubModal={openSubmitModal}
          closeSubModal={handleSubmitModalClose}
          submitAction={subs}
        >
          <TextField
            required
            margin="dense"
            label={t("ts205", { ns: "ts" })}
            fullWidth
            variant="outlined"
            id="bank"
            sx={{
              "& .MuiInputBase-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: color.forGround + " !important"
                },
                "& .MuiOutlinedInput-input": {
                  color: color.text + " !important"
                },
              },
              "& .MuiFormLabel-root": {
                color: "#808080 !important"
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid !important",
                  borderColor: color.forGround + " !important"
                }
              }
            }}
          />
          <TextField
            required
            margin="dense"
            label={t("ts721", { ns: "ts" })}
            fullWidth
            variant="outlined"
            id="bankContent"
            sx={{
              "& .MuiInputBase-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: color.forGround + " !important"
                },
                "& .MuiOutlinedInput-input": {
                  color: color.text + " !important"
                },
              },
              "& .MuiFormLabel-root": {
                color: "#808080 !important"
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid !important",
                  borderColor: color.forGround + " !important"
                }
              }
            }}
          />
        </SubmitModal>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>{t("ts205", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts202", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts203", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts204", { ns: "ts" })}</TableCell>
              <TableCell>{t("ts206", { ns: "ts" })}</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isData && usdtCard?.map((value: any, index: any) => (
              <TableRow key={index} className="tableRow">
                <TableCell>{value.cardNo}</TableCell>
                <TableCell>{value.remarks}</TableCell>
                <TableCell>{value.createTime}</TableCell>
                <TableCell>{pageSatus(value.status)}</TableCell>
                <TableCell className="details">
                  <Button
                    onClick={() => handleDelete(value.id)}
                    style={{ backgroundColor: color.forGround, color: color.text, fontWeight: 600 }}
                  >
                    {t("ts272", { ns: "ts" })}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!isData && <NoData padding={"1rem 0 0 0"} />}
      </div>
    </>
  );
}

export default UsdtManagement;
