import gplay from 'google-play-scraper'
import db from './db'
import * as R from 'ramda'

function init() {
  gplay.memoized()
}

function getGooglePlayReviews(_appId) {
  gplay
    .memoized()
    .reviews({
      appId: _appId,
      num: 200,
      lang: 'zh-TW',
      sort: gplay.sort.NEWEST
    })
    .then(showReviews, errorHandle)
}

function showReviews(reviews) {
  const insertToDbFormat = reviews.map(data => ({
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
  const dateColl = R.groupBy(groupByDate, reviews)
  for (let [key, reviews] of Object.entries(dateColl)) {
    dateColl[key] = baseMerge(R.reduceBy(reduceByCountFn, 0, groupByScore, reviews))
  }
  console.log(dateColl)
  db.set('rateAgreegation', dateColl).write()
  db.set('reviews', insertToDbFormat).write()
  console.log('save to db.sjon done.')
}
function errorHandle(e) {
  console.log(e)
}
init()
getGooglePlayReviews('com.igs.mjstar31')
