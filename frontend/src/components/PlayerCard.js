import React from "react"
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Stack,
} from "@mui/material"
import img from "./profile.jpg"

const PlayerCard = ({ visibility, player }) => {
  console.log(player)
  if (visibility)
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={img}
            alt="green iguana"
          />
          <CardContent>
            <Stack
              direction="column"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {player.n}
              </Typography>
              <Typography variant="h3" component="div" color="text.secondary">
                {player.p}
              </Typography>
              <Typography variant="body" component="div" color="text.secondary">
                points
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}

export default PlayerCard
