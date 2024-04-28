import React from "react";
import { Button } from "@mui/material";
import MainLayout from "../../../../layout";

function Privilegio() {
  return (
    <MainLayout>
      <section>
        <div className="discount-container">
          <div className="discount-header">
            <span>Retomar</span>
            <span>Desconto no primero deposito</span>
            <span>
              <Button>coletar Tudo</Button> <Button>Reg de Coletas</Button>
            </span>
          </div>
       
          
        </div>
      </section>
    </MainLayout>
  );
}

export default Privilegio;
