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
        </li>
        <li
          v-for="(group, index) in filteredGroupList"
          :key="index"
          class="group-item"
        >
          <span>{{ group.market }}</span>
          <span>{{ group.korean_name }}</span>
          <span>{{ group.english_name }}</span>
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
            group.korean_name.includes(this.searchTerm) ||
            group.english_name.includes(this.searchTerm)
          );
        });
      },
    },
  
    methods: {
      async fetchCoinList() {
        try {
          // API 요청 보내기
          const coinListResponse = await axios.get(
            `http://localhost:8081/api/coinlist/check`
          );
          console.log("코인 정보 응답:", coinListResponse.data); // 응답 데이터 확인
  
          // 응답 데이터를 groupList에 저장
          this.groupList = coinListResponse.data;
        } catch (error) {
          console.error("코인 정보를 가져오는 중 오류 발생:", error);
        }
      },
  
      searchGroup(event) {
        // 입력값 업데이트
        this.searchTerm = event.target.value;
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
    height: 32px;
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
  