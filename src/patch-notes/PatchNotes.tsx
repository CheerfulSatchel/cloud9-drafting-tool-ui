import React from 'react';
import ChampionCard from './champion-card/ChampionCard';
import patchData from '../json/patch-11-19.json';

import { FormGroup, Input, Label } from 'reactstrap';

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
    , [searchText]);

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedSearchText = event.target.value;
        setSearchText(updatedSearchText);
    }

    return <div>
        <h1>Patch Update {patchData.patchVersion}</h1>
        <FormGroup> 
            <Label>Search</Label>
            <Input
                type="search"
                name="search"
                id="search"
                placeholder="search for a champion"
                onChange={onSearchChange}
            />
        </FormGroup>
        <div className="card-container">
            {championCards}
        </div>
    </div>;
}

export default PatchNotes;
