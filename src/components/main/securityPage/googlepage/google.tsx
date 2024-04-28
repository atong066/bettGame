import { Link } from "react-router-dom";
import MainLayout from "../../../layout";
import "../security.css";

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from'react';


function Phone() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <MainLayout>
      <section>
        <div className="main-phone-container">
          <div className="phone-header">
            <Link to="/security" style={{textDecoration: 'none'}}>
              <span> &lt; Retomar</span>
            </Link>
            <span className="head">
              <img className="titleWing" src="vipImages/titleWing.png" />
              <h1 style={{ color: "white" }}> Nº de Telefone</h1>
              <img className="titleWing" src="vipImages/titleWing.png" />
            </span>
            <span></span>
          </div>
          <div className="phone-body-container">
            <div className="body-content">
            <h3>Verifica a senha</h3>
            <p>
              O número de telemóvel pode ser vinculado após verificação da
              palavra-passe de início de sessão
            </p>
            <div className="input-container">
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined" className="myForm">
                  <InputLabel htmlFor="outlined-adornment-password" className="myLabel">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          style={{color: 'gray'}}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
            </div>
            <div className="outros">Outros Métodos</div>
            <div className="phone-button">
            <button>Serguintes</button>


            </div>
          </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Phone;
