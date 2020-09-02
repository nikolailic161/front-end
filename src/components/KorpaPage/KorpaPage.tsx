import  React  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Card } from "react-bootstrap";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default class KorpaPage extends React.Component{
    render(){
        return(
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon = {faPhone} /> Kontakt detalji
                    </Card.Title>
                    <Card.Text>
                        Kontakt detalji ce ovde biti prikazani
                    </Card.Text>
                </Card.Body>
            </Card>
                   

            </Container>
        );     
            
    }
}