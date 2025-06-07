import React from 'react';
import { usePetContext } from '../context/PetContext';

// PUBLIC_INTERFACE
function PetProfile() {
  const { petProfile, updatePetProfile } = usePetContext();
  const fileInputRef = React.useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new window.FileReader();
    reader.onload = (ev) => {
      updatePetProfile({ ...petProfile, photo: ev.target.result });
    };
    reader.readAsDataURL(file);
  };

  const triggerFile = (e) => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="hero" style={{paddingTop: 48, paddingBottom: 40}}>
      <div style={{marginBottom: 8}}>
        <div 
          style={{
            width: 144, height: 144, borderRadius: '50%', background: 'var(--secondary, #A1C6EA)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', position: 'relative', border: '6px solid var(--primary, #F7C59F)'
          }}
          onClick={triggerFile}
          title="Click to upload/change your pet photo"
        >
          {petProfile.photo 
            ? <img src={petProfile.photo} alt="Pet profile" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} /> 
            : <span style={{fontSize: 64, color: 'var(--accent, #F67280)'}}>🐾</span>
          }
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
            aria-label="Upload pet profile photo"
          />
          <span style={{position:'absolute',bottom:4,right:8,background:'var(--accent, #F67280)',borderRadius: '50%',padding:'4px',color:'#fff',fontWeight:600,fontSize:18,boxShadow:'0 1px 4px #0002'}}>✏️</span>
        </div>
      </div>
      <h2 className="title" style={{fontSize: '2.2rem',marginTop:12,marginBottom:8,letterSpacing:0.1}}>
        {petProfile.name ? petProfile.name : "Your Pet's Profile"}
      </h2>
      <div style={{maxWidth: 380, margin: 'auto'}}>
        <form
          style={{display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center'}}
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <input type="text" 
            placeholder="Name" 
            value={petProfile.name} 
            onChange={e=>updatePetProfile({...petProfile, name: e.target.value})}
            style={inputStyle}
            maxLength={24}
            aria-label="Pet name"
          />
          <input type="text" 
            placeholder="Breed/Type" 
            value={petProfile.breed}
            onChange={e=>updatePetProfile({...petProfile, breed: e.target.value})}
            style={inputStyle}
            maxLength={32}
            aria-label="Pet breed/type"
          />
          <input type="date"
            placeholder="Birthday"
            value={petProfile.birthday}
            onChange={e=>updatePetProfile({...petProfile, birthday: e.target.value})}
            style={inputStyle}
            aria-label="Birthday"
          />
          <textarea
            placeholder="About your pet..."
            style={{...inputStyle, height: 60}}
            value={petProfile.about}
            onChange={e=>updatePetProfile({...petProfile, about: e.target.value})}
            maxLength={256}
            aria-label="About pet"
          />
        </form>
      </div>
      <div className="description" style={{marginTop: 26, fontSize: '1.07rem'}}>
        Welcome! Upload your pet's profile photo and fill out details.<br/>
        Start creating wonderful memories.
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '10px 14px',
  margin: 0,
  width: 220,
  fontSize: '1rem',
  border: '1.7px solid var(--secondary, #A1C6EA)',
  borderRadius: 6,
  outline: 'none',
  boxShadow: 'none',
};

export default PetProfile;
