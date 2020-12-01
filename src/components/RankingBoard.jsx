import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const RankingBoard = ({ title, tableData }) => {
  const classes = useStyles();

  const rows = tableData.map((data, i) => {
    const id = i;
    const rank = data.rank;
    const idNumber = data.idNumber;
    const name = data.name;
    const section = data.section;
    const avgScore = data.avgScore;
    const ttlScore = data.ttlScore;
    return { id, rank, idNumber, name, section, avgScore, ttlScore };
  });

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ranking</TableCell>
            <TableCell>ID Number</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Average Score</TableCell>
            <TableCell align="right">Total Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.idNumber}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.section}</TableCell>
              <TableCell>{row.avgScore}</TableCell>
              <TableCell align="right">{row.ttlScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See full ranking
        </Link>
      </div>
    </React.Fragment>
  );
};

export default RankingBoard;
