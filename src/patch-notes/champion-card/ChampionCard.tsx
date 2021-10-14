import React from 'react';
import {
    Card,
    CardBody,
  } from "reactstrap";

interface ChampionCardProps {
  key: string;
  champion: any;
  onChampionSelected: (selectedChampion: string) => void;
  filterValue: string;
}

const SelectedStyle: React.CSSProperties = {
  border: "10px solid #3996f3"
};

const UnselectedStyle: React.CSSProperties = {
  border: "10px solid #ffffff"
};

const HiddenStyle: React.CSSProperties = {
  display: "none"
};

const VisibleStyle: React.CSSProperties = {
  display: "block"
};

const ChampionCard: React.FC<ChampionCardProps> = ({
  key,
  champion,
  onChampionSelected,
  filterValue
}) => {

    const data = React.useMemo(() => champion, [champion]);
    const [isSelected, setIsSelected] = React.useState<boolean>(false);
    const [visibilityStyle, setVisibilityStyle] = React.useState<React.CSSProperties>(VisibleStyle);

    const onCardClick = () => {
      onChampionSelected(data.name);
      setIsSelected(!isSelected);
    };

    React.useEffect(() => {
      if (filterValue) {
        if (!data.name.toLowerCase().includes(filterValue.toLowerCase())) {
          setVisibilityStyle(HiddenStyle);
        }
      } else {
        setVisibilityStyle(VisibleStyle);
      }
     }, [filterValue]);

    return <section 
              className="section"
              style={visibilityStyle}
              >
              <Card 
                className="card-lift--hover shadow border-0"
                onClick={onCardClick}
                >
                <CardBody className="card-body" style={isSelected ? SelectedStyle : UnselectedStyle}>
                  <div className="flex">
                    <img className="icon" src={data.imageUrl}></img>
                    <div className="text-primary champ-name text-uppercase">
                      {data.name}
                    </div>
                  </div>
                  <p className="description mt-3">
                    {data.summary}
                  </p>
                  <div className="attribute-container"> 
                    {data.attributePatches.map((attribute: any) => {
                      return <div className="attribute-header">
                          <img className="icon-attribute" src={attribute.imageUrl}></img>
                          <span className="attribute-name">{attribute.name}</span>
                        <div>
                          {attribute.changes.map((change: any) => {
                            return <div className="change-container">
                                <span>{change.flag && <span className="change-tag">{`[${change.flag}]`}</span>}{change.name + ": " } </span> <span className="change-before"> {change.before}</span> ⇒ <span className="change-after"> {change.after}</span>
                              </div>
                            })}
                        </div>
                      </div>
                    })}
                  </div>
                </CardBody>
              </Card>
         
  </section>;
}

export default ChampionCard;
