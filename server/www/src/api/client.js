import fetch from '@/utils/fetch';

export function sendMsg(channel, text) {
  return fetch({
    url: '/messsge/send',
    method: 'post',
    data: {
      channel: channel,
      message: text
    }
  });
}
