export default function elt(name, attributes, ...children) {
    var node = document.createElement(name);

    // 속성 설정
    if (attributes) {
        for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                node.setAttribute(attr, attributes[attr]);
            }
        }
    }

    // 자식 노드 추가
    children.forEach(child => {
        if (typeof child === "string") {
            child = document.createTextNode(child);
        }
        if (child != null) {
            node.appendChild(child);
        }
    });

    return node;
}
