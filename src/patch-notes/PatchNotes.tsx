import React from 'react';
import ChampionCard from './champion-card/ChampionCard';
import patchData from '../json/patch-11-19.json';

function PatchNotes() {
    return <div>
        <h1>Patch Updates 11.19</h1>
        <div className="card-container">
            {patchData.champions.map((champion)=>{
                return <ChampionCard data={champion}></ChampionCard>
            })}
        </div>
    </div>;
}

export default PatchNotes;