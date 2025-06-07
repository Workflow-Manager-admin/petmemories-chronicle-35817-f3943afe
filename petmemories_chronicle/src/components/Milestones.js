import React from 'react';
import { usePetContext } from '../context/PetContext';

// PUBLIC_INTERFACE
function Milestones() {
  const { milestones, addMilestone } = usePetContext();
  const [desc, setDesc] = React.useState('');
  const [date, setDate] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!desc || !date) return;
    addMilestone({
      description: desc,
      date: date,
      createdAt: (new Date()).toISOString()
    });
    setDesc('');
    setDate('');
    setShowForm(false);
  };

  return (
    <div>
      <h2 className="title" style={{fontSize:'2rem',marginTop:8}}>Milestones</h2>
      <div className="description" style={{marginBottom:18}}>
        Special achievements and events. These milestones are highlighted in your Scrapbook.
      </div>
      <button 
        className="btn btn-large"
        style={{background:'var(--primary, #F7C59F)',color:'#4a3633',marginBottom: showForm ? 18 : 8}}
        onClick={() => setShowForm(s => !s)}
      >
        {showForm ? "Cancel" : "Add Milestone"}
      </button>
      {showForm && (
        <form
          style={{background:'#fffdfa',border:'1.5px solid #ffe8c7',borderRadius:8,padding:14,marginBottom:12,width:'100%',maxWidth:366}}
          onSubmit={handleAdd}
        >
          <input 
            type="date"
            aria-label="Milestone date"
            value={date}
            onChange={e=>setDate(e.target.value)}
            style={{...inputStyle, marginBottom: 10}}
            required
          />
          <textarea 
            placeholder="Describe the milestone..."
            aria-label="Milestone description"
            value={desc}
            onChange={e=>setDesc(e.target.value)}
            style={{...inputStyle, width:'99%', marginBottom:0}}
            maxLength={148}
            required
          />
          <div style={{display:'flex',justifyContent:'flex-end',marginTop:8}}>
            <button className="btn btn-large" style={{background:'var(--accent, #F67280)',color:'#fff'}} type="submit">Save Milestone</button>
          </div>
        </form>
      )}
      <div>
        {milestones.length === 0 && (<div style={{color: '#888',fontStyle:"italic"}}>No milestones yet.</div>)}
        <ol style={{paddingLeft:0,margin:0,listStyle:'none'}}>
          {milestones.slice().reverse().map((ms, idx) => (
            <li key={ms.createdAt+'-'+idx} style={{marginBottom:16}}>
              <div style={{fontSize:15,color:'var(--accent, #F67280)',marginBottom:2,letterSpacing:'0.03em'}}>
                {formatDate(ms.date)}
              </div>
              <div style={{background:'#fffdfa',color:'#444',borderRadius:8,minHeight:35,padding:'10px 14px',boxShadow:'0 1px 6px rgba(180,160,142,0.09)'}}>
                <p style={{margin:0,fontSize:'1.13rem'}}>{ms.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function formatDate(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  return d.toLocaleDateString(undefined,{ year: 'numeric', month: 'long', day: 'numeric' });
}

const inputStyle = {
  fontSize: '1rem',
  border: '1.5px solid var(--primary, #F7C59F)',
  borderRadius: 6,
  outline: 'none',
  boxShadow: 'none',
  marginBottom: 9,
  padding: '9px 10px',
  resize: 'vertical',
};

export default Milestones;
