const useFile = () => {
  // Add a file or folder in tree
  const insertNode = function (tree, folderId, item, isFolder) {
    const newItem = {
      id: new Date(),
      isFolder,
      name: item,
      items: []
    };
  
    const checkAndInsert = (node) => {
      if (node.id === folderId && node.isFolder) {
        node.items.push(newItem);
        return true; 
      }
      
      for (let child of node.items) {
        if (child.isFolder) {
          if (checkAndInsert(child)) {
            return true;
          }
        }
      }
      return false;
    };
  
    checkAndInsert(tree);
    return tree;
  }; 

  const deleteNode = (tree, nodeId) => {
    const deleteHelper = (node) => {
      if (!node.isFolder) return false;
  
      const index = node.items.findIndex(child => child.id === nodeId);
      if (index !== -1) {
        node.items.splice(index, 1);
        return true;
      }
  
      for (let child of node.items) {
        if (child.isFolder && deleteHelper(child)) {
          return true;
        }
      }
      return false;
    };
  
    const clonedTree = JSON.parse(JSON.stringify(tree)); // Deep copy
    deleteHelper(clonedTree);
    return clonedTree;
  };

  const renameNode = () => {}; // Do it Yourself

  return { insertNode, deleteNode, renameNode };
};

export default useFile;
