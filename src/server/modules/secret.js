module.exports = {
  'secret' :  '',
  'db_info': {
    local: { // localhost
    },
    real: { // real
    },
    dev: { // dev
    }
  },
  'federation' : {
    'naver' : {
      'client_id' : '0CbPMQPvrIQ0CMaJN7Jh',
      'secret_id' : '9Qpf4LoTxb',
      'callback_url' : '/auth/login/naver/callback'
    },
    'facebook' : {
      'client_id' : '640198686360827',
      'secret_id' : '8c10f0d1d92049a20d9e294163f56038',
      'callback_url' : '/auth/login/facebook/callback'
    },
    'kakao' : {
      'client_id' : '836c89b8e516affc7eed3300b54bb438',
      'clientSecret' : 'N3m98beL3tQFt7vlcUp9A4gydkuOFWIC'
      'callback_url' : 'http://localhost:3000/oauth/kakao/callback'
    }
  }
};
