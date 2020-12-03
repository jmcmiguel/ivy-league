import React from "react";
import { Divider, Box, Typography, Paper } from "@material-ui/core";
import DashboardCharts from "../components/DashboardCharts";
import useStylesTeacherHome from "../components/styles/useStylesTeacherHome";
import clsx from "clsx";

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
          avgScore: 102,
          ttlScore: 9000,
        },
        {
          rank: 2,
          idNumber: "20-0xxxx",
          name: "Morty Smith",
          avgScore: 10,
          ttlScore: 90,
        },
        {
          rank: 3,
          idNumber: "14-0xxxx",
          name: "Light Yagami",
          avgScore: 400,
          ttlScore: 10000,
        },
        {
          rank: 4,
          idNumber: "16-0xxxx",
          name: "Tanjiro Kamado",
          avgScore: 1123,
          ttlScore: 901230,
        },
        {
          rank: 5,
          idNumber: "18-0xxxx",
          name: "Nezuko-Chan",
          avgScore: 1023,
          ttlScore: 9420,
        },
      ],
    },
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
          avgScore: 102,
          ttlScore: 9000,
        },
        {
          rank: 2,
          idNumber: "20-0xxxx",
          name: "Morty Smith",
          avgScore: 10,
          ttlScore: 90,
        },
        {
          rank: 3,
          idNumber: "14-0xxxx",
          name: "Light Yagami",
          avgScore: 400,
          ttlScore: 10000,
        },
        {
          rank: 4,
          idNumber: "16-0xxxx",
          name: "Tanjiro Kamado",
          avgScore: 1123,
          ttlScore: 901230,
        },
        {
          rank: 5,
          idNumber: "18-0xxxx",
          name: "Nezuko-Chan",
          avgScore: 1023,
          ttlScore: 9420,
        },
      ],
    },
  ];

  const classes = useStylesTeacherHome();
  const fixedHeightPaper = clsx(classes.paper);

  return (
    <div style={{ minHeight: "100vh" }}>
      {sampledata.length ? (
        sampledata.map((data, i) => {
          return (
            <div key={i}>
              <Paper
                className={fixedHeightPaper}
                style={{ marginBottom: "3.5rem" }}>
                <DashboardCharts
                  section={data.section}
                  subject={data.subject}
                  desc={data.desc}
                  highestScorer={data.highestScorer}
                  topScore={data.topScore}
                  chartData={data.chartData}
                  tableData={data.tableData}
                />
              </Paper>
              {/* {sampledata.length === i + 1 ? null : (
                <Divider style={{ marginTop: "8rem", marginBottom: "5rem" }} />
              )} */}
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
