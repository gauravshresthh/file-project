/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FileIcon, FolderIcon } from './icons';

function Folder({
  handleInsertNode = () => {},
  handleDeleteNode = () => {},
  explorer,
}) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  return (
    <>
      {explorer.isFolder ? (
        <div style={{ marginTop: 5 }}>
          <div onClick={() => setExpand(!expand)} className="folder">
            <span>
              <FolderIcon /> {explorer.name}
            </span>

            <div>
              <button
                className="bordered"
                onClick={(e) => handleNewFolder(e, true)}
              >
                <FolderIcon /> +
              </button>
              <button
                className="bordered"
                onClick={(e) => handleNewFolder(e, false)}
              >
                <FileIcon /> +
              </button>
              <button
                className="bordered delete"
                onClick={() => handleDeleteNode(explorer.id)}
              >
                Delete
              </button>
            </div>
          </div>

          <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
            {showInput.visible && (
              <div className="inputContainer">
                <span>
                  {showInput.isFolder ? <FolderIcon /> : <FileIcon />}
                </span>
                <input
                  type="text"
                  className="inputContainer__input"
                  autoFocus
                  onKeyDown={onAddFolder}
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                />
              </div>
            )}

            {explorer.items.map((data) => {
              if (data.isFolder) {
                return (
                  <Folder
                    key={data.id}
                    explorer={data}
                    handleInsertNode={handleInsertNode}
                    handleDeleteNode={handleDeleteNode}
                  />
                );
              }
              return (
                <span className="file">
                  <FileIcon /> <span>{explorer.name}</span>{' '}
                  <button
                    className="bordered delete"
                    onClick={() => {
                      console.log('delete clicked');
                      handleDeleteNode(data.id);
                    }}
                  >
                    Delete
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      ) : (
        <span className="file">
          <FileIcon /> <span>{explorer.name}</span>
          <button
            className="bordered delete"
            onClick={() => {
              console.log('delete clicked');
              handleDeleteNode(explorer.id);
            }}
          >
            Delete
          </button>
        </span>
      )}
    </>
  );
}

export default Folder;
