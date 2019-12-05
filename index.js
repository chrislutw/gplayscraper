import express from 'express'
import cors from 'cors'
import db from './lib/db'
import { getGooglePlayReviews, getGooglePlayReviewsAndSaveDb } from './lib/scraper'

const app = express()
app.use(cors())

app.get(`/scrape/:appId`, async (req, res, next) => {
  const _appId = req.params.appId
  console.log(`Scraping ${_appId}!!`)

  const resultObj = await getGooglePlayReviews(_appId)

  res.json(resultObj)
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
