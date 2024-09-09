<template>
  <div>
    <input
      class="search-input"
      type="text"
      placeholder="입력하세요"
      @input="searchGroup"
    />

    <ul class="group-list" v-if="filteredGroupList.length > 0">
      <li class="group-list-header">
        <span>마켓</span>
        <span>한글 이름</span>
        <span>영어 이름</span>
        <span>경보 종류</span>
        <span>종료 시각</span>
      </li>
      <li
        v-for="(group, index) in filteredGroupList"
        :key="index"
        class="group-item"
      >
        <span>{{ group.market }}</span>
        <span @click="goToCoinSearch(group.korean_name)" class="clickable">
          {{ group.korean_name }}
        </span>
        <span>{{ group.english_name }}</span>
        <!-- 경보 종류가 있는 경우에만 표시 -->
        <span v-if="group.warning_type">{{ getChangeText(group.warning_type) }}</span>
        <!-- 경보 종류가 없으면 빈 공간 -->
        <span v-else>-</span>
        
        <!-- 종료 시각이 있는 경우에만 표시 -->
        <span v-if="group.end_date">{{ group.end_date + ' 까지' }}</span>
        <!-- 종료 시각이 없으면 빈 공간 -->
        <span v-else>-</span>
      </li>
    </ul>

    <!-- 검색 결과가 없을 때 표시 -->
    <div v-else>
      검색 결과가 없습니다.
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      coinList: [], // 코인 정보 리스트
      warningList: [], // 경보 정보 리스트
      combinedList: [], // 결합된 데이터
      searchTerm: "", // 사용자 입력 값을 저장할 데이터 속성
    };
  },

  computed: {
    // 검색어에 따라 필터링된 그룹 목록 반환
    filteredGroupList() {
      if (!this.searchTerm) {
        return this.combinedList; // searchTerm이 비어 있으면 전체 리스트 반환
      }
      return this.combinedList.filter((group) => {
        return (
          group.market.includes(this.searchTerm) ||
          group.korean_name.includes(this.searchTerm) ||
          group.english_name.includes(this.searchTerm)
        );
      });
    },
  },

  methods: {
    async fetchCoinAndWarningList() {
      try {
        // 코인 목록과 경보 목록을 각각 API 요청
        const coinListResponse = await axios.get(
          `http://localhost:8081/api/coinlist/check`
        );
        const warningListResponse = await axios.get(
          `http://localhost:8081/api/Warning`
        );

        this.coinList = coinListResponse.data;
        this.warningList = warningListResponse.data;

        // 코인 목록과 경보 목록 병합
        this.combinedList = this.coinList.map((coin) => {
          // 코인과 같은 마켓의 경보 정보를 찾음
          const warning = this.warningList.find(
            (warn) => warn.market === coin.market
          );
          return {
            ...coin,
            warning_type: warning ? warning.warning_type : null,
            end_date: warning ? warning.end_date : null,
          };
        });
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    },

    searchGroup(event) {
      // 입력값 업데이트
      this.searchTerm = event.target.value;
    },    
    goToCoinSearch(koreanName) {
      // 클릭한 한글 이름으로 /coinsearch?coin=한글이름 경로로 이동
      this.$router.push({ path: "/coinsearch", query: { coin: koreanName } });
    },

    getChangeText(change) {
      switch (change) {
        case "PRICE_SUDDEN_FLUCTUATION":
          return "가격 급등락";
        case "TRADING_VOLUME_SUDDEN_FLUCTUATION":
          return "거래량 급등";
        case "DEPOSIT_AMOUNT_SUDDEN_FLUCTUATION":
          return "입금량 급등";
        case "PRICE_DIFFERENCE_HIGH":
          return "가격 차이";
        case "SPECIFIC_ACCOUNT_HIGH_TRANSACTION":
          return "소수계좌 거래 집중";
        case "EXCHANGE_TRADING_CONCENTRATION":
          return "거래소 거래 집중";
        default:
          return change; // 예상하지 못한 값이 오면 그대로 반환
      }
    },
  },
  

  created() {
    // 컴포넌트가 생성될 때 코인 목록과 경보 목록 가져오기
    this.fetchCoinAndWarningList();
  },
};
</script>

<style scoped>
/* 컨테이너 스타일 */
div {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

/* 입력 필드 스타일 */
.search-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #007bff;
}

/* 리스트 헤더 스타일 */
.group-list-header {
  display: grid;
  grid-template-columns: 2fr 3fr 3fr 3fr 3fr; /* 비율을 조정 */
  padding: 10px 0;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  text-align: left;
}

/* 리스트 아이템 스타일 */
.group-item {
  display: grid;
  grid-template-columns: 2fr 3fr 3fr 3fr 3fr; /* 동일한 비율로 설정 */
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
  font-size: 1rem;
}

.group-item:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

/* 클릭 가능한 항목 스타일 */
.clickable {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}

.clickable:hover {
  color: #0056b3;
}

/* 검색 결과가 없을 때의 메시지 스타일 */
div > div {
  color: #d9534f;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
}
</style>
