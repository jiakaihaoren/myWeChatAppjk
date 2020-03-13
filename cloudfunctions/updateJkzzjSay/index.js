const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection(event.dbName).where({
      "name": "say"
    })
      .update({
        data: {
          content: event.content
        },
      })
  } catch (e) {
    console.error(e)
  }
}