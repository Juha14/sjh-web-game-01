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
