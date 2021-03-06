// @ts-check
import { GameState } from './gameState.js'
import { Player } from './player.js'
import { Enemy } from './enemy.js'
import { drawRect, drawText } from './common-graphics.js';

const levelOne = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,
  1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,2,0,0,2,0,0,0,0,3,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,1,1,1,
  1,1,0,0,2,0,0,2,0,0,0,0,3,0,0,0,0,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

export const playerStart = 2
export const darkBrick = 3
export const lightBrick = 4
export let grid = [ ...levelOne ];
export const gridWidth = 80;
export const gridHeight = 60;
export const gridCols = 800 / gridWidth;
export const gridRows = 600 / gridHeight;
const darkSquare = 10

function insertSquares () {
  // To visualize grid
  for (let eachRowFirst = 0; eachRowFirst < gridRows; eachRowFirst++) {
    for (let eachColFirst = 0; eachColFirst < gridCols; eachColFirst++) {
      const index = colRowIndex(eachColFirst, eachRowFirst)
      if (eachRowFirst % 2 === 0) {
        if (eachColFirst % 2 === 0) {
          grid[index] = darkSquare
        }
      } else {
        if (eachColFirst % 2 !== 0) {
          grid[index] = darkSquare
        }
      }
    }
  }
}

insertSquares()

export function colRowIndex (col, row) {
  return col + gridCols * row
}

export function findGridUnit (centerX, centerY) {
  const gridCol = Math.floor(centerX / gridWidth)
  const gridRow = Math.floor(centerY / gridHeight)
  return colRowIndex(gridCol, gridRow)
}

export function drawMap() {
  let drawTileX = 0
  let drawTileY = 0
  const width = gridWidth
  const height = gridHeight
  for (let eachRow = 0; eachRow < gridRows; eachRow++) {
    for (let eachCol = 0; eachCol < gridCols; eachCol++) {
      const gridUnit = colRowIndex(eachCol, eachRow)
      if (grid[gridUnit] === darkSquare) {
        drawRect(drawTileX, drawTileY, width, height, 'darkgrey')
      }
      drawText(gridUnit.toString(), drawTileX + (width / 2) - 12, drawTileY + height/2, 'black')
      drawTileX += gridWidth
    }
    drawTileY += gridHeight
    drawTileX = 0
  }
}

function getPlayerStartPos () {
  for (let eachRow = 0; eachRow < gridRows; eachRow++) {
    for (let eachCol = 0; eachCol < gridCols; eachCol++) {
      let index = colRowIndex(eachCol, eachRow)
      if (grid[index] === playerStart) {
        const x = eachCol * gridWidth
        const y = eachRow * gridHeight
        grid[index] = 0
        return { x, y }
      }
    }
  }
}


export const createNewPlayer = () => new Player(
  150,
  50,
  'blue',
  'green',
  8,
  5,
  0, // Not sure about speed
  10 
)

export const createEnemy = (x, y, width, height, target) => new Enemy(
  x,
  y,
  'orange',
  'green',
  width,
  height,
  Math.floor(Math.random() * 10) + 5,
  width / 3,
  target,
  Math.random()
)

export const canvas = document.getElementById('gameCanvas')
// @ts-ignore
export const { width: canvasWidth, height: canvasHeight } = canvas
// @ts-ignore
export const ctx = canvas.getContext('2d')
export const gameState = new GameState()
// @ts-ignore
window.gameState = gameState
gameState.drawStartScreen(true)

