import React, { useState , useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ApiUrl } from './ApiConstants';
import axios from 'axios'
import EditTable from './EditTable';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  

  const useStyles = styled({
      table : {
          marginTop: '100px',
          minWidth: 900,
      },
  });


const Home = () => {

    const [rows,setRows] = useState([]);
    const [previous, setPrevious] = useState({});
    const [editData, setEditData] = useState("false");

    
    const deleteId = key =>{
        console.log("in delete",key);
        let data = rows;
        data.splice(key,1);
        console.log(data);
        setRows([...data]);
    }

      

    useEffect(() => {
        console.log("useEffect called");
        let rowData = [];
        let url = ApiUrl.getData;
        axios.get(url)
            .then(response => {
                console.log(response);
                response.data.data.map((item,index) => {
                    if(item.id != null){
                        rowData.push(item);
                    }
                });
                setRows(rowData);
                //console.log("rows----",rows);
             } );
    
    }, []);

    useEffect(() =>{
        localStorage.setItem('apiData', JSON.stringify(rows));
    }, [rows])

    const classes = useStyles();
    return (
        <div className={classes.table}>
            <h2>INFILON ASSIGNMENT</h2>
          <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Avatar</StyledTableCell>
            <StyledTableCell align="right" >Id</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
            <StyledTableRow key={row.id}>
              {/* <StyledTableCell component="th" scope="row">
                {row.avatar}
              </StyledTableCell> */}
              <img src={row.avatar} alt="image"></img>
              <StyledTableCell align="right" contentEditable={editData}>{row.id}</StyledTableCell>
              <StyledTableCell align="right" contentEditable={editData}>{row.first_name}</StyledTableCell>
              <StyledTableCell align="right" contentEditable={editData}>{row.last_name}</StyledTableCell>
              <StyledTableCell align="right" contentEditable={editData}>{row.email}</StyledTableCell>
              <StyledTableCell align="right">
              <Button variant="outlined" size="medium" onClick={() => setEditData("true")}>
                Edit
            </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
              <Button variant="outlined" size="medium" onClick={(key) => deleteId(key)}>
                 Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>
    )
    
}

export default Home;