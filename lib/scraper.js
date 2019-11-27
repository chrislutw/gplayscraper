import gplay from 'google-play-scraper'
import db from './db'
import * as R from 'ramda'

gplay.memoized()

export async function getGooglePlayReviews(_appId) {
  let result
  try {
    result = await gplay.reviews({
      appId: _appId,
      num: 200,
      lang: 'zh-TW',
      sort: gplay.sort.NEWEST
    })
  } catch (error) {
    errorHandle(error, _appId)
  }
  return mapReviews(result)
}

export async function getGooglePlayReviewsAndSaveDb(_appId) {
  const result = await gplay.reviews({
    appId: _appId,
    num: 200,
    lang: 'zh-TW',
    sort: gplay.sort.NEWEST
  })
  const mapedObj = mapReviews(result)
  db.set(_appId, mapedObj).write()
  return mapedObj
}

function mapReviews(_reviews) {
  const mapedReviews = _reviews.map(data => ({
    id: data.id,
    userName: data.userName,
    date: data.date,
    title: data.title,
    text: data.text,
    score: data.score,
    version: data.version,
    url: data.url,
    replyText: data.replyText,
    replyDate: data.replyDate
  }))
  const reduceByCountFn = (acc, obj) => (acc += 1)
  const groupByScore = data => data.scoreText
  const groupByDate = data => new Date(data.date).toLocaleDateString()
  const baseMerge = R.merge({ '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 })

  const rateAggregation = R.groupBy(groupByDate, _reviews)

  for (let [key, entryReviews] of Object.entries(rateAggregation)) {
    rateAggregation[key] = baseMerge(R.reduceBy(reduceByCountFn, 0, groupByScore, entryReviews))
  }
  const returnObj = { reviews: mapedReviews, rateAggregation }
  return returnObj
}

function errorHandle(e, _appId) {
  console.log('取得 ' + _appId + ' 有錯誤', e)
}
