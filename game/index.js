import GameManager from "/game/core/GameManager.js";

const parent = document.getElementById("parent");

window.onload = () => {
    console.log("WORK")
    const gameManager = new GameManager();
    gameManager.init();
    gameManager.loop();
};