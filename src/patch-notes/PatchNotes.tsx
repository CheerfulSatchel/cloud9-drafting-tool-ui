import React from 'react';
import ChampionCard from './champion-card/ChampionCard';
import patchData from '../json/patch-11-19.json';

const PatchNotes: React.FC<any> = () => {
    const [selectedChampions, setSelectedChampions] = React.useState<string[]>([]);

    const onChampionSelected = (selectedChampion: string) => {
        const updatedSelectedChampions = [...selectedChampions];
        if (!updatedSelectedChampions.includes(selectedChampion)) {
            updatedSelectedChampions.push(selectedChampion);
        } else {
            updatedSelectedChampions.splice(updatedSelectedChampions.indexOf(selectedChampion), 1);
        }
        setSelectedChampions(updatedSelectedChampions);
    };

    return <div>
        <h1>Patch Update {patchData.patchVersion}</h1>
        <h2>{selectedChampions.length}</h2>
        <div className="card-container">
            {patchData.champions.map((champion) => <ChampionCard key={champion.name} champion={champion} onChampionSelected={onChampionSelected} />)}
        </div>
    </div>;
}

export default PatchNotes;
