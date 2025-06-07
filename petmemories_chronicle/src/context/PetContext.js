import React, { createContext, useContext, useState } from 'react';

// PUBLIC_INTERFACE
const PetContext = createContext();

export function PetProvider({ children }) {
  // All app state managed here; persists only in memory (no backend!)
  const [petProfile, setPetProfile] = useState({
    photo: '', // data URI
    name: '',
    breed: '',
    birthday: '',
    about: '',
  });
  const [memories, setMemories] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [milestones, setMilestones] = useState([]);
  // Scrapbook user-entered notes, key = (type-key format)
  const [scrapbookNotes, setScrapbookNotes] = useState({});

  // PUBLIC_INTERFACE
  function updatePetProfile(profile) {
    setPetProfile(profile);
  }
  // PUBLIC_INTERFACE
  function addMemory(memory) {
    setMemories(ms => [...ms, memory]);
  }
  // PUBLIC_INTERFACE
  function addPhoto(photoDataUrl) {
    setPhotos(arr => [...arr, photoDataUrl]);
  }
  // PUBLIC_INTERFACE
  function addMilestone(ms) {
    setMilestones(arr => [...arr, ms]);
  }
  // PUBLIC_INTERFACE
  function setScrapbookNoteForEntry(key, val) {
    setScrapbookNotes(prev => ({ ...prev, [key]: val }));
  }

  return (
    <PetContext.Provider value={{
      petProfile,
      updatePetProfile,
      memories,
      addMemory,
      photos,
      addPhoto,
      milestones,
      addMilestone,
      scrapbookNotes,
      setScrapbookNoteForEntry,
    }}>
      {children}
    </PetContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function usePetContext() {
  return useContext(PetContext);
}
