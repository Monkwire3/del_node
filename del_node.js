let deletedNodesStack = [];
let highlightedNode = null;

document.body.addEventListener('click', function(event) {
  if (event.altKey) {
    let deletedNodeInfo = {
      node: event.target.cloneNode(true), // Clone the node to keep its state
      parent: event.target.parentNode,
      nextSibling: event.target.nextSibling // This helps us know where to insert it back
    };

    deletedNodesStack.push(deletedNodeInfo);
    event.target.remove();
    console.log("Node was removed!");
  }
});

document.addEventListener('keydown', function(event) {
  if (event.altKey && event.key === 'U') {
    if (deletedNodesStack.length > 0) {
      let lastDeleted = deletedNodesStack.pop();

      // Insert the node back into its original position
      if (lastDeleted.nextSibling) {
        lastDeleted.parent.insertBefore(lastDeleted.node, lastDeleted.nextSibling);
      } else {
        lastDeleted.parent.appendChild(lastDeleted.node);
      }
      console.log("Node was restored!");
    } else {
      console.log("No nodes to restore!");
    }
  }
});

document.body.addEventListener('mouseover', function(event) {
  if (event.altKey) {
    // Un-highlight the previously highlighted node if there's any
    if (highlightedNode) {
      highlightedNode.style.backgroundColor = '';
    }

    // Highlight the current node
    event.target.style.backgroundColor = 'yellow';
    highlightedNode = event.target;
  }
});

document.body.addEventListener('mouseout', function(event) {
  if (highlightedNode && event.altKey) {
    highlightedNode.style.backgroundColor = '';
    highlightedNode = null;
  }
});

document.addEventListener('keyup', function(event) {
  if (event.key === 'Alt' && highlightedNode) {
    highlightedNode.style.backgroundColor = '';
    highlightedNode = null;
  }
});

