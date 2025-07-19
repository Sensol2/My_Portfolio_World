const iframe = document.querySelector('iframe');
class TileEvents {
	constructor() {
        // var testFrame = this.framePreload("https://denim-euphonium-b60.notion.site/ebd/2310be5efd6180e5a6d7ce4f8162c97a");


        this.player = null;
		this.eventDataDict = {
			"11": () => {
                if (this.player) {
                    this.player.transform.setTransform(-80, 500);
                }
			},

            // 42, 43 : 박물관 -> 지하실
			"40": () => {
                if (this.player) {
                    this.player.transform.setTransform(-80, 510);
                }
			},
			"41": () => {
                if (this.player) {
                    this.player.transform.setTransform(-80, 510);
                }
			},
            // 50, 51 : 지하실 -> 박물관
            "48": () => {
                if (this.player) {
                    this.player.transform.setTransform(-80, 130);
                }
			},
			"49": () => {
                if (this.player) {
                    this.player.transform.setTransform(-80, 130);
                }
			},

            // 공군창업경진대회
            "3": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1860be5efd6180e69a86e7916b693478"); },
            "4": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1860be5efd6180e69a86e7916b693478"); },

            // 도전K-스타트업
            "5": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1860be5efd61801aa951c1f94898e695"); },
            "6": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1860be5efd61801aa951c1f94898e695"); },

            // 국방 스타트업 챌린지
            "7": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1860be5efd618030be94ced358c2658a"); },
            "8": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1860be5efd618030be94ced358c2658a"); },

            // IF 해커톤
            "12": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd6180ac9b8fcdcd2a007121"); },
            "13": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd6180ac9b8fcdcd2a007121"); },

            // 창공
            "14": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd6180f49fa8fb3b8b68c80c"); },
            "15": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd6180f49fa8fb3b8b68c80c"); },

            // OTHON
            "16": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd618060aebdc4c7a04ce403"); },
            "17": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd618060aebdc4c7a04ce403"); },

            // ASK 2022
            "18": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd618029b2c4f4e4462a07bf"); },
            "19": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd618029b2c4f4e4462a07bf"); },

            // 정보처리기능사
            "20": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd6180e5a6d7ce4f8162c97a"); },
            "21": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd6180e5a6d7ce4f8162c97a"); },

            // 정보처리기사
            "22": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd618052839cea428c50ec3d"); },
            "23": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd618052839cea428c50ec3d"); },

            // 정보기술자격
            "24": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd61808286e0c38e7eb31275"); },
            "25": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd61808286e0c38e7eb31275"); },

            // Adobe Certified Associate (ACA)
            "26": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd618063a6add58590382672"); },
            "27": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/2310be5efd618063a6add58590382672"); },

            // 코이
            "28": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/7b33ef4d7f5b4c59af90740998d2c5da"); },
            "29": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/7b33ef4d7f5b4c59af90740998d2c5da"); },
            "30": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/7b33ef4d7f5b4c59af90740998d2c5da"); },

            // 네덜란드 게임잼
            "31": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/268f0f540a034c49aaa2e0ce16d1d2f5"); },
            "32": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/268f0f540a034c49aaa2e0ce16d1d2f5"); },
            "33": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/268f0f540a034c49aaa2e0ce16d1d2f5"); },

            // 하이톤
            "34": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/b6d9269fde474ddda67c5005aae6e3ec"); },
            "35": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/b6d9269fde474ddda67c5005aae6e3ec"); },
            "36": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/b6d9269fde474ddda67c5005aae6e3ec"); },

            // 스토브 온라인 게임잼
            "37": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1211d50f40a744cbb8495d82b857f2a4"); },
            "38": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1211d50f40a744cbb8495d82b857f2a4"); },
            "39": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1211d50f40a744cbb8495d82b857f2a4"); },

            // 겜마루
            "42": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/5888dc99932d44ec8f9fb2cf04559cbe"); },
            "43": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/5888dc99932d44ec8f9fb2cf04559cbe"); },
            "44": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/5888dc99932d44ec8f9fb2cf04559cbe"); },

            // 스마게 인디게임 장학팀
            "45": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1860be5efd61802daf4ec0afe9eb97e2"); },
            "46": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1860be5efd61802daf4ec0afe9eb97e2"); },
            "47": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1860be5efd61802daf4ec0afe9eb97e2"); },

            // Version UP
            "50": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/902731fb399444f5ae4046b6a5747507"); },

            // 콜라비트
            "51": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/b591e8ab51de4c94839e07ec9914504f"); },

            // Merge Neko
            "52": () => { this.updateIframe("https://denim-euphonium-b60.notion.site/ebd/1860be5efd61802b8328d8ba65792216"); }

		};

	}

    // framePreload = function (url) {
    //     var container = document.createElement("div");

    //     container.style.overflow = "hidden";
    //     container.style.position = "fixed";
    //     container.style.pointerEvents = "none";
    //     container.style.opacity = 0;
    //     container.style.zIndex = -1;
    //     container.style.willChange = "transform";

    //     document.body.appendChild(container);

    //     const frame = document.createElement("iframe");
    //     frame.src = url;
    //     frame.width = "100%";
    //     frame.height = "575";
    //     frame.frameBorder = "0";
    //     frame.allowFullscreen = true;
    //     // frame.style.display = "none";  // 백그라운드 로딩용

    //     //document.body.appendChild(frame); // 화면 밖에서 미리 로드
    //     //this.preloadedFrames[url] = frame;
    //     return frame;
    // };

    // replaceFrame(frame) {
    //     const iframe = document.querySelector("iframe");
    //     iframe.parentNode.replaceChild(frame, iframe);
    // }

    updateIframe(src) {
        const iframe = document.querySelector("iframe");

        // 이미 동일한 링크면 생략
        if (iframe.dataset.currentSrc === src) return;
        iframe.dataset.currentSrc = src;

        // src 즉시 변경 → 로딩 시작
        iframe.src = src;

        // fade-out 시작
        iframe.classList.add("fade-out");

        // iframe 로드 완료 시 실행할 함수 설정
        iframe.onload = () => {
            iframe.classList.remove("fade-out");
            iframe.classList.add("fade-in");

            // 일정 시간 후 클래스 초기화 (클린업)
            setTimeout(() => {
                iframe.classList.remove("fade-in");
            }, 500); // fade-in 시간
        };
    }

    setPlayer(player) {
        this.player = player;
    }
}

export default TileEvents;