import { pandora } from 'constants.js'
import axios from 'axios'

const { api, appId, botName, userKey } = pandora

export default {
  talk: ({ input = '', sessionId = '' }) => {
    let url = `${api}/talk/${appId}/${botName}?input=${input}&user_key=${userKey}`

    if (sessionId) url += `&sessionid=${sessionId}`

    return axios.post(url)
  }
}
