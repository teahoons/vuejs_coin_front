<template>
  <div class="coin-search">
    <h1>Coin Search</h1>
    <input v-model="coinName" placeholder="한글 코인 이름을 입력하세요" @keyup.enter="searchCoin" />
    <button @click="searchCoin">검색</button>

    <div v-if="coinInfo">
      <h2>{{ coinName }} ({{ coinInfo.market }})</h2>
      <p>시가: {{ coinInfo.opening_price.toLocaleString()+"원" }}</p>
      <p>고가: {{ coinInfo.high_price.toLocaleString()+"원" }}</p>
      <p>저가: {{ coinInfo.low_price.toLocaleString()+"원" }}</p>
      <p>종가(현재가): {{ coinInfo.trade_price.toLocaleString()+"원" }}</p>
      <p>변화: {{ getChangeText(coinInfo.change) }}</p>
      <p>변화액: {{ coinInfo.signed_change_price.toLocaleString()+"원" }}</p>
      <p>변화율: {{ (coinInfo.signed_change_rate*100)+"%" }}</p>
      <p>최근 거래량: {{ coinInfo.trade_volume.toLocaleString() }}</p>
      <p>24시간 누적 거래량: {{ coinInfo.acc_trade_volume_24h.toLocaleString() }}</p>
      <p>52주 신고가: {{ coinInfo.highest_52_week_price.toLocaleString()+"원" }}</p>
      <p>52주 신저가: {{ coinInfo.lowest_52_week_price.toLocaleString()+"원" }}</p>
    </div>

    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      coinName: '',
      coinInfo: null,
      error: null,
    };
  },
  methods: {
    async searchCoin() {
      try {
        console.log(`Fetching coin info for: ${this.coinName}`);
        // 한글 코인 이름으로 바로 API 요청
        const coinInfoResponse = await axios.get(`http://localhost:8081/api/coin/market/${this.coinName}`);
        console.log('Coin info response:', coinInfoResponse.data); // 응답 데이터 출력

        if (coinInfoResponse.data) {
          // 첫 번째 요소만 사용
          this.coinInfo = coinInfoResponse.data[0];
          this.error = null; // 에러 메시지 초기화
        } else {
          this.error = '해당 이름의 코인이 존재하지 않습니다.';
          this.coinInfo = null;
        }
      } catch (error) {
        console.error("Error fetching coin information:", error);
        if (error.response && error.response.status === 404) {
          this.error = '해당 이름의 코인이 존재하지 않습니다.';
        } else {
          this.error = '코인 정보를 가져오는 중 오류가 발생했습니다.';
        }
        this.coinInfo = null;
      }
    },
    getChangeText(change) {
      switch (change) {
        case 'EVEN':
          return '보합';
        case 'RISE':
          return '상승';
        case 'FALL':
          return '하락';
        default:
          return change; // 만약 예상하지 못한 값이 오면 원래 값을 반환
      }
    }
  }
};
</script>

<style scoped>
.coin-search {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

input {
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  width: 80%;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

h2 {
  margin-top: 20px;
}
</style>
