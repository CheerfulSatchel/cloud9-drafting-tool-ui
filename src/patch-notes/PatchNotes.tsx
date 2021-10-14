import React from 'react';
import ChampionCard from './champion-card/ChampionCard';
import patchData from '../json/patch-11-19.json';
import { FormGroup, Input } from 'reactstrap';

const PatchNotes: React.FC<any> = () => {
    const [selectedChampions, setSelectedChampions] = React.useState<string[]>([]);
    const [searchText, setSearchText] = React.useState<string>("");

    const onChampionSelected = (selectedChampion: string) => {
        const updatedSelectedChampions = [...selectedChampions];
        if (!updatedSelectedChampions.includes(selectedChampion)) {
            updatedSelectedChampions.push(selectedChampion);
        } else {
            updatedSelectedChampions.splice(updatedSelectedChampions.indexOf(selectedChampion), 1);
        }
        setSelectedChampions(updatedSelectedChampions);
    };

    const championCards = React.useMemo(() => 
        patchData.champions.map((championDatum) => 
                <ChampionCard key={championDatum.name} champion={championDatum} onChampionSelected={onChampionSelected} filterValue={searchText} />)
    , [searchText, selectedChampions]);

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedSearchText = event.target.value;
        setSearchText(updatedSearchText);
    }
        
    return <div className="patch-notes-container">
        <div className="header">
            <div className="flex">
                <div className="page-title">
                    <img src="https://www.pinpng.com/pngs/m/10-103779_cloud-9-c9-logo-hd-png-download.png" width="100" height="auto"/>
                    <label>Patch Update {patchData.patchVersion}</label>
                </div>
                <div className="cc-container">
                    <div className="selected-champs">
                        Selected Champions: {selectedChampions.map((champName) => <span> {champName} |</span>)}
                    </div>
                    <div className="cc-info">
                        CC: 00%
                    </div>
                </div>
            </div>
            <FormGroup className="search-bar">
                <Input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="search champions"
                    onChange={onSearchChange}
                />
            </FormGroup>
        </div>
        <div className="card-container">
            {championCards}
        </div>
    </div>;
}

export default PatchNotes;
