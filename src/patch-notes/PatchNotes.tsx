import React from 'react';
import ChampionCard from './champion-card/ChampionCard';
import patchData from '../json/patch-11-19.json';
import { FormGroup, Input } from 'reactstrap';

const PatchNotes: React.FC<any> = () => {
    const [selectedChampions, setSelectedChampions] = React.useState<any[]>([]);
    const [searchText, setSearchText] = React.useState<string>("");
    const [ccPercentage, setCcPercentage] = React.useState<number>(0);

    const onChampionSelected = (selectedChampion: any) => {
        const updatedSelectedChampions = [...selectedChampions];

        if (!updatedSelectedChampions.includes(selectedChampion)) {
            updatedSelectedChampions.push(selectedChampion);
        } else {
            updatedSelectedChampions.splice(updatedSelectedChampions.indexOf(selectedChampion), 1);
        }

        let totalPercentage = 0;
        for (let i = 0; i < updatedSelectedChampions.length; i++) {
            totalPercentage += updatedSelectedChampions[i].ccPercentage;
        }
        setCcPercentage(totalPercentage);    
        setSelectedChampions(updatedSelectedChampions);
    };

    const championCards = React.useMemo(() => 
        patchData.champions.map((championDatum) => 
                <ChampionCard key={championDatum.name} currentPatchVersion={patchData.patchVersion} champion={championDatum} onChampionSelected={onChampionSelected} filterValue={searchText} />)
    , [searchText, selectedChampions]);

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedSearchText = event.target.value;
        setSearchText(updatedSearchText);
    }
        
    return <div className="patch-notes-container">
        <div className="header">
            <div className="flex">
                <div className="page-title">
                    <img className="cloud9-logo" src="https://happygamer.com/wp-content/uploads/2020/09/6073898bd522c3c2125f4e2873866acd.png" width="100" height="auto"/>
                    <label>Patch Update {patchData.patchVersion}</label>
                </div>
                <div className="cc-container">
                    <div className="selected-champs">
                        Selected Champions: {selectedChampions.map((selectedChampion) => <span> {selectedChampion.name} |</span>)}
                    </div>
                    <div className="cc-info">
                        {`CC: ${ccPercentage}%`}
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
