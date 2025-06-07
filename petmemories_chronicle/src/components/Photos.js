import React from 'react';
import { usePetContext } from '../context/PetContext';

// PUBLIC_INTERFACE
function Photos() {
  const { photos, addPhoto } = usePetContext();
  const [imgFile, setImgFile] = React.useState(null);
  const [preview, setPreview] = React.useState('');

  const fileInputRef = React.useRef(null);

  const onImage = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert('Image should be under 3MB.');
      return;
    }
    setImgFile(file);
    const reader = new window.FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!imgFile) return;
    const reader = new window.FileReader();
    reader.onload = (ev) => {
      addPhoto(ev.target.result);
      setImgFile(null);
      setPreview('');
      fileInputRef.current.value = '';
    };
    reader.readAsDataURL(imgFile);
  };

  return (
    <div>
      <h2 className="title" style={{fontSize:'2rem',marginTop:8}}>Photos</h2>
      <div className="description" style={{marginBottom:18}}>
        Upload and view your pet’s photos. All photos are automatically added to the Scrapbook.
      </div>
      <form onSubmit={onSubmit} style={{marginBottom:18, display:'flex',alignItems:'center',gap:12,padding:'10px 0'}}>
        <input type="file" accept="image/*" onChange={onImage} ref={fileInputRef} aria-label="Upload photo"/>
        {preview && <img src={preview} style={{height:50,borderRadius:6,border:'1px solid #F7C59F'}} alt="preview" />}
        <button className="btn btn-large" style={{background:'var(--primary, #F7C59F)', color:'#4a3633'}} type="submit">Add Photo</button>
      </form>
      <div style={{display:'flex',flexWrap:'wrap',gap:14,justifyContent:'flex-start'}}>
        {photos.length === 0 && <div style={{color:'#888',fontStyle:'italic'}}>No photos yet—add your first!</div>}
        {photos.map((img, idx) => (
          <div key={idx} style={{width:110,height:110,background:'#fffdfa',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',border:'2px solid #F7C59F'}}>
            <img src={img} alt={`pet photo ${idx}`}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;
