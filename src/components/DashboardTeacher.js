import React from "react";
import { Divider, Box, Typography } from "@material-ui/core";
import DashboardCharts from "../components/DashboardCharts";

const DashboardTeacher = () => {
  const sampledata = [
    {
      section: "NW3D",
      subject: "ICTC-1213",
      desc: "Software Engineering 1",
      highestScorer: "Sanchez, Rick",
      topScore: 100,
      chartData: [
        { examname: "Exam 1", avgscore: 20 },
        { examname: "Exam 2", avgscore: 10 },
        { examname: "Exam 3", avgscore: 30 },
        { examname: "Exam 4", avgscore: 50 },
        { examname: "Exam 5", avgscore: 80 },
      ],
      tableData: [
        {
          rank: 1,
          idNumber: "18-0xxxx",
          name: "Rick Sanchez",
          section: "NW3D",
          avgScore: 102,
          ttlScore: 9000,
        },
        {
          rank: 2,
          idNumber: "20-0xxxx",
          name: "Morty Smith",
          section: "NW2C",
          avgScore: 10,
          ttlScore: 90,
        },
        {
          rank: 3,
          idNumber: "14-0xxxx",
          name: "Light Yagami",
          section: "NW4F",
          avgScore: 400,
          ttlScore: 10000,
        },
        {
          rank: 4,
          idNumber: "16-0xxxx",
          name: "Tanjiro Kamado",
          section: "NW4A",
          avgScore: 1123,
          ttlScore: 901230,
        },
        {
          rank: 5,
          idNumber: "18-0xxxx",
          name: "Nezuko-Chan",
          section: "NW3D",
          avgScore: 1023,
          ttlScore: 9420,
        },
      ],
    },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      {sampledata.length ? (
        sampledata.map((data, i) => {
          return (
            <div key={i}>
              <DashboardCharts
                section={data.section}
                subject={data.subject}
                desc={data.desc}
                highestScorer={data.highestScorer}
                topScore={data.topScore}
                chartData={data.chartData}
                tableData={data.tableData}
              />

              {sampledata.length === i + 1 ? null : (
                <Divider style={{ marginTop: "8rem", marginBottom: "5rem" }} />
              )}
            </div>
          );
        })
      ) : (
        <Box pt={8} style={{ marginBottom: "3rem" }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom>
            {`Yikes! No data to show yet :/`}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p">
            To show data, add students and exam using the sidebar
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default DashboardTeacher;
