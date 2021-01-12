import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const RankingBoard = ({ title, tableData }) => {
  const classes = useStyles();
  let tbl = "";

  if (tableData) {
    const rows = tableData.map((data, i) => {
      const id = i;
      const rank = data.rank;
      const idNumber = data.idNumber;
      const name = data.name;
      const avgScore = data.avgScore;
      const ttlScore = data.ttlScore;
      return { id, rank, idNumber, name, avgScore, ttlScore };
    });

    tbl = (
      <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ranking</TableCell>
              <TableCell>ID Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Average Score</TableCell>
              <TableCell align="right">Total Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.rank}</TableCell>
                <TableCell>{row.idNumber}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.avgScore}</TableCell>
                <TableCell align="right">{row.ttlScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          {/* <Link color="primary" href="#" onClick={preventDefault}>
            See full ranking
          </Link> */}
        </div>
      </>
    );
  }

  return (
    <React.Fragment>
      <Title>{title}</Title>
      {tableData ? tbl : <Typography>No students records yet</Typography>}
    </React.Fragment>
  );
};

export default RankingBoard;
