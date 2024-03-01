import React from 'react'
import "./componentsStyle.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Highscore({ highscore }) {


  return (
    <div className='' >
      <h1 style={{ color: "black" }}>Highscores (Top 10)</h1>
      <div className='' >
        {
          // highscore && highscore.map((user, ind) => (
            // <p className= 'individualscore' key={ind}> {(user.email.split('@')[0]).charAt(0).toUpperCase()+((user.email.split('@')[0]).slice(1))} -  {user.score}</p>
<>
            <TableContainer component={Paper} style={{background:"linear-gradient(to bottom, #f0c760, #dc954a, #e18026)"}}>
              <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell> <b>User</b> </TableCell>
                    <TableCell align="right"><b>Score</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    > */}
                 {   highscore && highscore.map((user, ind) => (
                    <TableRow key={ind}>
                      <TableCell component="th" scope="row">
                      {(user.email.split('@')[0]).charAt(0).toUpperCase()+((user.email.split('@')[0]).slice(1))} 
                      </TableCell>
                      <TableCell align="right">{user.score}</TableCell>
                    </TableRow>
                  ))} 
                </TableBody>
              </Table>
            </TableContainer>
            </>
        }
      </div>
    </div>
  )
}

export default Highscore