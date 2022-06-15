import React, { useEffect, useState } from "react"
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material"
import { grey } from "@mui/material/colors"
import axios from "axios"
import PlayerTable from "./PlayerTable"

const BASE_URL = " https://app.aurictouch.com"

const Form = () => {
  const [operatorList, setOperatorList] = useState([])
  const [gameTypeList, setGameTypeList] = useState([])
  const [operatorNameList, setOperatorNameList] = useState([])
  const [operator, setOperator] = useState("")
  const [operatorGameType, setOperatorGameType] = useState("")
  const [operatorName, setOperatorName] = useState("")

  useEffect(() => {
    const getOperator = async () => {
      const { data } = await axios.get(`${BASE_URL}/operator`)
      setOperatorList(data.data)
    }
    getOperator()
    const getGameType = async (operator) => {
      const { data } = await axios.get(`${BASE_URL}/operatorGameType`, {
        params: { operator },
      })
      setGameTypeList(data.data)
    }
    getGameType(operator)

    const getOperatorName = async (operator, operatorGameType) => {
      const { data } = await axios.get(`${BASE_URL}/operatorName`, {
        params: { operator, operatorGameType },
      })
      setOperatorNameList(data.data)
    }

    getOperatorName(operator, operatorGameType)
  }, [operator, operatorGameType])

  return (
    <Box paddingTop={5}>
      <Box
        marginX="auto"
        width="82vw"
        paddingX={2}
        sx={{
          height: "15vh",
          backgroundColor: grey[700],
          paddingTop: "20px",
        }}
      >
        <Stack maxWidth="80vw" marginX="auto" direction="row" spacing={3}>
          <FormControl
            sx={{ backgroundColor: grey[900], color: "white", width: "300px" }}
          >
            <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
              Select Operator
            </InputLabel>
            <Select
              sx={{ color: "white" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={operator}
              label="Select Operator"
              onChange={(e) => setOperator(e.target.value)}
            >
              {operatorList.map((o) => (
                <MenuItem value={o}>{o}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{ backgroundColor: grey[900], color: "white", width: "300px" }}
          >
            <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
              Select Game Type
            </InputLabel>
            <Select
              sx={{ color: "white" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={operatorGameType}
              label="Select Operator"
              onChange={(e) => setOperatorGameType(e.target.value)}
            >
              {gameTypeList.map((o) => (
                <MenuItem value={o}>{o}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              backgroundColor: grey[900],
              color: "white",
              width: "300px",
              padding: "2px",
            }}
          >
            <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
              Select Operator Name
            </InputLabel>
            <Select
              sx={{ color: "white" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={operatorName}
              label="Select Operator"
              onChange={(e) => setOperatorName(e.target.value)}
            >
              {operatorNameList.map((o) => (
                <MenuItem value={o}>{o}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <Box marginTop={4}>
        <PlayerTable
          operator={operator}
          operatorGameType={operatorGameType}
          operatorName={operatorName}
        />
      </Box>
    </Box>
  )
}

export default Form
