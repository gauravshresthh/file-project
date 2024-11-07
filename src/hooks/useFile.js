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
  }; // Do it Yourself

  const deleteNode = () => {}; // Do it Yourself

  const renameNode = () => {}; // Do it Yourself

  return { insertNode, deleteNode, renameNode };
};

export default useFile;
