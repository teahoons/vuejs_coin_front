<template>
    <v-container class="home-container">
      <v-row>
        <v-col cols="12" class="text-center">
          <h1 class="display-2 font-weight-bold">코인 대시보드에 오신 것을 환영합니다</h1>
          <p class="subtitle-1">암호화폐 데이터를 탐색하고, 코인을 검색하며, 주의 종목을 모니터링하세요.</p>
        </v-col>
      </v-row>
      
      <!-- 기능 카드 -->
      <v-row>
        <v-col cols="12" md="4">
          <v-card @click="goToPage('coinsearch')" class="hoverable">
            <v-card-title primary-title>
              <div>
                <h3 class="headline">코인 검색</h3>
                <p>특정 암호화폐에 대한 자세한 정보를 확인하세요.</p>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn color="primary" text>검색하기</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="4">
          <v-card @click="goToPage('listsearch')" class="hoverable">
            <v-card-title primary-title>
              <div>
                <h3 class="headline">리스트 검색</h3>
                <p>암호화폐 리스트를 검색하고 탐색하세요.</p>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn color="primary" text>리스트 보기</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="4">
          <v-card @click="goToPage('warning')" class="hoverable">
            <v-card-title primary-title>
              <div>
                <h3 class="headline">경보</h3>
                <p>시장의 급격한 변동에 대한 경보를 확인하세요.</p>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn color="primary" text>경보 확인</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- 추가 섹션: 최근 시장 업데이트
      <v-row class="mt-5">
        <v-col cols="12">
          <v-alert type="info" class="text-center">
            실시간 시장 업데이트가 곧 여기에 표시됩니다. 기다려 주세요!
          </v-alert>
        </v-col>
      </v-row> -->
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'Home',
    methods: {
      goToPage(page) {
        this.$router.push({ path: `/${page}` });
      },
    },
  };
  </script>
  
  <style scoped>
  .home-container {
    padding: 40px;
    background-color: #f9f9f9;
    min-height: 100vh;
  }
  
  h1 {
    color: #3b3b3b;
  }
  
  .v-card {
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  
  .v-card:hover {
    transform: scale(1.05);
  }
  
  .text-center {
    text-align: center;
  }
  
  p {
    color: #555;
  }
  
  .v-btn {
    text-transform: uppercase;
  }
  </style>
  