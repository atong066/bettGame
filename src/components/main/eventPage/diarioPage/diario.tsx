import React from "react";
import MainLayout from "../../../layout";
import "../jackpotFolder/jackpot.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import MultipleItems from "../../carousel/footerCarousel/carousel";

function Diario() {
  return (
    <MainLayout>
      <section>
        <div className="jackpot-container diarion-cont">
          <div className="jackpot-label">
            <Link to="/event">
              <span style={{ color: "#adb6c3" }}>&lt; Retomar</span>
            </Link>
            <span>
              <div className="header">
                <img className="titleWing" src="withdrawImages/titleWing.png" />
                <label className="headerTitle">Inscricoes diarias</label>
                <img className="titleWing" src="withdrawImages/titleWing.png" />
              </div>
            </span>
            <span>
              <Button>Iniciar sessao</Button>
              <Button>Reg de Coletas</Button>
            </span>
          </div>
          <div className="jackpot-body ">
            <div className="diario-body ">
              <div>
                sessao <span style={{ color: "white" }}>0</span>dias consecutivo
              </div>
              <div>
                recoldhido <span style={{ color: "#f0c059" }}>0,00</span>
              </div>
              <div>
                E necessário para corregar{" "}
                <span style={{ color: "white" }}>0,00 20,00</span>
              </div>
              <div>
                Aposta <span style={{ color: "white" }}>0,00/600,00</span>
              </div>
            </div>
            <div className="diario-content">
              <div className="diarion-img">
                <span>DIA1</span>
                <span>
                  <img src="images/clover.png" alt="" />
                </span>
                <span style={{ color: "#f0c059" }}>2</span>
              </div>
              <div className="diarion-img">
                <span>DIA1</span>
                <span>
                  <img src="images/clover.png" alt="" />
                </span>
                <span style={{ color: "#f0c059" }}>2</span>
              </div>
              <div className="diarion-img">
                <span>DIA1</span>
                <span>
                  <img src="images/clover.png" alt="" />
                </span>
                <span style={{ color: "#f0c059" }}>2</span>
              </div>
              <div className="diarion-img">
                <span>DIA1</span>
                <span>
                  <img src="images/clover.png" alt="" />
                </span>
                <span style={{ color: "#f0c059" }}>2</span>
              </div>
              <div className="diarion-img">
                <span>DIA1</span>
                <span>
                  <img src="images/clover.png" alt="" />
                </span>
                <span style={{ color: "#f0c059" }}>2</span>
              </div>
              <div className="diarion-img">
                <span>DIA1</span>
                <span>
                  <img src="images/clover.png" alt="" />
                </span>
                <span style={{ color: "#f0c059" }}>2</span>
              </div>
            </div>
            <div className="diario-footer">
              <div>
                <span style={{ textAlign: "left" }}>Instruções Do Evento:</span>
                <br />
                1.Apenas se iniciar sessão e cumprir as condições de recarga e
                de apostas diárias, receberá um bónus fixo ou bónus misterioso,
                até 50;
                <br />
                2.Este evento é uma atividade de check-in consecutivo (se
                interrompida, a contagem será reiniciada e começará a partir do
                primeiro dia);
                <br />
                3.As recompensas só podem ser retiradas manualmente no
                iOS、Android、H5、PC;
                <br />
                4.A atribuição de bônus desta atividade (excluindo o capital)
                requer 1 X rollover (isto é, auditoria, participação ou aposta
                válida) para levantar o dinheiro. Participações não limitadas
                por jogo ou plataforma:
                <br />
                5.Este evento é limitado a operações normais realizadas pelo
                titular da conta. É proibido alugar, usar plug-ins externos,
                robôs, apostar em contas diferentes, brushing mútuo, arbitragem,
                interface, protocolo, exploração de vulnerabilidades, controle
                de grupo ou outros meios técnicos para participar. Caso
                contrário, as recompensas serão canceladas ou deduzidas, a conta
                será congelada ou até mesmo adicionada à lista negra;
                <br />
                6.Para evitar diferenças no entendimento do texto, a plataforma
                manterá a interpretação final deste evento.
              </div>
            </div>
          </div>
          <div className="" style={{marginBottom: '20px 0 100px 0'}}>
            <MultipleItems />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Diario;
