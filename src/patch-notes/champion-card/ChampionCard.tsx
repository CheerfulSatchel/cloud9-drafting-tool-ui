import React from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardImg,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
  } from "reactstrap";

function ChampionCard(data: any) {
    data = data.data;
    return <section className="section">
              <Card className="card-lift--hover shadow border-0">
                <CardBody className="py-5">
                  <div className="flex">
                    <img className="icon" src={data.imageUrl}></img>
                    <div className="text-primary champ-name text-uppercase">
                      {data.name}
                    </div>
                  </div>
                  <p className="description mt-3">
                    {data.patchSummary}
                  </p>
                  <div className="attribute-container"> 
                    {data.attributePatches.map((attribute: any) => {
                      return <div className="attribute-header">
                          <img className="icon-attribute" src={attribute.icon}></img>
                          <span className="attribute-name">{attribute.name}</span>
                        <div>
                          {attribute.changes.map((change: any) => {
                            return <div className="change-container">
                                <span>{change.name + ": " + change.before + " ⇒ " + change.after}</span>
                              </div>
                            })}
                        </div>
                      </div>
                    })}
                  </div>
                  <Button
                    className="mt-4"
                    color="primary"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    button
                  </Button>
                </CardBody>
              </Card>
         
  </section>;
}

export default ChampionCard;