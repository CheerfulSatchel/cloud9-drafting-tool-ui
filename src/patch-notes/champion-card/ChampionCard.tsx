import React from 'react';
import {
    Card,
    CardBody,
  } from "reactstrap";

const ChampionCard: React.FC<any> = (data: any) => {
    data = data.data;
    return <section className="section">
              <Card className="card-lift--hover shadow border-0">
                <CardBody className="card-body">
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
