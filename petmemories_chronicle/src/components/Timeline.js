import React from 'react';
import { usePetContext } from '../context/PetContext';

// PUBLIC_INTERFACE
function Timeline() {
  const { memories, addMemory } = usePetContext();
  const [showForm, setShowForm] = React.useState(false);

  // Form state
  const [desc, setDesc] = React.useState('');
  const [imgFile, setImgFile] = React.useState(null);
  const [preview, setPreview] = React.useState('');
  const fileRef = React.useRef(null);

  const onImage = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setImgFile(file);
    const reader = new window.FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setDesc('');
    setImgFile(null);
    setPreview('');
    if (fileRef.current) fileRef.current.value = '';
    setShowForm(false);
  };

  // Add memory handler
  function handleAdd(e) {
    e.preventDefault();
    if (!desc && !imgFile) return;
    if (imgFile && imgFile.size > 3 * 1024 * 1024) {
      alert('Please use an image under 3MB.');
      return;
    }
    if (imgFile) {
      const reader = new window.FileReader();
      reader.onload = (ev) => {
        addMemory({
          description: desc,
          image: ev.target.result,
          date: (new Date()).toISOString()
        });
        resetForm();
      };
      reader.readAsDataURL(imgFile);
    } else {
      addMemory({
        description: desc,
        image: null,
        date: (new Date()).toISOString()
      });
      resetForm();
    }
  }

  return (
    <div>
      <h2 className="title" style={{fontSize:'2rem',marginTop:8}}>Timeline</h2>
      <div className="description" style={{marginBottom:18}}>
        A chronological story of your pet's life. Add memories—each can include text and a photo.
      </div>
      <div style={{ marginBottom: 20}}>
        <button 
          className="btn btn-large" 
          onClick={()=>setShowForm(s=>!s)}
          style={{marginBottom: showForm ? 14 : 0, background: 'var(--primary, #F7C59F)', color: '#4a3633'}}
        >
          {showForm ? 'Cancel' : 'Add Memory'}
        </button>
        {showForm && (
          <form style={formStyle} onSubmit={handleAdd}>
            <textarea 
              placeholder="Share a special moment..." 
              value={desc}
              onChange={e=>setDesc(e.target.value)}
              maxLength={320}
              style={{...inputStyle, width: '98%'}}
              aria-label="Memory description"
            />
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <input 
                type="file"
                accept="image/*"
                onChange={onImage}
                ref={fileRef}
                aria-label="Upload memory photo"
                style={{marginTop:6}}
              />
              {preview && (
                <img src={preview} alt="Preview" style={{height:48, borderRadius:8, border:'1.7px solid var(--secondary, #A1C6EA)'}} />
              )}
              <button 
                className="btn btn-large" 
                style={{marginLeft: 'auto', background:'var(--accent, #F67280)', color:'#fff'}}
                type="submit"
              >Save Memory</button>
            </div>
          </form>
        )}
      </div>
      <div>
        {memories.length === 0 && (<div style={{color: '#888',fontStyle:"italic"}}>No memories yet. Add your first one!</div>)}
        <ol style={{paddingLeft:0,margin:0,listStyle:'none'}}>
          {memories.slice().reverse().map((memory,idx) => (
            <li key={memory.date + '-' + idx} style={timelineItemStyle}>
              <div>
                <div style={{fontSize:15, color:'var(--accent, #F67280)',marginBottom:3,letterSpacing:'0.03em'}}>
                  {formatDate(memory.date)}
                </div>
                <div style={{
                  background: '#fffdfa',
                  color: '#444',
                  borderRadius: 8,
                  minHeight: 52,
                  padding: '10px 14px',
                  boxShadow:'0 1px 6px rgba(180,160,142,0.09)',
                  marginBottom: 2
                }}>
                  <p style={{marginBottom: memory.image ? 8: 0, fontSize:'1.1rem'}}>{memory.description}</p>
                  {memory.image && <img src={memory.image} alt="memory" style={{maxHeight:120, borderRadius:8, border:'1.7px solid var(--secondary, #A1C6EA)',marginTop:8}} />}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const timelineItemStyle = {
  marginBottom: 22,
  paddingLeft: 0,
};

const formStyle = {
  background: 'rgba(250,245,235, 0.93)',
  padding: 15,
  borderRadius: 8,
  border: '1.5px solid #ffe8c7',
  margin: '8px 0',
  marginBottom: 10
};

const inputStyle = {
  fontSize: '1rem',
  border: '1.5px solid var(--primary, #F7C59F)',
  borderRadius: 6,
  outline: 'none',
  boxShadow: 'none',
  marginBottom: 7,
  padding: '9px 10px',
  resize: 'vertical',
};

function formatDate(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString(undefined,{ year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit',minute:'2-digit'});
}

export default Timeline;
