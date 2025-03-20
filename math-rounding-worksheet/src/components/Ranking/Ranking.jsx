import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import "./Ranking.css";
import db from "../../config/connection.js";

const columns = [
  {
    name: "Rank",
    selector: (row) => row.rank,
    sortable: true,
    width: "90px",
  },
  {
    name: "Username",
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Score",
    selector: (row) => row.score,
    sortable: true,
    width: "100px",
  },
  {
    name: "Submitted At",
    selector: (row) => new Date(row.updated_at).toISOString().split("T")[0],
    sortable: true,
  },
];

const Ranking = () => {
  const apiKey = db.API_URL;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${apiKey}/api/ranking`)
      .then((res) => res.json())
      .then((data) => {
        const rankedData = data.results.map((item, index) => ({
          ...item,
          rank: index + 1,
        }));

        setData(rankedData);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 style={{ marginTop: "10%" }}>Ranking</h1>

      <div className="lottieAnimation_wrapper">
        <DotLottieReact
          src="https://lottie.host/47df88bd-dfd7-4497-9d69-0ac3a6d60969/KS8drrg4Ql.lottie"
          loop
          autoplay
        />
      </div>

      <div style={{ width: "80%", margin: "auto" }}>
        <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
          conditionalRowStyles={[
            {
              when: (row) => row.rank === 1,
              style: {
                backgroundColor: "#FFD700",
                color: "#000",
                fontWeight: "bold",
              },
            },
            {
              when: (row) => row.rank === 2,
              style: {
                backgroundColor: "#C0C0C0",
                color: "#000",
                fontWeight: "bold",
              },
            },
            {
              when: (row) => row.rank === 3,
              style: {
                backgroundColor: "#CD7F32",
                color: "#fff",
                fontWeight: "bold",
              },
            },
          ]}
        />
      </div>
    </>
  );
};

export default Ranking;
