// --- 1. AWS Cognito 설정 정보 (본인 것으로 교체 필수!) ---
const cognitoDomain = "https://ap-northeast-1pkfzjxihj.auth.ap-northeast-1.amazoncognito.com/"; // 설정한 도메인 (https:// 포함, 마지막 슬래시 제외)
const clientId = "2thh3n0kiaakr7ulfk0pqapu6o"; 
const redirectUri = window.location.origin + "/"; // 현재 접속한 주소 (App Runner 도메인)

// --- 2. 로그인/로그아웃 버튼 로직 ---
const loginBtn = document.getElementById('btn-login');
const logoutBtn = document.getElementById('btn-logout');
const loginArea = document.getElementById('login-area');
const userArea = document.getElementById('user-area');
const userEmailSpan = document.getElementById('user-email');

// 로그인 버튼 클릭 시 AWS 로그인 페이지로 이동
loginBtn.addEventListener('click', () => {
    const loginUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=token&scope=email+openid&redirect_uri=${redirectUri}`;
    window.location.href = loginUrl;
});

// 로그아웃 버튼
logoutBtn.addEventListener('click', () => {
    // 토큰 삭제 및 초기화
    window.location.href = redirectUri.split('#')[0]; // URL의 토큰 제거
});

// --- 3. 페이지 로드 시 로그인 여부 확인 ---
function checkLogin() {
    // URL에 #id_token=... 이 있는지 확인 (로그인 성공 후 돌아왔을 때)
    const hash = window.location.hash;
    if (hash.includes('id_token')) {
        // 토큰이 있으면 로그인 상태로 간주 (간단한 구현)
        // 실제로는 토큰을 디코딩해서 이메일을 가져와야 함 (JWT 파싱)
        
        loginArea.style.display = 'none';
        userArea.style.display = 'block';
        userEmailSpan.innerText = "플레이어"; // JWT 디코딩 로직 추가 시 이메일 표시 가능
        
        // URL을 깨끗하게 정리
        window.history.replaceState({}, document.title, ".");
    }
}

// 게임 시작 전 로그인 체크 실행
checkLogin();

// --- 기존 게임 로직 ---
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const gameArea = document.getElementById('game-area');

let score = 0;

// 랜덤한 위치를 계산하는 함수
function moveTarget() {
    // 게임 영역의 크기 (400x400)
    const areaSize = 400;
    // 공의 크기 (40)
    const targetSize = 40;
    
    // 이동 가능한 최대 좌표 (영역 밖으로 나가지 않게)
    const maxPos = areaSize - targetSize;

    // 랜덤 좌표 생성
    const randomX = Math.floor(Math.random() * maxPos);
    const randomY = Math.floor(Math.random() * maxPos);

    // 공 이동
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
    target.style.transform = 'none'; // 초기 중앙 정렬 해제
}

// 클릭 이벤트 리스너
target.addEventListener('click', () => {
    score++;
    scoreDisplay.innerText = score;
    moveTarget();
});
