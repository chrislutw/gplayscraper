import express from 'express'
import cors from 'cors'
import db from './lib/db'
import { getGooglePlayReviews } from './lib/scraper'

const app = express()
app.use(cors())

app.get(`/scrape/:appId`, async (req, res, next) => {
  const _appId = req.params.appId
  console.log(`Scraping ${_appId}!!`)
  const resObj = { RETURN_CODE: 0, RETURN_MESSAGE: '成功' }

  let { RESULT, errorObj } = await getGooglePlayReviews(_appId)
  resObj.RESULT = RESULT
  if (errorObj) {
    resObj.RETURN_CODE = errorObj.errorCode
    resObj.RETURN_MESSAGE = errorObj.errorMessage
  }

  res.json(resObj)
})

app.get(`/data/:appId`, async (req, res, next) => {
  const _appId = req.params.appId
  // get the scrape data
  const appIdData = db.get(_appId)
  console.log(appIdData)
  // respond with json
  res.json(appIdData)
})

app.listen(3000, () => {
  console.log(`Example App running on port http://localhost:3000`)
})
