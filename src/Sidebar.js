import React, { useState } from 'react';

const Sidebar = ({ defaultComponents }) => {
    const [components, setComponents] = useState(defaultComponents);
    const [newFolderName, setNewFolderName] = useState('');
    const [folders, setFolders] = useState([]);
    const [droppedComponents, setDroppedComponents] = useState([]);

    const handleComponentDrag = (componentId, folderId) => {
        const updatedComponents = components.map((component) =>
            component.id === componentId ? { ...component, folderId } : component
        );
        setComponents(updatedComponents);
    };

    const handleCreateFolder = () => {
        if (newFolderName.trim() !== '') {
            const newFolder = {
                id: `folder-${Math.random().toString(36).substr(2, 5)}`,
                name: newFolderName.trim(),
            };
            setFolders([...folders, newFolder]);
            setNewFolderName('');
        }
    };

    const handleDropComponent = (e) => {
        e.preventDefault();
        const componentId = e.dataTransfer.getData('text/plain');
        const newComponent = components.find((component) => component.id === componentId);

        if (newComponent) {
            const hasFolderAssigned = newComponent.folderId !== undefined && newComponent.folderId !== null;

            if (!hasFolderAssigned) {
                const newFolder = {
                    id: `folder-${Math.random().toString(36).substr(2, 5)}`,
                    name: `${newComponent.name} Folder`,
                };

                setDroppedComponents([...droppedComponents, newComponent]);
                setFolders([...folders, newFolder]);
                handleComponentDrag(componentId, newFolder.id);
            }
        }
    };

    return (
        <div>
            <h2>Sidebar</h2>
            <div>
                <h3>Components</h3>
                <ul>
                    {components.map((component) => (
                        <li key={component.id}>{component.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Folders</h3>
                <ul>
                    {folders.map((folder) => (
                        <li key={folder.id}>{folder.name}</li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                />
                <button onClick={handleCreateFolder}>Create Folder</button>
            </div>
            <div>
                <h3>Drag components here to assign them to a folder:</h3>
                <ul
                    className="folder-dropzone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropComponent(e)}
                >
                    {components
                        .filter((component) => !component.folderId)
                        .map((component) => (
                            <li key={component.id} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', component.id)}>
                                {component.name}
                            </li>
                        ))}
                </ul>
            </div>
            {folders.map((folder) => (
                <div key={folder.id}>
                    <h3>{folder.name}</h3>
                    <ul
                        className="folder-dropzone"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const componentId = e.dataTransfer.getData('text/plain');
                            handleComponentDrag(componentId, folder.id);
                        }}
                    >
                        {components
                            .filter((component) => component.folderId === folder.id)
                            .map((component) => (
                                <li key={component.id} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', component.id)}>
                                    {component.name}
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
            <div>
                <h3>New Folders (for dragged components)</h3>
                <ul>
                    {droppedComponents.map((component) => (
                        <li key={component.id}>{`${component.name} Folder`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
