import { getJSONData } from "./util.js";
import Text from "../game/components/Text.js";

const iframe = document.querySelector('iframe');
// TODO: 하드코딩된거 수정하기 반드시
class TileEvents {
	constructor() {
        // var testFrame = this.framePreload("https://denim-euphonium-b60.notion.site/ebd/2310be5efd6180e5a6d7ce4f8162c97a");
        this.player = null;
        this.uiObjects = null;
        this.eventMap = new Map();
        this.usingPopupTexts = new Map();
        this.getEventJSONData();
    }

    onEnterEvent(id) {
        const currentEvents = this.eventMap.get(id);
        if (!currentEvents) return;
        for (let currentEvent of currentEvents) {
            switch (currentEvent.type) {
                case "set-player-transform": {
                    this.player.transform.setTransform(currentEvent.x, currentEvent.y);
                    break;
                }
                case "update-iframe": {
                    this.updateIframe(currentEvent.url);
                    break;
                }
                case "show-popup-text-to-player": {
                    const popupText = new Text(currentEvent.text, currentEvent.x, currentEvent.y, "5px Arial", "#000000ff");
                    if (this.uiObjects.length <= 0) {
                        this.uiObjects.push(popupText);
                        this.usingPopupTexts.set(id, popupText)
                    }
                    break;
                }
            }
        }
    }

    onExitEvent(id) {
        if (this.usingPopupTexts.has(id)) {
            const popupText = this.usingPopupTexts.get(id);
            this.uiObjects.splice(this.uiObjects.indexOf(popupText), 1);
            this.usingPopupTexts.delete(id);
        }
    }

    async getEventJSONData() { 
        const jsonData = await getJSONData('./Data/eventData.json');
        console.log(jsonData);
        for (let tileEvent of jsonData.tileEvents) {
            if (this.eventMap.has(tileEvent.id)) { 
                const event = this.eventMap.get(tileEvent.id);
                const newEvent = [...event, tileEvent];
                this.eventMap.set(tileEvent.id, newEvent);
            }
            else {
                this.eventMap.set(tileEvent.id, [tileEvent]);
            }
        }
    }

    updateIframe(src) {
        const iframe = document.getElementById("portfolio-iframe");
        if (!iframe) {
            console.error("portfolio-iframe을 찾을 수 없습니다.");
            return;
        }

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

    setUIObjects(uiObjects) {
        this.uiObjects = uiObjects;
    }
}

export default TileEvents;