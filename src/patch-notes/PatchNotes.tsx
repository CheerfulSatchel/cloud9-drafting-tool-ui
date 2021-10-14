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

    return <div className="patch-notes-container">
        <div className="header">
            <div className="flex">
                <div className="page-title">Patch Update {patchData.patchVersion}</div>
                <div className="cc-container">
                    <div className="selected-champs">
                        Selected Champions: {selectedChampions.map((champName) => <span> {champName} |</span>)}
                    </div>
                    <div className="cc-info">
                        CC: 00%
                    </div>
                </div>
            </div>
        </div>
        <h2>{selectedChampions.length}</h2>
        <div className="card-container">
            {patchData.champions.map((champion) => <ChampionCard key={champion.name} champion={champion} onChampionSelected={onChampionSelected} />)}
        </div>
    </div>;
}

export default PatchNotes;
