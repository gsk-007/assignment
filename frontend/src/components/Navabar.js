import React from "react"
import { Box, Icon, Typography, Stack } from "@mui/material"

const Navabar = () => {
  return (
    <Box padding="19px">
      <Stack direction="row" sx={{ color: "brown" }}>
        <Icon color="white" class="fa-solid fa-football"></Icon>
        <Typography marginY="-7px" marginX={2} variant="h6" color="white">
          Fantasy Football
        </Typography>
      </Stack>
    </Box>
  )
}

export default Navabar
