import * as React from "react";

import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Select from '@mui/material/Select';
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import { grey } from "@mui/material/colors";
import TableRow from "@mui/material/TableRow";
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from "@mui/material/TablePagination";
import FormControlLabel from "@mui/material/FormControlLabel";

import AddUserDialog from "./addUserDialog";
import UpdateUserDialog from "./updateUserDialog";
import { HomeServices } from "../../../services/homeService";

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: "firstname",
		numeric: false,
		disablePadding: false,
		label: "First Name",
	},
	{
		id: "lastname",
		numeric: false,
		disablePadding: false,
		label: "Last Name",
	},
	{
		id: "email",
		numeric: false,
		disablePadding: false,
		label: "Email",
	},
	{
		id: "phone",
		numeric: false,
		disablePadding: false,
		label: "Phone Number",
	},
	{
		id: "role",
		numeric: false,
		disablePadding: false,
		label: "Role",
	},
];

function EnhancedTableHead(props) {
	const {
		order,
		orderBy,
		onRequestSort,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell, index) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold" }}
					>
            <Tooltip title={`Sort by ${headCell.label}`} placement="top">
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </Tooltip>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({
  requestSearch,
  searched,
  handleChange,
  searchBy,
  refreshTable,
  setShowAddUser
}) => {
	return (
		<Toolbar
			sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }}}
		>
			<Typography
					sx={{ flex: "1 1 100%", alignItems: 'center', flexWrap: 'wrap', }}
					variant='h5'
					id='tableTitle'
					component='div'
				>
          Users
          <Tooltip title="Add new user" placement="top">
            <IconButton 
              aria-label="add-user" 
              sx={{ mb: 0.3, ml: 0.2 }}
              onClick={(event) => setShowAddUser(true)}
            >
              <AddIcon color="primary" sx={{ fontSize: 30, m:-0.5}}/>
            </IconButton>
          </Tooltip>
			</Typography>
      <Tooltip title="Use this search bar to filter the table based on the selected column" placement="top">
        <TextField 
          id="search-bar" 
          label="Search" 
          variant="outlined"
          value={searched}
          onChange={(event) => requestSearch(event)}
          sx={{ width: 425 }}
          InputProps={{
            endAdornment: 
              <InputAdornment position="end"><SearchIcon/></InputAdornment>
          }}
        />
      </Tooltip>
      <Tooltip title="Selects the column to search for" placement="top">
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel  id="select-search-by-label">Column</InputLabel>
          <Select
            labelId="select-search-by-label"
            label="Column"
            id="select-search-by"
            value={searchBy}
            onChange={handleChange}
          >
            <MenuItem value={"firstname"}>First Name</MenuItem>
            <MenuItem value={"lastname"}>Last Name</MenuItem>
            <MenuItem value={"email"}>Email</MenuItem>
            <MenuItem value={"phone"}>Phone Number</MenuItem>
          </Select>
        </FormControl>
      </Tooltip>
      <Tooltip title="Refresh" placement="top">
        <IconButton 
          component="label"
          onClick={() => {refreshTable(false)}}
        >
          <RefreshIcon sx={{ fontSize: 32, m:-0.5 }}/>
        </IconButton>
      </Tooltip>
		</Toolbar>
	);
}

const userTableRows = (visibleRows, isSelected, handleClick) => {
  return visibleRows.map((visRow, index) => {
    const isItemSelected = isSelected(visRow);
    const labelId = `enhanced-table-checkbox-${index}`;

    return (
      <TableRow
        hover
        onClick={(event) => handleClick(event, visRow)}
        role='checkbox'
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={labelId}
        selected={isItemSelected}
        sx={{ cursor: "pointer" }}
      >
        <TableCell
          component='th'
          id={labelId}
          scope='row'
          padding='normal'
        >
          {visRow.firstname}
        </TableCell>
        <TableCell align='left'>{visRow.lastname}</TableCell>
        <TableCell align='left'>{visRow.email}</TableCell>
        <TableCell align='left'>{visRow.phone}</TableCell>
        <TableCell align='left'>{visRow.role}</TableCell>
      </TableRow>
  );
  })
}

const UsersTable = ({
  setAlert,
  setAlertText,
  setAlertSeverity
}) => {
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("firstname");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [rows, setRows] = React.useState([]);
  const [searchedRows, setSearchedRows] = React.useState([]);
  const [searched, setSearched] = React.useState("");
  const [showSelectedPopup, setShowSelectedPopup] = React.useState(false);
  const [searchBy, setSearchBy] = React.useState("lastname");
  const [databaseRefresh, setDatabaseRefresh] = React.useState({});
  const [showAddUser, setShowAddUser] = React.useState(false);

  const refreshTable = (getFromDatabase) => {
    if (!getFromDatabase){
      setSearched("");
      setSearchedRows(rows);
    } else {
      setDatabaseRefresh({random: (Math.random() + 1).toString(36).substring(7)})
    }
  }

  const handleChangeSearchBy = (event) => {
    setSearchBy(event.target.value);
    refreshTable(false)
  };

  const requestSearch = (event) => {
    let filteredRows = rows.filter((row) => {
      return row[searchBy].toLowerCase().startsWith(event.target.value.toLowerCase());
    });
    setSearched(event.target.value);
    setSearchedRows(filteredRows);
  };

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleClick = (event, row) => {
		setSelected(row);
    setShowSelectedPopup(true);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	React.useMemo(() => {
		HomeServices.getAllUsers()
			.then((res) => {
				setRows(res);
        setSearchedRows(res);
			})
			.catch((err) => {
				console.log(err);
        setAlert(true)
        setAlertText("Could not retrieve users from the database.")
        setAlertSeverity("error")
			});
	}, [databaseRefresh]);

	const isSelected = (visRow) => selected === visRow;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			stableSort(searchedRows, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[order, orderBy, page, rowsPerPage, searchedRows, searched]
	);

	return (
		<Box component='main' sx={{ paddingTop: 13, paddingLeft: 5 }}>
      <AddUserDialog
        show={showAddUser}
        setShow={setShowAddUser}
        setAlert={setAlert}
        setAlertText={setAlertText}
        setAlertSeverity={setAlertSeverity}
        refreshTable={refreshTable}
      />
      <UpdateUserDialog
        show={showSelectedPopup}
        setShow={setShowSelectedPopup}
        row={selected}
        setAlert={setAlert}
        setAlertText={setAlertText}
        setAlertSeverity={setAlertSeverity}
        refreshTable={refreshTable}
      />
			<div className='d-flex flex-row flex-wrap'>
				<Paper sx={{ width: "100%", mb: 2, background: grey[100] }}>
					<EnhancedTableToolbar 
            numSelected={selected.length}
            requestSearch={requestSearch}
            searched={searched}
            handleChange={handleChangeSearchBy}
            searchBy={searchBy}
            refreshTable={refreshTable}
            setShowAddUser={setShowAddUser}
          />
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby='tableTitle'
							size={dense ? "small" : "medium"}
						>
							<EnhancedTableHead
								order={order}
								orderBy={orderBy}
								onRequestSort={handleRequestSort}
								rowCount={rows.length}
							/>
              <TableBody>
                {userTableRows(visibleRows, isSelected, handleClick)}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
						</Table>
					</TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ mt: 1 }}
          />
				</Paper>
        <Chip sx={{ p: 1, background: grey[150]}} label={
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        } />
        {/* <Tooltip title="Add new user" placement="right">
          <IconButton component="label">
            <PersonAddAlt1Icon fontSize="large"/>
          </IconButton>
        </Tooltip> */}
			</div>
		</Box>
	);
};

export default UsersTable;
