'use client';
import Image from "next/image";
import {useState, useEffect} from 'react';
import {firestore} from '@/firebase';
import {Box, Modal, Typography, Stack, Button, TextField} from '@mui/material';
import {collection, getDocs, query, doc, setDoc, getDoc, deleteDoc} from "firebase/firestore";


export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemNames, setItemName] = useState('');

  const updateInventory = async () => {
    const snapShot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapShot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
    console.log(inventoryList);
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const {quantity} = docSnap.data();
      await setDoc(docRef, {quantity: quantity + 1});
    } else {
      await setDoc(docRef, {quantity: 1});
    }
    await updateInventory();
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const {quantity} = docSnap.data();
      if (quantity == 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {quantity: quantity - 1});
      }
    }
    await updateInventory();
  }

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Typography variant="h2">
            Welcome to your Pantry Organizer!  
          </Typography>
          <Typography variant="h3">
            You can add items to your pantry here or remove them.  
          </Typography>

      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
         
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}></Stack>
          <TextField
            variant="outlined"
            fullWidth
            value={itemNames}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              addItem(itemNames);
              setItemName('');
              handleClose();
            }}
          >
            Add
          </Button>
        </Box>
        </Modal>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen();
        }}
      >
        Add New Item
      </Button>
      <Box border="1px solid #333">
        <Box
          width="800px"
          height="100px"
          bgcolor="#ADD8E6"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">
            Inventory Items
          </Typography>
        </Box>
      
      <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
        {
        inventory.map(({name, quantity}) => (
          <Box
            key={name}
            display="flex"
            width="100%"
            minheight="150px"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="f0f0f0"
            padding={5}
          >
            <Typography variant="h3" color="#333" textAlign="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>

            <Typography variant="h3" color="#333" textAlign="center">
              {quantity}
            </Typography>

            <Button variant= "contained" onClick={() => 
              removeItem(name)
              }>
              Remove
            </Button>
            </Box>
        ))}
      </Stack>
      
      </Box>
    </Box>
    
  );
}