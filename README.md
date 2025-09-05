# My Portfolio World 🎮

<img width="1914" height="1023" alt="image" src="https://github.com/user-attachments/assets/1d2c17f1-7488-4491-9631-1b9b47487273" />

**한재상의 인터랙티브 포트폴리오 웹사이트**



## 🌟 주요 특징

- **인터랙티브 2D**: Canvas 기반 게임 엔진으로 구현된 포트폴리오 게임
- **하이브리드 구조**: 게임과 노션 페이지가 하나의 화면에서 동시 작동
- **커스텀 게임 엔진**: JavaScript로 직접 구현한 경량 2D 게임 엔진
- **반응형 디자인**: 데스크톱(좌우 분할)과 모바일(상하 분할) 환경 모두 지원

## 🚀 라이브 데모

[**▶️ 포트폴리오 체험하기**](https://sensol2.github.io/My_Portfolio_World/)

## 🎯 주요 기능

### 게임 엔진 기능
- **카메라 시스템**: 플레이어 추적, 줌 인/아웃, 부드러운 카메라 이동
- **입력 관리**: 키보드(WASD, 방향키), 마우스, 터치 입력 지원
- **충돌 감지**: 게임 오브젝트 간 충돌 처리
- **애니메이션**: 스프라이트 애니메이션 시스템
- **씬 관리**: 다중 씬 전환 및 관리

### 플레이어 상호작용
- **마우스/터치 이동**: 마우스를 누르고 있으면 해당 방향으로 이동
- **키보드 이동**: WASD 또는 방향키로 자유로운 이동
- **줌 기능**: 마우스 휠로 확대/축소

## 🏗️ 프로젝트 구조

```
Javascript_WebGame/
├── index.html              # 메인 HTML 파일
├── index.js                # 앱 진입점
├── README.md               # 프로젝트 문서
├── Assets/                 # 게임 에셋들
│   ├── Animated_Object/    # 애니메이션 오브젝트
│   ├── Animated_UI/        # UI 애니메이션
│   ├── Characters/         # 캐릭터 스프라이트
│   ├── Map/                # 맵 타일셋
│   └── Tiles/              # 기본 타일들
├── Data/                   # 게임 데이터
│   ├── collisionTileData.js # 충돌 타일 데이터
│   ├── eventData.json      # 이벤트 데이터
│   └── util.js             # 데이터 유틸리티
├── Tiled/                  # Tiled 맵 에디터 파일들
└── game/                   # 게임 엔진 코드
    ├── components/         # 게임 컴포넌트들
    │   ├── Animation.js    # 애니메이션 컴포넌트
    │   ├── Animator.js     # 애니메이터 시스템
    │   ├── Collider.js     # 충돌 감지 컴포넌트
    │   ├── GameObject.js   # 게임 오브젝트 기본 클래스
    │   ├── SpriteRenderer.js # 스프라이트 렌더링
    │   ├── Text.js         # 텍스트 렌더링
    │   ├── Tile.js         # 타일 시스템
    │   └── Transform.js    # 위치/회전/크기 변환
    ├── core/               # 핵심 시스템들
    │   ├── Camera.js       # 카메라 시스템
    │   ├── CollisionManager.js # 충돌 관리
    │   ├── GameManager.js  # 게임 매니저
    │   ├── InputManager.js # 입력 처리
    │   ├── MonoBehaviour.js # 컴포넌트 기본 클래스
    │   ├── Scene.js        # 씬 클래스
    │   └── SceneManager.js # 씬 관리
    ├── objects/            # 게임 오브젝트들
    │   ├── Arrow.js        # 화살표 오브젝트
    │   └── Player.js       # 플레이어 캐릭터
    ├── scenes/             # 게임 씬들
    │   └── Scene1.js       # 메인 씬
    └── utils/              # 유틸리티 함수들
        └── elt.js          # DOM 요소 생성 유틸
```

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Canvas API**: 2D 그래픽 렌더링
- **Module System**: ES6 모듈 시스템
- **Design**: 반응형 웹 디자인, Flexbox
- **Font**: Pretendard 폰트
- **Map Editor**: Tiled Map Editor
- **Deployment**: GitHub Pages

## 🎮 게임 엔진 아키텍처

### 컴포넌트 시스템
- **GameObject**: 모든 게임 오브젝트의 기본 클래스
- **Transform**: 위치, 회전, 크기 정보
- **SpriteRenderer**: 이미지 렌더링
- **Collider**: 충돌 감지 영역
- **Animator**: 애니메이션 제어
- **Text**: 텍스트 렌더링
- **Tile**: 타일맵 시스템

### 핵심 시스템
- **GameManager**: 게임 루프 및 전체 게임 상태 관리
- **Camera**: 뷰포트 및 카메라 제어 (타겟 추적, 줌)
- **InputManager**: 사용자 입력 처리 (싱글톤 패턴)
- **SceneManager**: 씬 전환 및 관리
- **CollisionManager**: 충돌 감지 및 처리

### 디자인 패턴
- **싱글톤 패턴**: InputManager, GameManager
- **컴포넌트 패턴**: GameObject 기반 컴포넌트 시스템
- **상태 패턴**: Player 상태 관리 (FSM)
- **옵저버 패턴**: 이벤트 기반 입력 처리

## 🚀 실행 방법

### 로컬 개발 환경
```bash
# 리포지터리 클론
git clone https://github.com/sensol2/My_Portfolio_World.git

# 디렉터리 이동
cd My_Portfolio_World

# 로컬 서버 실행 (Live Server 등 사용)
# 또는 Python 서버
python -m http.server 8000
```

### 브라우저에서 접속
```
http://localhost:8000
```

## 🎯 게임 조작법

### 키보드
- **W, A, S, D**: 플레이어 이동
- **방향키**: 플레이어 이동

### 마우스/터치
- **마우스 클릭 & 드래그**: 플레이어가 마우스 방향으로 이동
- **마우스 휠**: 줌 인/아웃
- **터치 드래그**: 모바일에서 플레이어 이동

## 📱 반응형 지원

### 데스크톱 (769px 이상)
- **좌우 분할**: 게임(50%) + 노션 포트폴리오(50%)
- **마우스 최적화**: 정밀한 마우스 제어

### 모바일 (768px 이하)
- **상하 분할**: 게임(상단 50%) + 노션 포트폴리오(하단 50%)
- **터치 최적화**: 터치 드래그로 플레이어 이동
- **드래그 방지**: 게임 영역에서 브라우저 기본 드래그 차단

## 🔧 주요 기술적 특징

### 크로스 플랫폼 지원
- **터치 이벤트**: 모바일 터치 입력 처리
- **브라우저 호환성**: 모던 브라우저 지원
- **반응형 디자인**: 다양한 화면 크기 대응
- **이미지 스무딩 비활성화**: 픽셀 아트 스타일 유지

### 카메라 시스템
- **부드러운 추적**: Lerp 보간을 통한 자연스러운 카메라 이동
- **줌 기능**: 마우스 휠을 통한 확대/축소
- **좌표 변환**: 클라이언트 → 스크린 → 월드 좌표 변환

### 입력 시스템
- **멀티 입력**: 키보드, 마우스, 터치 동시 지원
- **콜백 기반**: 이벤트 기반 입력 처리 시스템
- **벡터 기반 이동**: 마우스 방향으로의 정규화된 이동

## 🎨 아트 에셋

- **캐릭터**: 픽셀 아트 스타일의 캐릭터 스프라이트
- **애니메이션**: 걷기, 대기 상태 애니메이션
- **타일셋**: Tiled 맵 에디터로 제작된 맵
- **UI 요소**: 게임 내 인터페이스 요소들

## 📄 라이센스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.

## 👨‍💻 개발자

**한재상 (Han Jaesang)**
- GitHub: [@sensol2](https://github.com/sensol2)
- Portfolio: [My Portfolio World](https://sensol2.github.io/My_Portfolio_World/)

---

⭐ 이 프로젝트가 마음에 드셨다면 스타를 눌러주세요!
