import React from "react"
import Form from "../components/Form"
import Navabar from "../components/Navabar"
import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"

const Home = () => {
  return (
    <Box width="100vw">
      <Box height="10vh" sx={{ backgroundColor: "black" }}>
        <Navabar />
      </Box>
      <Box
        width="100%"
        sx={{
          backgroundColor: grey[900],
          height: "90vh",
        }}
      >
        <Form />
      </Box>
    </Box>
  )
}

export default Home
