import { getJSONData } from "./util.js";

let collisionTileData = [];
let eventTileData = [];


export function sliceTileMap(tileData, height, width) {
    const tileMap = [];
    for (let row = 0; row < height; row++) {
        const rowData = tileData.slice(row * width, (row + 1) * width);
        tileMap.push(rowData);
    }

    return tileMap;
} 

export async function getTilemapData(type) {
    const jsonData = await getJSONData('./Tiled/MyPortfolioWorld.json');
    const layer_collision = jsonData.layers.find(layer => layer.name === type);
    if (layer_collision) {
        const dataArray = sliceTileMap(layer_collision.data, layer_collision.height, layer_collision.width);
        return [dataArray, layer_collision.height, layer_collision.width];
    }
    else {
        console.error(`Layer with name ${type} not found in the JSON data.`);
        return [[], 0, 0];
    }
}

