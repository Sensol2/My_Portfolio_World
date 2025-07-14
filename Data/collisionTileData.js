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

export async function getWallData() {
    const jsonData = await getJSONData();
    const layer_collision = jsonData.layers.find(layer => layer.name === "Collision");
    const dataArray = sliceTileMap(layer_collision.data, layer_collision.height, layer_collision.width);

    return [dataArray, layer_collision.height, layer_collision.width];
} 

export async function getEventData() {
    const jsonData = await getJSONData();
    const layer_event = jsonData.layers.find(layer => layer.name === "Event");
    const dataArray = sliceTileMap(layer_event.data, layer_event.height, layer_event.width);

    return [dataArray, layer_event.height, layer_event.width];
} 

async function getJSONData() {
    const response = await fetch('/Tiled/MyPortfolioWorld.json');
    const json = await response.json();
    return json;
}