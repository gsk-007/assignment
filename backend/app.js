import express from "express"
import dotenv from "dotenv"
import fs from "fs"
import morgan from "morgan"

dotenv.config()

const app = express()

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running...")
})

const content = JSON.parse(fs.readFileSync("data.json", { encoding: "utf-8" }))

// List all operators
app.get("/operator", (req, res) => {
  const allOperators = []
  content.map((d) => {
    if (!allOperators.includes(d.operator)) allOperators.push(d.operator)
  })
  res.status(200).json(allOperators)
})

//  List all unique game types -> List all operatorGameType based on operator
app.get("/operatorGameType", (req, res, next) => {
  const { operator } = req.query
  if (!operator) {
    return res.status(401).json({
      message: "Operator Required",
    })
  }
  const operatorGameType = []
  content.map((d) => {
    if (
      d.operator === operator &&
      !operatorGameType.includes(d.operatorGameType)
    )
      operatorGameType.push(d.operatorGameType)
  })
  res.status(200).json(operatorGameType)
})

// List all operatorNames based on operator and operatorGameType
app.get("/operatorName", (req, res) => {
  const { operator, operatorGameType } = req.query
  if (!operator) {
    return res.status(401).json({
      message: "Operator Required",
    })
  }

  if (!operatorGameType) {
    return res.status(401).json({
      message: "OperatorGameType Required",
    })
  }

  const operatorName = []
  content.map((d) => {
    if (
      d.operator === operator &&
      d.operatorGameType === operatorGameType &&
      !operatorName.includes(d.operatorName)
    )
      operatorName.push(d.operatorName)
  })
  res.status(200).json(operatorName)
})

// list all players based on operator, operator game type and operator name
app.get("/player", (req, res) => {
  const { operator, operatorGameType, operatorName } = req.query

  if (!operator) {
    return res.status(401).json({
      message: "Operator Required",
    })
  }

  if (!operatorGameType) {
    return res.status(401).json({
      message: "OperatorGameType Required",
    })
  }

  if (!operatorName) {
    return res.status(401).json({
      message: "OperatorName Required",
    })
  }

  var playersList = []
  content.map((d) => {
    if (
      d.operator === operator &&
      d.operatorGameType === operatorGameType &&
      d.operatorName === operatorName
    )
      playersList = [...d.dfsSlatePlayers]
  })
  res.status(200).json(playersList)
})

// Return the highest points player.
app.get("/player/best", (req, res) => {
  const { operator, operatorGameType, operatorName } = req.query

  if (!operator) {
    return res.status(401).json({
      message: "Operator Required",
    })
  }

  if (!operatorGameType) {
    return res.status(401).json({
      message: "OperatorGameType Required",
    })
  }

  if (!operatorName) {
    return res.status(401).json({
      message: "OperatorName Required",
    })
  }

  var playersList = []
  content.map((d) => {
    if (
      d.operator === operator &&
      d.operatorGameType === operatorGameType &&
      d.operatorName === operatorName
    )
      playersList = [...d.dfsSlatePlayers]
  })
  var max = 0,
    bestPlayer = {}

  playersList.map((p) => {
    if (p.fantasyPoints > max) {
      max = p.fantasyPoints
      bestPlayer = p
    }
  })

  res.status(200).json(bestPlayer)
})

app.use((req, res) => {
  res.status(404).send(`Url Not found ${req.originalUrl}`)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
