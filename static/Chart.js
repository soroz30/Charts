import React, { Component } from 'react'

class Chart extends React.Component {
  state = {
    stocksData: {},
  }

  componentDidMount() {
    this.drawAxes()
  }

  componentWillReceiveProps(nextProps) {
    const stockNames = nextProps.stockNames
    if (stockNames.length) {
      this.visualizeData(stockNames)
    }
  }

  visualizeData = async (stockNames) => {
    await this.getStocksData(stockNames)
    await this.drawStocks()
  }

  drawAxes = () => {
    this.drawVerticalLine()
    this.drawTriangle([65, 50], [95, 50], [80, 35])
    this.drawHorizontalLine()
    this.drawTriangle([980, 535], [980, 565], [995, 550])
  }

  drawVerticalLine = () => {
    this.canvas.textBaseline = 'middle' 
    this.drawLine([80, 50], [80, 550])
    this.drawVerticalLineScale(40, 10, 80, 550, 20)
    this.drawVerticalString('VALUE', 30, 300)
  }

  drawVerticalLineScale = (distance, number, startX, startY, length) => {
    for (let i = distance; i <= distance * number; i += distance) {
      const scaleStartingXPoint = startX - length / 2
      const scaleEndXPoint = startX + length / 2
      const yScalePosition = startY - i
      const labelXPosition = startX - (length / 2) - 20
      const labelValue = i/(distance/10)
      this.drawLine([scaleStartingXPoint, yScalePosition], [scaleEndXPoint, yScalePosition])
      this.canvas.fillText(`${labelValue}`, labelXPosition, yScalePosition)
    }
  }

  drawVerticalString = (string, startX, startY) => {
    this.canvas.textAlign = 'center'
    const stringArray = string.split('')
    let currentYPos
    for (let i = 0; i < stringArray.length; i++) {
      this.canvas.fillText(stringArray[i], startX, startY)
      startY += 10
    }
    this.canvas.textAlign = 'start'
  }

  drawHorizontalLine = () => {
    this.drawLine([80, 550], [980, 550])
    this.drawHorizontalLineScale(80, 10, 80, 550, 20)
    this.canvas.fillText('TIME', 500, 595)
  }

  drawHorizontalLineScale = (distance, number, startX, startY, length) => {
    this.canvas.textAlign = 'center' 
    for (let i = distance; i <= distance * number; i += distance) {
      const xScalePos = 80 + i
      const scaleStartingYPoint = startY - length / 2
      const scaleEndYPoint = startY + length / 2
      const labelValue = i / distance
      const labelYPosition = startY + length / 2 + 15
      this.drawLine([xScalePos, scaleStartingYPoint], [xScalePos, scaleEndYPoint])
      this.canvas.fillText(labelValue, xScalePos, labelYPosition)
    }
    this.canvas.textAlign = 'start'
  }

  drawLine = (start, end, style) => {
    this.canvas.beginPath()
    this.canvas.strokeStyle = style || 'black'
    this.canvas.moveTo(...start)
    this.canvas.lineTo(...end)
    this.canvas.stroke()
  }

  drawTriangle = (apex1, apex2, apex3) => {
    this.canvas.beginPath()
    this.canvas.moveTo(...apex1)
    this.canvas.lineTo(...apex2)
    this.canvas.lineTo(...apex3)
    this.canvas.fill()
  }

  getRandomColor = () => {
    let color = '#'
    const chars = '0123456789ABCDEF'
    for (let i = 0; i < 6; i++) {
      color += chars[Math.floor(Math.random() * 16)]
    }
    console.log(color)
    return color
  }

  drawStocks = () => {
    let stockNumber = 0
    let emptyStocks = []
    for (let stock in this.state.stocksData) {
      if (this.state.stocksData[stock].error) {
        emptyStocks.push(stock)
      } else {
        this.drawStock(stock, stockNumber)
        stockNumber++
      }
    }
    emptyStocks.length && this.drawError(emptyStocks.join(', '))
  }

  drawError = (emptyStocks) => {
    this.canvas.font = '14px Arial'
    this.canvas.fillText(`We couldn't get the data for: ${emptyStocks}`, 90, 665)
  }

  drawStock = (stockName, stockNumber) => {
    this.canvas.beginPath()
    this.canvas.moveTo(80, 550)
    this.setColor()
    this.drawStockChart(stockName, 80, 550)
    this.drawStockLegend(stockName, stockNumber, 90, 620)
  }

  drawStockChart = (stockName, startX, startY) => {
    this.state.stocksData[stockName].forEach((data, index) => {
      const timeIndex = index + 1
      const valueToScale = data.value * 4
      this.canvas.lineTo(startX + timeIndex * startX, startY - valueToScale)
      this.canvas.stroke()
      this.canvas.beginPath()
      this.canvas.arc(startX + timeIndex * startX, startY - valueToScale, 5, 0, 2 * Math.PI)
      this.canvas.fill()
      this.canvas.moveTo(startX + timeIndex * startX, startY - valueToScale)
    }) 
  }

  drawStockLegend = (stockName, stockNumber, startX, startY) => {
    this.canvas.beginPath()
    this.canvas.fillStyle = 'black'
    this.canvas.moveTo(startX + stockNumber * 120, startY)
    this.canvas.lineTo(startX + stockNumber * 120 + 30, startY)
    this.canvas.fillText(stockName, 90 + stockNumber * 120 + 40, startY)
    this.canvas.stroke()
  }

  setColor = () => {
    const color = this.getRandomColor()
    this.canvas.strokeStyle = color
    this.canvas.fillStyle = color
    this.canvas.lineWidth = 2
  }

  setContext = (canvas) => {
    this.canvas = canvas.getContext('2d')
  }

  getStocksData = async (stockNames) => {
    const stocksData = {}
    await Promise.all(
      stockNames.map(async (stockName) => {
        let stockData
        try {
          const stock = await fetch(`/stocks/${stockName}`)
          stockData = await stock.json()
          stocksData[stockName] = stockData
        } catch (error) {
          stocksData[stockName] = error
        }
      })
    )
    await this.setState({ stocksData })
  }

  render() {
    return (
      <div className='chart'>
        <canvas ref={this.setContext} id="chart" width="1100" height="700">
        </canvas>
      </div>
    )
  }
}

export default Chart
