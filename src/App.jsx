import { useState } from 'react'
import './App.css'


const Character = ({color, eyeColor, emotion, size=60}) => {
  const eyeSize = size*1.6;
  const emotionSize = size*0.8;
  const emotionDisplay = emotion == 'happy' ? '😊' : '🙂';
  return (
    <div  style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{ backgroundColor: color, width: size, height: size, borderRadius: '50%' }}>
      <div style={{fontSize: emotionSize}}> {emotionDisplay}</div>
    </div>
		<div style={{ backgroundColor: eyeColor, width: eyeSize, height: eyeSize, borderRadius: '50%', margin: 'auto'}}/>
    </div>
  );
}

const CharacterCustomization = ({color, eyeColor, setColor, setEyeColor, emotion}) => {
	return (
    <div  style={{display: 'flex', flexDirection: 'column', gap: 40}}>
    <div> Choose your monster's appeareance:</div>
		<div style={{display: 'flex', flexDirection: 'row', gap: 30}}>
			<Character color={color} eyeColor={eyeColor} emotion={emotion} />
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
        <div>
        <label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)}/> 
          Hair
          </label>
        </div>
        <div>
        <label>
          <input type="color" value={eyeColor} onChange={(e) => setEyeColor(e.target.value)}/> 
          Body
          </label>
        </div>
        <div>
        </div>
      </div>
		</div>
    </div>
	);
};


function App() {
  const [color, setColor] = useState('#00FF00');
	const [eyeColor, setEyeColor] = useState('#0000FF');
  const emotion = 'neutral';
  const n = 10;
  return (
    <>
      <h1>Statee</h1>
      <div  style={{display: 'flex', flexDirection: 'row', gap: 30, flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center'}}>
      <CharacterCustomization color={color} eyeColor={eyeColor} setColor={setColor} setEyeColor={setEyeColor} emotion={emotion} />
      </div>
    </>
  )
}

export default App
