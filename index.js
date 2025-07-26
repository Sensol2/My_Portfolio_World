import GameManager from "./game/core/GameManager.js";

const parent = document.getElementById("parent");

window.onload = () => {
    const gameManager = new GameManager();
    gameManager.init();
    gameManager.loop();
};