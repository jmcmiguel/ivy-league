import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const EnrolledStudentsTable = ({ users }) => {
  const rows = users.map((user, i) => {
    const id = i;
    const name = `${user.lastName}, ${user.firstName} ${user.middleName}`;
    const idNumber = user.idNumber;
    const email = user.email;
    const contactNumber = user.contactNumber ? user.contactNumber : "N/A";
    return { id, name, idNumber, email, contactNumber };
  });

  return (
    <div>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>ID Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{users ? row.name : <Skeleton />}</TableCell>
              <TableCell>{row.idNumber}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.contactNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EnrolledStudentsTable;
