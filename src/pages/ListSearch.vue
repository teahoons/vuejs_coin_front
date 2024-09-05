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

<style>
* {
  padding: 0;
  margin: 0;
}
.search-input {
  display: block;
  padding: 4px 8px;
  margin: 10px auto;
  width: 320px;
  font-size: 16px;
  outline: none;
}

.group-list {
  margin: 0 auto;
  width: 100%;
}

.group-list li {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  list-style-type: none;
}

.group-list span {
  display: block;
  width: 20%;
  text-align: center;
}

.group-list-header {
  font-weight: 700;
  border-bottom: 1px solid #bdbdbd;
}
.clickable {
  color: blue; /* 링크 색상 */
  text-decoration: underline; /* 밑줄 추가 */
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
}

.clickable:hover {
  color: purple; /* 마우스를 올렸을 때 색상 변경 */
}
</style>
