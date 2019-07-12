import firebase from 'firebase'
import { SHORTTED_LENGTH, FIREBASE_CONFIG } from './config'

firebase.initializeApp(FIREBASE_CONFIG)
const db = firebase.database()

const makeId = (length) => {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const getSingleObject = (obj) => {
  for (let i in obj) {
    if (obj[i].short_url.toString() === i.toString()) {
      return obj[i]
    }
  }

  return null
}

export const addShrink = async (target) => {
  let findResult = await findByTarget(encodeURIComponent(target))
  let data = getSingleObject(findResult)

  if (data !== null) return data

  let id = makeId(SHORTTED_LENGTH)
  let snap

  while (true) {
    snap = await getRecord(id)

    if (snap === null) { break }

    id = makeId(SHORTTED_LENGTH)
  }

  data = {
    target: encodeURIComponent(target),
    short_url: id,
    create_at: Date.now()
  }

  await db.ref('url_container/' + id)
    .set(data)

  return data
}

export const getRecord = (id) => {
  return db.ref('url_container/' + id).once('value')
    .then(snap => snap.val())
}

export const findByTarget = (target) => {
  // eslint-disable-next-line promise/param-names
  return new Promise(r => {
    db.ref('url_container').orderByChild('target').equalTo(target).on('value', snap => {
      r(snap.val())
    })
  })
}
