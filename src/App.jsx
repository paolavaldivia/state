import {Suspense, useState} from 'react'
import './App.css'
import {getEmotionDisplay} from "./utils.jsx";
import {useCharactersQuery} from "./client/queries.jsx";

const Character = ({color, bodyColor, emotion, size = 60}) => {
    const bodySize = size * 1.6;
    const emotionSize = size * 0.8;
    const emotionDisplay = getEmotionDisplay(emotion);
    return (
        <div className="character">
            <div className="character-head" style={{backgroundColor: color, width: size, height: size}}>
                <div style={{fontSize: emotionSize}}> {emotionDisplay}</div>
            </div>
            <div className="character-body" style={{backgroundColor: bodyColor, width: bodySize, height: bodySize}}/>
        </div>
    );
}

const CharacterCustomization = ({character: {color, bodyColor, emotion}, updateCharacter}) => {
    return (
        <div className="character-customization">
            <div> Choose your monster's appeareance:</div>
            <div className="character-customization-choose">
                <Character color={color} bodyColor={bodyColor} emotion={emotion}/>
                <div className="character-customization-options">
                    <label>
                        <input type="color" value={color} onChange={(e) => updateCharacter({color: e.target.value})}
                               className="character-customization-label"
                        />
                        Hair
                    </label>
                    <label>
                        <input type="color" value={bodyColor}
                               onChange={(e) => updateCharacter({bodyColor: e.target.value})}
                               className="character-customization-label"
                        />
                        Body
                    </label>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const defaultCharacter = {
    color: '#FFFFFF',
    bodyColor: '#000000',
    emotion: 'neutral'
};


function Characters() {
    const {data} = useCharactersQuery();

    const [customizingId, setCustomizingId] = useState(null);
    const [characters, setCharacters] = useState(data);
    const [initialCharacter, setInitialCharacter] = useState(null);


    const resetCharacter = (id) => {
        setCharacters(characters.map((character) => character.id === id ? initialCharacter : character));
    }

    return (
        <div className="characters">
            <div className="characters-row">
                <>
                    {characters.map((character) => (
                        <div
                            key={character.id}
                            className="character-card">
                            <Character key={character.id} color={character.color} bodyColor={character.bodyColor}
                                       emotion={character.emotion}/>
                            <button onClick={() => {
                                setInitialCharacter(character);
                                setCustomizingId(character.id);
                            }}>Customize
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => setCharacters([...characters,
                            {
                                ...defaultCharacter,
                                id: characters.length + 1
                            }])}
                    >Add
                    </button>
                </>
            </div>
            <div>
                {
                    customizingId &&
                    <div className="customization-panel">
                        <CharacterCustomization
                            character={characters[customizingId - 1]}
                            updateCharacter={(updates) =>
                                setCharacters(characters.map((character) => character.id === customizingId ? {...character, ...updates} : character))
                            }/>
                        <div className="customization-panel-buttons">
                            <button onClick={() => {
                                resetCharacter(customizingId);
                                setCustomizingId(null)
                            }}>
                                ✖︎
                            </button>
                            <button onClick={() => setCustomizingId(null)}>✔︎</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}


function App() {
    return (
        <>
            <h1>State monsters</h1>
            <Suspense fallback={<div className="spinner"></div>}>
                <Characters/>
            </Suspense>
        </>
    )
}

export default App
