figma.showUI(__html__, { width: 800, height: 600 });

function nodeToJson(node) {
  return {
    id: node.id,
    name: node.name,
    type: node.type,
    width: node.width,
    height: node.height,
    x: node.x,
    y: node.y,
    rotation: node.rotation,
    opacity: node.opacity,
    visible: node.visible,
    locked: node.locked,
    fills: node.fills,
    strokes: node.strokes,
    strokeWeight: node.strokeWeight,
    strokeAlign: node.strokeAlign,
    cornerRadius: node.cornerRadius,
    constraints: node.constraints,
    layoutAlign: node.layoutAlign,
    layoutGrow: node.layoutGrow,
    effects: node.effects,
    blendMode: node.blendMode,
    absoluteBoundingBox: node.absoluteBoundingBox,
    absoluteRenderBounds: node.absoluteRenderBounds,
    relativeTransform: node.relativeTransform,
    exportSettings: node.exportSettings,
    reactions: node.reactions,
    children: node.children ? node.children.map(child => nodeToJson(child)) : []
  };
}

function runPlugin() {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) {
    figma.notify('No node selected');
    return;
  }
  console.log('selectedNode', selectedNode);

  const selectedNodeJson = nodeToJson(selectedNode);
  console.log('selectedNodeJson', JSON.stringify(selectedNodeJson, null, 2));

  figma.ui.postMessage({
    type: "selected-node-json",
    data: selectedNodeJson
  });
}

runPlugin();

figma.ui.onmessage = (msg) => {
  if (msg.type === 'copy-json') {
    figma.notify('JSON data copied to clipboard');
  }
};
