import React from 'react'
import './redfolder.css'

function RedFolder() {
    return (
        <div className='main-redfolder-container'>
            <div className="layout" id="layouts">
                <div className="main">
                    <div className="mainBlur" id="mainBlurs">
                        <img src="redfolderImages/h5_hb_icon_shut.png" alt="" id="close" />
                        <img src="redfolderImages/folder.png" alt="" className="folder" id="folder" />
                        <img src="redfolderImages/dollar.png" id="dollar" />
                        <div className="mainRewards" id="mainR">
                            <div className="openFolderDivs">
                                <div className="openFolderAbsolute">
                                    <img src="redfolderImages/pc_hb_icon_shut.png" alt="" id="close1" />
                                    <img src="redfolderImages/openFolder.png" id="openFolder" />
                                    <div className="reward">
                                        <div className="gxtitle">
                                            <img src="redfolderImages/h5_hb_tc_wenli.png" height="10" alt="" />
                                            <small>恭喜获得</small>
                                            <img src="redfolderImages/h5_hb_tc_wenli.png" height="10" alt="" />
                                        </div>

                                        <p className="winmoney">622.22</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="redfolderImages/h5_hb_wenan.png" alt="" id="wenan" />

                    <img src="redfolderImages/h5_hb_wenan2.png" alt="" id="wenan2" />
                    <img src="redfolderImages/hb_djs.png" alt="" id="time" />
                    <img src="redfolderImages/Ending time.png" alt="" id="endingTime" />
                    <img src="redfolderImages/h5_hb_time_bg.png" alt="" id="timeBar" />
                    <h2 className="endingTimeNum"><span>Ending time:</span> 00 D 00 Min 00 Sec</h2>
                    <span className="endingTimeText"><h2> 00 DAY <br /> 00 H <br /> 00 Min <br /> 00 Sec</h2></span>
                    <img src="redfolderImages/pc_hb_btn.png" alt="" id="btn" />
                    <h3 id="getItNow">Get it Now</h3>
                </div>
                <div className="awardList">
                    <div className="mainList">
                        <div className="awardHeader">
                            <img src="redfolderImages/pc_hb_l.png" alt="" />
                            <h1>Awards list</h1>
                            <img src="redfolderImages/pc_hb_r.png" alt="" />
                        </div>
                        <div className="winners">
                            <span className="winnerDetails" id="winnerDetails1">
                                <p>恭喜 <span>kj*****</span></p>
                                <p>获得 <span>222.22</span></p>
                                <p>2023-09-17 11:11:11</p>
                            </span>
                            <span className="winnerDetails">
                                <p>恭喜 <span>kj*****</span></p>
                                <p>获得 <span>222.22</span></p>
                                <p>2023-09-17 11:11:11</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RedFolder