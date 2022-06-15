import React, { useState, useEffect } from "react"
import { useTheme } from "@mui/material/styles"
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Stack,
} from "@mui/material"
import axios from "axios"
import { grey, lime } from "@mui/material/colors"
import PlayerCard from "./PlayerCard"

const BASE_URL = " https://app.aurictouch.com"

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ position: "right", flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? (
          <i class="fa-solid fa-circle-chevron-right"></i>
        ) : (
          <i class="fa-solid fa-circle-chevron-left"></i>
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <i className="fa-solid fa-arrow-right"></i>
        ) : (
          <i className="fa-solid fa-arrow-left"></i>
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <i className="fa-solid fa-arrow-left"></i>
        ) : (
          <i className="fa-solid fa-arrow-right"></i>
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? (
          <i class="fa-solid fa-circle-chevron-left"></i>
        ) : (
          <i class="fa-solid fa-circle-chevron-right"></i>
        )}
      </IconButton>
    </Box>
  )
}

const PlayerTable = ({ operator, operatorGameType, operatorName }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rows, setRows] = useState([])
  const [cardVisibility, setCardVisibility] = useState(false)
  const [player, setPlayer] = useState({})
  const [sortSalary, setSortSalary] = useState("asc")
  const [sortPoints, setSortPoints] = useState("asc")
  const [sortName, setSortName] = useState("asc")

  useEffect(() => {
    const getPlayers = async (operator, operatorGameType, operatorName) => {
      const { data } = await axios.get(`${BASE_URL}/players`, {
        params: { operator, operatorGameType, operatorName },
      })
      setRows(data.data)
    }

    getPlayers(operator, operatorGameType, operatorName)
  }, [operator, operatorGameType, operatorName])

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClick = (e, n, p) => {
    if (cardVisibility === false) {
      setCardVisibility((visibility) => !visibility)
      setPlayer({ n, p })
    }

    if (cardVisibility === true)
      if (n !== player.n) setPlayer({ n, p })
      else {
        setCardVisibility(false)
        setPlayer({})
      }
  }
  const handleSortBySalary = () => {
    setRows(
      rows
        .sort((a, b) =>
          sortSalary === "asc"
            ? a.operatorSalary - b.operatorSalary
            : b.operatorSalary - a.operatorSalary
        )
        .map((r) => ({ ...r }))
    )
    if (sortSalary === "asc") setSortSalary("desc")
    else setSortSalary("asc")
  }
  const handleSortByPoints = () => {
    setRows(
      rows
        .sort((a, b) =>
          sortPoints === "asc"
            ? a.fantasyPoints - b.fantasyPoints
            : b.fantasyPoints - a.fantasyPoints
        )
        .map((r) => ({ ...r }))
    )
    if (sortPoints === "asc") setSortPoints("desc")
    else setSortPoints("asc")
  }
  const handleSortByName = () => {
    setRows(
      rows
        .sort((a, b) =>
          sortName === "asc"
            ? a.operatorPlayerName > b.operatorPlayerName
              ? 1
              : b.operatorPlayerName > a.operatorPlayerName
              ? -1
              : 0
            : a.operatorPlayerName > b.operatorPlayerName
            ? -1
            : b.operatorPlayerName > a.operatorPlayerName
            ? 1
            : 0
        )
        .map((r) => ({ ...r }))
    )
    if (sortName === "asc") setSortName("desc")
    else setSortName("asc")
  }

  return (
    <Stack direction="row" spacing={10}>
      <TableContainer
        sx={{ marginLeft: "120px", height: "55vh", maxWidth: "55vw" }}
        component={Paper}
      >
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell
                onClick={handleSortByName}
                sx={{
                  cursor: "pointer",
                  backgroundColor: grey[800],
                  color: "white",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: grey[800],
                  color: "white",
                }}
              >
                Team
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: grey[800],
                  color: "white",
                }}
              >
                Position
              </TableCell>
              <TableCell
                onClick={handleSortBySalary}
                sx={{
                  cursor: "pointer",
                  backgroundColor: grey[800],
                  color: "white",
                }}
              >
                Salary
              </TableCell>
              <TableCell
                onClick={handleSortByPoints}
                sx={{
                  cursor: "pointer",
                  backgroundColor: grey[800],
                  color: "white",
                }}
              >
                Points
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow
                sx={{
                  backgroundColor:
                    cardVisibility && player.n === row.operatorPlayerName
                      ? lime[700]
                      : grey[700],
                }}
                key={row.name}
                onClick={(e) =>
                  handleClick(e, row.operatorPlayerName, row.fantasyPoints || 0)
                }
              >
                <TableCell sx={{ color: "white" }} component="th" scope="row">
                  {row.operatorPlayerName}
                </TableCell>
                <TableCell
                  sx={{ color: "white" }}
                  size="small"
                  component="th"
                  scope="row"
                >
                  {row.team}
                </TableCell>
                <TableCell sx={{ color: "white" }} component="th" scope="row">
                  {row.operatorPosition}
                </TableCell>
                <TableCell sx={{ color: "white" }} component="th" scope="row">
                  {row.operatorSalary}
                </TableCell>
                <TableCell sx={{ color: "white" }} component="th" scope="row">
                  {row.fantasyPoints || 0}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={2} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {rows.length !== 0 && (
                <TablePagination
                  sx={{ width: "100%" }}
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={4}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <PlayerCard visibility={cardVisibility} player={player} />
    </Stack>
  )
}

export default PlayerTable
