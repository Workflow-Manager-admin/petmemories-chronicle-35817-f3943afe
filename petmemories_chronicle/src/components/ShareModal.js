import React from 'react';
import { usePetContext } from '../context/PetContext';

// PUBLIC_INTERFACE
function ShareModal({ onClose }) {
  const { petProfile } = usePetContext();
  const baseUrl = window.location.origin;
  // Simulate unique URL (not truly functional without backend)
  const storyPath = `/share/${(petProfile.name||'pet').replace(/\W+/g, '').toLowerCase()}`; 
  const storyLink = baseUrl + storyPath;

  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText(storyLink);
    setCopied(true);
    setTimeout(()=>setCopied(false), 1500);
  };

  return (
    <div role="dialog" aria-modal="true" style={bgStyle}>
      <div style={modalStyle}>
        <h3 style={{margin:'4px 0 16px 0', fontSize:'1.26rem',color:'var(--accent, #F67280)'}}>Share Pet Story</h3>
        <div style={{marginBottom: 20}}>
          <span style={{fontSize: '1.08rem'}}> Share this private link <span role="img" aria-label="lock">🔒</span> to let others view your pet’s memories and scrapbook. (No backend, so link is just for demo.)</span>
        </div>
        <div style={{display:'flex',alignItems:'center',marginBottom:14}}>
          <input 
            style={{width:'90%',fontSize:'1rem',padding:'7px',border:'1px solid #aaa',borderRadius:4,marginRight:7}}
            value={storyLink}
            readOnly
            aria-label="Share link"
          />
          <button className="btn" style={{fontSize:'.97rem',padding:'5px 11px',background:'var(--secondary, #A1C6EA)',color:'#184266'}} onClick={copy}>{copied ? "Copied!" : "Copy"}</button>
        </div>
        <button className="btn" style={{marginTop:10,background:'var(--accent, #F67280)',color:'#fff'}} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

const modalStyle = {
  background:'#fffdfc',
  border:'2px solid var(--primary, #F7C59F)',
  borderRadius:11,
  padding:'29px 24px',
  maxWidth:410,
  margin:'auto',
  boxShadow:'0 4px 32px rgba(45,33,38,0.12)',
  zIndex:301,
  textAlign:'center'
};

const bgStyle = {
  position:'fixed',
  zIndex:300,
  left:0,top:0,right:0,bottom:0,
  background:'rgba(252,237,225,0.95)',
  display:'flex',alignItems:'center',justifyContent:'center'
};

export default ShareModal;
