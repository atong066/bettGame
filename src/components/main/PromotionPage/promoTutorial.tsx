import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import Promote from "../promotePage/promote";

function PromoTutorial() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    return (
        <>
        <Promote></Promote>
            {/* <div className="maionBX" style={{ backgroundColor: color.backGorund }}>
                <div className="top1">
                    <div className="CardContainer">
                        <div className="card-agent">
                            <div className="agentContainer" style={{ borderColor: "#ffaa09" }}>
                                <img src="/images/agent1.png" alt="" />
                                <div className="agentType" style={{ color: color.text, backgroundColor: "#ffaa09" }}>A</div>
                            </div>
                            <div className="textArea">
                                <div className="textTop">
                                    <span style={{ color: "#ADB6C3" }}>{t("ts605", { ns: "ts" })}</span>
                                </div>
                                <div className="textBottom">
                                    <span style={{ color: "#ffaa09" }}>40<span style={{ color: "#ADB6C3" }}>/10000</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="card-right">
                            <div >{t("ts606", { ns: "ts" })}</div>
                            <em style={{ color: "#ffaa09" }}>1110</em>
                            <div>{t("ts607", { ns: "ts" })}</div>
                            <em style={{ color: "#ffaa09" }}>720</em>
                            <div>{t("ts608", { ns: "ts" })} <em style={{ color: "#ffaa09" }}>390</em></div>
                        </div>
                    </div>
                </div>
                <div className="arrowMid">
                    <div className="left">
                        <div className="arrow">
                            <div className="tops">{t("ts609", { ns: "ts" })} <em style={{ color: "#ffaa09" }}>480</em></div>
                            <img src="/images/right.png" alt="" />
                            <div className="bottom">{t("ts610", { ns: "ts" })}  <em style={{ color: "#ffaa09" }}>480</em></div>
                        </div>

                    </div>
                    <div className="mid">
                        <img src="/images/arrowUp.png" alt="" />
                        <div>{t("ts613", { ns: "ts" })}: <em style={{ color: "#ffaa09" }}>160</em></div>
                    </div>
                    <div className="right">
                        <div className="arrow">
                            <div className="tops">{t("ts611", { ns: "ts" })}  <em style={{ color: "#ffaa09" }}>480</em></div>
                            <img src="/images/left.png" alt="" />
                            <div className="bottom">{t("ts612", { ns: "ts" })} <em style={{ color: "#ffaa09" }}>0</em></div>
                        </div>
                    </div>
                </div>
                <div className="thirdDiv">
                    <div className="cardContainerP">
                        <div className="card" style={{ borderColor: "#313843" }}>
                            <div className="agentIcon">
                                <div className="agentContainer" style={{ borderColor: "#ffaa09" }}>
                                    <img src="/images/agent2.png" alt="" />
                                    <div className="agentType" style={{ color: color.text, backgroundColor: "#ffaa09" }}>B1</div>
                                </div>
                            </div>
                            <div className="conetnt" style={{ borderColor: "#313843" }}>
                                <div className="text" style={{ color: "#ADB6C3" }}>{t("ts614", { ns: "ts" })} <em style={{ color: "#ffaa09" }}>10</em>/1000</div>
                            </div>
                            <div className="footerDiv">
                                <span>{t("ts617", { ns: "ts" })} 120K</span>
                            </div>
                        </div>
                        <div className="card" style={{ borderColor: "#313843" }}>
                            <div className="agentIcon">
                                <div className="agentContainer" style={{ borderColor: "#ffaa09" }}>
                                    <img src="/images/agent3.png" alt="" />
                                    <div className="agentType" style={{ color: color.text, backgroundColor: "#ffaa09" }}>B2</div>
                                </div>
                            </div>
                            <div className="conetnt" style={{ borderColor: "#313843" }}>
                                <div className="text" style={{ color: "#ADB6C3" }}>{t("ts615", { ns: "ts" })}</div>
                            </div>
                            <div className="footerDiv">
                                <span>{t("ts617", { ns: "ts" })} 40K</span>
                            </div>
                        </div>
                        <div className="card" style={{ borderColor: "#313843" }}>
                            <div className="agentIcon">
                                <div className="agentContainer" style={{ borderColor: "#ffaa09" }}>
                                    <img src="/images/agent2.png" alt="" />
                                    <div className="agentType" style={{ color: color.text, backgroundColor: "#ffaa09" }}>B3</div>
                                </div>
                            </div>
                            <div className="conetnt" style={{ borderColor: "#313843" }}>
                                <div className="text" style={{ color: "#ADB6C3" }}>{t("ts616", { ns: "ts" })} <em style={{ color: "#ffaa09" }}>40</em>/10k</div>
                            </div>
                            <div className="footerDiv">
                                <span>{t("ts617", { ns: "ts" })} 20K</span>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
                <div className="fourthDiv">
                    <div className="cardContainerP">
                        <div className="left">
                            <img className="leftArrow" src="/images/arrowShort.png" alt="" />
                            <p><span>{t("ts613", { ns: "ts" })}: <em style={{ color: "#ffaa09" }}>300</em></span><span>{t("ts618", { ns: "ts" })}: <em style={{ color: "#ffaa09" }}>100</em></span></p>
                        </div>
                        <div className="center">
                            <img className="centerArrow" src="/images/arrowRightLong.png" alt="" />
                            <p><span>{t("ts613", { ns: "ts" })}: <em style={{ color: "#ffaa09" }}>90</em></span><span>{t("ts619", { ns: "ts" })}: <em style={{ color: "#ffaa09" }}>30</em></span></p>
                        </div>
                        <div className="right">
                            <img className="rightArrow" src="/images/arrowShort.png" alt="" />
                            <p><span>{t("ts613", { ns: "ts" })}: <em style={{ color: "#ffaa09" }}>0</em></span><span>{t("ts620", { ns: "ts" })}: <em style={{ color: "#ffaa09" }}>12000</em></span></p>
                        </div>
                    </div>
                </div>
                <div className="fifthDiv">
                    <div className="cardContainerP">
                        <div className="card" style={{ borderColor: "#313843" }}>
                            <div className="agentIcon">
                                <div className="agentContainer" style={{ borderColor: "#ffaa09" }}>
                                    <img src="/images/agent4.png" alt="" />
                                    <div className="agentType" style={{ color: color.text, backgroundColor: "#ffaa09" }}>C1</div>
                                </div>
                            </div>
                            <div className="conetnt" style={{ borderColor: "#313843" }}>
                                <div className="text" style={{ color: "#ADB6C3" }}>{t("ts621", { ns: "ts" })}</div>
                            </div>
                            <div className="footerDiv">
                                <span>{t("ts617", { ns: "ts" })} 100K</span>
                            </div>
                        </div>
                        <div className="card" style={{ borderColor: "#313843" }}>
                            <div className="agentIcon">
                                <div className="agentContainer" style={{ borderColor: "#ffaa09" }}>
                                    <img src="/images/agent5.png" alt="" />
                                    <div className="agentType" style={{ color: color.text, backgroundColor: "#ffaa09" }}>C1</div>
                                </div>
                            </div>
                            <div className="conetnt" style={{ borderColor: "#313843" }}>
                                <div className="text" style={{ color: "#ADB6C3" }} >{t("ts622", { ns: "ts" })}</div>
                            </div>
                            <div className="footerDiv">
                                <span>{t("ts617", { ns: "ts" })} 30K</span>
                            </div>
                        </div>
                        <div className="card" style={{ borderColor: "#313843" }}>
                            <div className="agentIcon">
                                <div className="agentContainer" style={{ borderColor: "#ffaa09" }}>
                                    <img src="/images/agent4.png" alt="" />
                                    <div className="agentType" style={{ color: color.text, backgroundColor: "#ffaa09" }}>C1</div>
                                </div>
                            </div>
                            <div className="conetnt" style={{ borderColor: "#313843" }}>
                                <div className="text" style={{ color: "#ADB6C3" }}>{t("ts623", { ns: "ts" })}</div>
                            </div>
                            <div className="footerDiv">
                                <span>{t("ts617", { ns: "ts" })} 300K</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="bottomDiv">
                    <div style={{ color: "#ADB6C3" }}><strong>{t("ts624", { ns: "ts" })}:</strong></div>
                    <div style={{ color: "#ADB6C3" }}>{t("ts625", { ns: "ts" })}</div>
                    <div style={{ color: "#ADB6C3" }}>{t("ts626", { ns: "ts" })}</div>
                    <div style={{ color: "#ADB6C3" }}><strong>{t("ts627", { ns: "ts" })}:</strong></div>
                    <div className="indent">
                        <span style={{ color: "#ADB6C3" }}><strong>1. {t("ts635", { ns: "ts" })}: </strong>{t("ts628", { ns: "ts" })}</span>
                        <span style={{ color: "#ADB6C3" }}><strong>(1)</strong> <span style={{ color: "#ADB6C3" }} dangerouslySetInnerHTML={{ __html: t("ts629", { ns: "ts" }) }} /></span>
                        <span style={{ color: "#ADB6C3" }}><strong>(2)</strong> <span style={{ color: "#ADB6C3" }} dangerouslySetInnerHTML={{ __html: t("ts630", { ns: "ts" }) }} /></span>
                        <span style={{ color: "#ADB6C3" }}><strong>(3)</strong> <span style={{ color: "#ADB6C3" }} dangerouslySetInnerHTML={{ __html: t("ts631", { ns: "ts" }) }} /></span>
                    </div>
                    <div className="indent">
                        <span style={{ color: "#ADB6C3" }}><strong>2. {t("ts636", { ns: "ts" })}:</strong> {t("ts632", { ns: "ts" })}</span>
                        <span style={{ color: "#ADB6C3" }}><strong>(1)</strong> <span style={{ color: "#ADB6C3" }} dangerouslySetInnerHTML={{ __html: t("ts633", { ns: "ts" }) }} /></span>
                        <span style={{ color: "#ADB6C3" }}><strong>(2)</strong> <span style={{ color: "#ADB6C3" }} dangerouslySetInnerHTML={{ __html: t("ts634", { ns: "ts" }) }} /></span>
                    </div>
                    <div className="indent">
                        <span style={{ color: "#ADB6C3" }}><strong>3. {t("ts637", { ns: "ts" })}:</strong></span>
                        <span style={{ color: "#ADB6C3" }}><strong>(1)</strong> {t("ts638", { ns: "ts" })}</span>
                        <span style={{ color: "#ADB6C3" }}><strong>(2)</strong> {t("ts639", { ns: "ts" })}</span>
                        <span style={{ color: "#ADB6C3" }}><strong>(3)</strong> {t("ts640", { ns: "ts" })}</span>
                        <span style={{ color: "#ADB6C3" }}><strong>(4)</strong> {t("ts641", { ns: "ts" })}</span>
                    </div>
                </div>
            </div> */}
        </>
    )
}
export default PromoTutorial;