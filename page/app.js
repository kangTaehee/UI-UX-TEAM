document.addEventListener('DOMContentLoaded', function () {
    const doctitle = document.title
    let currentPage = 1;
    // 데이터 가져오기
    async function fetchData(page = 1) {
        console.log(`데이터 가져오기 : ` + page)
        try {
            // const response = await fetch(`https://api.example.com/listapi?page=${page}&limit=10`); // listapi의 URL로 변경
            // const data = await response.json();
            data = {
                "items": [
                    { "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false },
                    { "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false },
                    { "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false },
                    { "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false },
                    { "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false },
                ],
                "totalPages": 49
            }
            // 최대 페이지 값을 업데이트
            totalPages = data.totalPages;
            // 테이블 생성 및 데이터 출력
            renderTable(data.items); // data.items는 API의 리스트 데이터로 변경
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    }
    // 페이지 변경 시 호출
    function changePage(page) {
        document.title = page + doctitle
        currentPage = page;
        history.pushState({ page: currentPage }, '', `?page=${currentPage}`);
        console.log(`page : ${currentPage}`)
        fetchData(currentPage);
    }
    var $pagination = $('#pagination-demo');
    var defaultOpts = {
        totalPages: 50,
        startPage: 1,
        visiblePages: 10,
        initiateStartPageClick:false,
        onPageClick: function (event, page) {
            changePage(page);
            console.log(page)
        }
    };
    // pagination 설정
    function setupPagination(data) {
        console.log("🚀 ~ setupPagination ~ data:", data)
        $pagination.twbsPagination('destroy');
        $pagination.twbsPagination($.extend({}, defaultOpts, {
            startPage: data
        }));
    }
    // 히스토리 변경 시 처리
    window.addEventListener('popstate', function (event) {
        console.log("🚀 ~ popstate:", event)
        console.log(event.state)
        if (event.state && event.state.page) {
            currentPage = event.state.page;
            fetchData(currentPage);
            console.log("🚀 ~ currentPage:", currentPage)
            setupPagination(currentPage); // 페이지를 뒤로 가기로 변경 시 페이징 UI도 동기화
        }
    });
    // 초기 데이터 및 페이지 로드
    function initialize() {
        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get('page')) || 1;
        currentPage = page;
        fetchData(currentPage).then(() => {
            console.log("🚀 ~ initialize ~ currentPage:", currentPage)
            setupPagination(currentPage);
        });
    }
    initialize();
});
