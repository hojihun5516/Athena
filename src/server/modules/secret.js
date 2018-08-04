module.exports = (function() {
  return {
    naver: {
      client_id: "0CbPMQPvrIQ0CMaJN7Jh",
      secret_id: "VzEgyx0zb3",
      callback_url: "/auth/login/naver/callback"
    },
    facebook: {
      client_id: "640198686360827",
      secret_id: "8feca25cddda57c35978cd83d4e367c8",
      callback_url: "https://localhost/auth/login/facebook/callback"
    },
    kakao: {
      client_id: "6ec6d38c6a86ffda846835aef5360c9f",
      secret_id: "GRriAO2YljiUXdvU8JKZ30rHMNcx6o5a",
      callback_url: "http://localhost:8080/oauth/kakao/callback"
    }
  }
})();
