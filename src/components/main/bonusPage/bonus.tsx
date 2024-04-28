import React from "react";
import MainLayout from "../../layout";
import "./bonus.scss";

function Bonus() {
  const records = [
    {
      time: "12:00",
      name: "VG Villar",
      bonus: "$20.00",
      source: "Referral",
      status: "Pending",
    },
    {
      time: "11:00",
      name: "Mark Villar",
      bonus: "$110.00",
      source: "Referral",
      status: "Pending",
    },
    {
      time: "8:00",
      name: "Jonel VIllar",
      bonus: "$1220.00",
      source: "Referral",
      status: "Pending",
    },
  ];
  return (
    <MainLayout>
      <section>
        <div className="bonusPage">
          <div className="bonusHeader">
            <button className="returnButton">Return</button>
            <div className="statusDropdown">
              <select>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="all">All</option>
                <option value="cancelled">Cancelled</option>
                <option value="expired">Expired</option>
                <option value="refunded">Refunded</option>
                <option value="withdrawn">Withdrawn</option>
                <option value="incomplete">Incomplete</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div className="headerRight">
              <button className="collectButton">Collection Reg</button>
              <button className="collectAllButton">Collect All</button>
              <div className="bonusAmount">Bonus $0.00</div>
            </div>
          </div>
          <div className="bonusContent">
            {records.length > 0 ? (
              <table className="bonusTable">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Name</th>
                    <th>Bonus</th>
                    <th>Source</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index}>
                      <td>{record.time}</td>
                      <td>{record.name}</td>
                      <td>{record.bonus}</td>
                      <td>{record.source}</td>
                      <td>{record.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="noRecords">No Records</div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Bonus;
