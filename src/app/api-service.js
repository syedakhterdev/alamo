class AppService {
  constructor($http) {
    this.$http = $http;
  }
  getData() {
    return this.$http.get(
      "https://drafthouse.com/s/mother/v1/page/market/main/austin"
    );
  }
}

export default AppService;
