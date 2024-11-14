// 글로벌 AbortController 저장 변수
let currentAbortController = null;

// 새로운 요청을 시작하는 함수
function startFetchRequest(url) {
    // 기존 요청이 있다면 중지
    if (currentAbortController) {
        currentAbortController.abort();
    }

    // 새로운 AbortController 생성
    currentAbortController = new AbortController();
    const signal = currentAbortController.signal;

    // fetch 요청 시작
    fetch(url, { signal })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetch successful:', data);
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Fetch error:', error);
            }
        });
}

// 사용 예시
startFetchRequest('https://api.example.com/data1');
startFetchRequest('https://api.example.com/data2'); // 이전 요청 중지됨