import React from 'react';
import { usePetContext } from '../context/PetContext';

// PUBLIC_INTERFACE
function Scrapbook() {
  const { memories, milestones, photos, scrapbookNotes, setScrapbookNoteForEntry } = usePetContext();
  // All inputs from other pages included, sorted by date.
  const combined = [
    ...memories.map((m, i) => ({
      type: 'memory',
      key: `memory-${m.date}-${i}`,
      date: m.date,
      description: m.description,
      image: m.image,
    })),
    ...milestones.map((m, i) => ({
      type: 'milestone',
      key: `milestone-${m.createdAt}-${i}`,
      date: m.date,
      description: m.description,
    })),
    ...photos.map((img, i) => ({
      type: 'photo',
      key: `photo-auto-${i}`,
      date: '', // photos don't have date so treat as now
      image: img,
      description: '',
    })),
  ].sort(sortByDateDesc);

  // For note editing
  const onNoteChange = (key, val) => setScrapbookNoteForEntry(key, val);

  return (
    <div>
      <h2 className="title" style={{fontSize:'2rem',marginTop:8}}>Scrapbook</h2>
      <div className="description" style={{marginBottom:18}}>
        Your pet’s digital scrapbook—auto-updated with all your memories, milestones, and photos.<br/>
        Add or edit descriptions to personalize each entry. (Ctrl+P or browser print to save/print this)
      </div>
      <div style={{background:'#fffdfa',border:'1.7px solid #ffe8c7',borderRadius:14,padding:'20px 14px',marginBottom:16,minHeight:220}}>
        {combined.length === 0 && <div style={{color:'#888',fontStyle:'italic'}}>No content yet. Add memories, milestones, or photos.</div>}
        <div>
        {combined.map(item => (
          <div 
            key={item.key}
            style={{
              borderBottom: '1px solid #eee5', 
              marginBottom: 14, 
              paddingBottom: 12, 
              display:'flex', gap:16,
              alignItems:'flex-start'
            }}
          >
            {item.image && (
              <div style={{minWidth:78,maxWidth:120,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src={item.image} alt="scrapbook" style={{maxHeight:78, maxWidth:120, borderRadius:7, border:'2.2px solid var(--secondary, #A1C6EA)'}} />
              </div>
            )}
            <div style={{flexGrow:1}}>
              <div style={{fontSize:14, color:'var(--accent, #F67280)',marginBottom:2,letterSpacing:'.02em'}}>
                {item.type === 'memory' && 'Memory'}
                {item.type === 'milestone' && 'Milestone'}
                {item.type === 'photo' && 'Photo'}
                {item.date && (
                  <span style={{marginLeft:8, color:'#9c7d4c',fontSize:13}}>
                    {formatDate(item.date)}
                  </span>
                )}
              </div>
              {item.description && (
                <div style={{marginBottom:7,fontWeight: item.type==='milestone'? 600: 400}}>{item.description}</div>
              )}
              <textarea
                placeholder="Add your personal note about this..."
                style={{
                  border: '1px solid var(--secondary, #A1C6EA)',
                  borderRadius: 6,
                  fontSize: '1rem',
                  padding: '8px',
                  width: '97%',
                  marginBottom: 3,
                  minHeight: 40}}
                value={scrapbookNotes[item.key] || ''}
                onChange={e=>onNoteChange(item.key, e.target.value)}
                maxLength={180}
                aria-label="Scrapbook note"
              />
            </div>
          </div>
        ))}
        </div>
      </div>
      <div style={{textAlign:'center',marginTop:14}}>
        <button 
          className="btn" 
          style={{background:'var(--primary, #F7C59F)',color:'#4a3633',marginRight:8}} 
          onClick={()=>window.print()}
        >Print Scrapbook</button>
      </div>
    </div>
  );
}

function sortByDateDesc(a, b) {
  // Use date string or fallback to 0 (order: memory/milestone first, then photos)
  const dateA = a.date ? +new Date(a.date) : 0;
  const dateB = b.date ? +new Date(b.date) : 0;
  return dateB - dateA;
}

function formatDate(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  return d.toLocaleDateString(undefined,{ year: 'numeric', month: 'long', day: 'numeric' });
}

export default Scrapbook;
