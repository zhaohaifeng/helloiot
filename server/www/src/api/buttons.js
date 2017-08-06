import fetch from '@/utils/fetch';

export function getButtonList() {
  return fetch({
    url: '/btn/list',
    method: 'get'
  });
}

export function triggerBuzzer() {
  return fetch({
    url: '/btn/triggerBuzzer',
    method: 'get'
  });
}
