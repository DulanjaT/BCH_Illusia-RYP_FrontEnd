import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
    Divider,
    Box,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
} from '@mui/material';

import {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
} from '../services/itemService';

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        description: '',
        contentSummary: '',
        storageDetails: '',
        storageLocation: '',
    });
    const [selectedItem, setSelectedItem] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllItems();
                setItems(data);
            } catch (error) {
                console.error('Failed to load items:', error);
            }
        };

        fetchData();
    }, []);

    const handleCreate = async () => {
        if (!newItem.description || !newItem.contentSummary) {
            alert('Description and Content Summary are required.');
            return;
        }

        try {
            const created = await createItem(newItem);
            setItems((prev) => [...prev, created]);
            setNewItem({
                description: '',
                contentSummary: '',
                storageDetails: '',
                storageLocation: '',
            });
            setCreateDialogOpen(false);
        } catch (err) {
            console.error('Item creation failed', err);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Storage Items
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setCreateDialogOpen(true)}
                sx={{ mt: 2, mb: 3 }}
            >
                Add Item
            </Button>

            {/* Item List */}
            <Paper elevation={3}>
                <List>
                    {items.map((item) => (
                        <React.Fragment key={item.id}>
                            <ListItem
                                button
                                onClick={() => {
                                    setSelectedItem(item);
                                    setUpdateMode(false);
                                }}
                                selected={selectedItem?.id === item.id}
                            >
                                <ListItemText
                                    primary={item.contentSummary}
                                    secondary={`Description: ${item.description}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            {/* Action Buttons */}
            {selectedItem && !updateMode && (
                <Box mt={4}>
                    <Typography variant="body1">
                        Selected: <strong>{selectedItem.contentSummary}</strong>
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => setUpdateMode(true)}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Update Item
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setDeleteDialogOpen(true)}
                        sx={{ mt: 1 }}
                    >
                        Delete Item
                    </Button>
                </Box>
            )}

            {/* Update Form */}
            {selectedItem && updateMode && (
                <Box mt={4}>
                    <Typography variant="h6">Edit Item</Typography>

                    <TextField
                        label="Description"
                        fullWidth
                        required
                        margin="normal"
                        value={selectedItem.description}
                        onChange={(e) =>
                            setSelectedItem((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    />

                    <TextField
                        label="Content Summary"
                        fullWidth
                        required
                        margin="normal"
                        value={selectedItem.contentSummary}
                        onChange={(e) =>
                            setSelectedItem((prev) => ({
                                ...prev,
                                contentSummary: e.target.value,
                            }))
                        }
                    />

                    <TextField
                        label="Storage Details"
                        fullWidth
                        margin="normal"
                        value={selectedItem.storageDetails || ''}
                        onChange={(e) =>
                            setSelectedItem((prev) => ({
                                ...prev,
                                storageDetails: e.target.value,
                            }))
                        }
                    />

                    <TextField
                        label="Storage Location"
                        fullWidth
                        margin="normal"
                        value={selectedItem.storageLocation || ''}
                        onChange={(e) =>
                            setSelectedItem((prev) => ({
                                ...prev,
                                storageLocation: e.target.value,
                            }))
                        }
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                            if (
                                !selectedItem.description ||
                                !selectedItem.contentSummary
                            ) {
                                alert('Description and Content Summary are required.');
                                return;
                            }

                            try {
                                const updated = await updateItem(selectedItem.id, selectedItem);
                                setItems((prev) =>
                                    prev.map((item) =>
                                        item.id === updated.id ? updated : item
                                    )
                                );
                                setSelectedItem(null);
                                setUpdateMode(false);
                            } catch (err) {
                                console.error('Update failed', err);
                            }
                        }}
                        sx={{ mt: 2 }}
                    >
                        Save Changes
                    </Button>
                </Box>
            )}

            {/* Create Dialog */}
            <Dialog
                open={createDialogOpen}
                onClose={() => {
                    setCreateDialogOpen(false);
                    setNewItem({
                        description: '',
                        contentSummary: '',
                        storageDetails: '',
                        storageLocation: '',
                    });
                }}
            >
                <DialogTitle>Add New Item</DialogTitle>
                <Box sx={{ p: 3 }}>
                    <TextField
                        label="Description"
                        name="description"
                        value={newItem.description}
                        onChange={(e) =>
                            setNewItem((prev) => ({ ...prev, description: e.target.value }))
                        }
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Content Summary"
                        name="contentSummary"
                        value={newItem.contentSummary}
                        onChange={(e) =>
                            setNewItem((prev) => ({
                                ...prev,
                                contentSummary: e.target.value,
                            }))
                        }
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Storage Details"
                        name="storageDetails"
                        value={newItem.storageDetails}
                        onChange={(e) =>
                            setNewItem((prev) => ({
                                ...prev,
                                storageDetails: e.target.value,
                            }))
                        }
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Storage Location"
                        name="storageLocation"
                        value={newItem.storageLocation}
                        onChange={(e) =>
                            setNewItem((prev) => ({
                                ...prev,
                                storageLocation: e.target.value,
                            }))
                        }
                        fullWidth
                        margin="normal"
                    />
                </Box>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setCreateDialogOpen(false);
                            setNewItem({
                                description: '',
                                contentSummary: '',
                                storageDetails: '',
                                storageLocation: '',
                            });
                        }}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>
                    Are you sure you want to delete this item?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        No
                    </Button>
                    <Button
                        onClick={async () => {
                            try {
                                await deleteItem(selectedItem.id);
                                setItems((prev) =>
                                    prev.filter((item) => item.id !== selectedItem.id)
                                );
                                setSelectedItem(null);
                                setUpdateMode(false);
                            } catch (error) {
                                console.error('Delete failed', error);
                            } finally {
                                setDeleteDialogOpen(false);
                            }
                        }}
                        color="error"
                    >
                        Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ItemsPage;
