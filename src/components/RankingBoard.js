import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, rank, idNumber, name, section, avgScore, ttlScore) {
  return {
    id,
    rank,
    idNumber,
    name,
    section,
    avgScore,
    ttlScore,
  };
}

const rows = [
  createData(0, 1, "18-0xxxx", "Tanjiro Kamado", "NW3D", 65, 312.44),
  createData(1, 2, "20-0xxxx", "Monkey D. Luffy", "NW3A", 5, 31.44),
  createData(2, 3, "19-0xxxx", "Rick Sanchez", "NW3D", 100, 500),
  createData(3, 4, "18-0xxxx", "Morty Smith", "NW3E", 20, 102),
  createData(4, 5, "18-0xxxx", "Summer Smith", "NW3B", 65, 36.44),
  createData(5, 6, "20-0xxxx", "Light Yagami", "NW3C", 80, 312.44),
  createData(6, 7, "18-0xxxx", "Ronoroa Zorro", "NW3D", 60, 230.44),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const RankingBoard = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Ranking Board</Title>
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
