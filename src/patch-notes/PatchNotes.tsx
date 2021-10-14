import React from 'react';
import ChampionCard from './champion-card/ChampionCard';
import patchData from '../json/patch-11-19.json';

const PatchNotes: React.FC<any> = () => {
    return <div>
        <h1>Patch Update {patchData.patchVersion}</h1>
        <div className="card-container">
            {patchData.champions.map((champion) => <ChampionCard data={champion} />)}
        </div>
    </div>;
}

export default PatchNotes;
