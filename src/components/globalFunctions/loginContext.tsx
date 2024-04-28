import { createContext, useContext, useEffect, useMemo, useState } from "react";
const LoginContext = createContext<any | undefined>(undefined);
const OpenLoginContext = createContext<any | undefined>(undefined);
const SetTabActive = createContext<any | undefined>(undefined);
const ActiGame = createContext<any | undefined>(undefined);
const ActiveSidebar = createContext<any | undefined>(undefined);
const SetActiveSidebar = createContext<any | undefined>(undefined);

export function LoginModalInfo() {
    return useContext(LoginContext);
  }
  export function OpenModalLoginS() {
    return useContext(OpenLoginContext);
  }
  export function SetActiveTab() {
    return useContext(SetTabActive);
  }
  export function GetActiveGame() {
    return useContext(ActiGame);
  }
  export function GetActiveSidebar() {
    return useContext(ActiveSidebar);
  }
  export function SetActiveSidebarFn() {
    return useContext(SetActiveSidebar);
  }
export function LoginProvider({ children }: any){
    const[loginOpen,setLoginOpen]=useState<any>(false)
    const[actGame,setActGame]=useState(false)
    const [gameIndex, setActobeIndex] = useState(0);
    function handleLogin(){
    }
    function sidebarAction(id:any){

        setActGame(id)
    }
    function setActiveSidbarIndex(id:any){
        setActobeIndex(id)
    }
    return(
        <LoginContext.Provider value={loginOpen}>
            <OpenLoginContext.Provider  value={setLoginOpen}>
                <SetTabActive.Provider value={sidebarAction}>
                    <ActiGame.Provider value={actGame}>
                        <ActiveSidebar.Provider value={gameIndex}>
                            <SetActiveSidebar.Provider value={setActiveSidbarIndex}>
                            {children}
                            </SetActiveSidebar.Provider>
                        </ActiveSidebar.Provider>
                    </ActiGame.Provider>
                </SetTabActive.Provider>
            </OpenLoginContext.Provider>
        </LoginContext.Provider>
    )
}
