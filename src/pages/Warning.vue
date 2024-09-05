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
        <span>경보 종류</span>
        <span>종료 시각</span>
      </li>
      <li
        v-for="(group, index) in filteredGroupList"
        :key="index"
        class="group-item"
      >
        <span>{{ group.market }}</span>
        <span>{{ getChangeText(group.warning_type) }}</span>
        <span>{{ group.end_date+' 까지' }}</span>
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
      groupList: [], // API로부터 받은 데이터 저장
      searchTerm: "", // 사용자 입력 값을 저장할 데이터 속성
    };
  },

  computed: {
    // 검색어에 따라 필터링된 그룹 목록 반환
    filteredGroupList() {
      if (!this.searchTerm) {
        return this.groupList; // searchTerm이 비어 있으면 전체 리스트 반환
      }
      return this.groupList.filter((group) => {
        return (
          group.market.includes(this.searchTerm) ||
          group.warning_type.includes(this.searchTerm) ||
          group.end_date.includes(this.searchTerm)
        );
      });
    },
  },

  methods: {
    async fetchCoinList() {
      try {
        // API 요청 보내기
        const WarningResponse = await axios.get(
          `http://localhost:8081/api/Warning`
        );
        console.log("코인 정보 응답:", WarningResponse.data); // 응답 데이터 확인

        // 응답 데이터를 groupList에 저장
        this.groupList = WarningResponse.data;
      } catch (error) {
        console.error("코인 정보를 가져오는 중 오류 발생:", error);
      }
    },

    searchGroup(event) {
      // 입력값 업데이트
      this.searchTerm = event.target.value;
    },
    getChangeText(change) {
      switch (change) {
        case 'PRICE_SUDDEN_FLUCTUATION':
          return '가격 급등락';
        case 'TRADING_VOLUME_SUDDEN_FLUCTUATION':
          return '거래량 급등';
        case 'DEPOSIT_AMOUNT_SUDDEN_FLUCTUATION':
          return '입금량 급등';
        case 'PRICE_DIFFERENCE_HIGH':
          return '가격 차이';
        case 'SPECIFIC_ACCOUNT_HIGH_TRANSACTION':
          return '소수계좌 거래 집중';
        case 'EXCHANGE_TRADING_CONCENTRATION':
          return '거래소 거래 집중';
        default:
          return change; // 만약 예상하지 못한 값이 오면 원래 값을 반환
      }
    },
  },

  created() {
    // 컴포넌트가 생성될 때 API 호출
    this.fetchCoinList();
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
  width: 360px;
}

.group-list li {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  list-style-type: none;
}

.group-list span {
  display: block;
  width: 33%;
  text-align: center;
}

.group-list-header {
  font-weight: 700;
  border-bottom: 1px solid #bdbdbd;
}
</style>
