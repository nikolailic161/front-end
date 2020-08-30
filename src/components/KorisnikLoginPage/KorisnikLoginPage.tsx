import  React  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Card, Form, FormGroup, Button, Col ,Alert} from "react-bootstrap";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import api,{ApiResponse,saveToken,saveRefreshToken} from '../../api/api';
import { Redirect } from "react-router-dom";

interface KorisnikLoginPageState{
    username:string;
    password:string;
    errorMasage:string;
    isLoggedIn:boolean;
}


export default class KorisnikLoginPage extends React.Component{
   state: KorisnikLoginPageState;
   constructor(props: Readonly<{}>){
       super(props);

       this.state={
           username: '',
           password: '',
           errorMasage:'',
           isLoggedIn:false,
       }
   }
   private formInputChange(event:React.ChangeEvent<HTMLInputElement>){
        const newState = Object.assign(this.state,{
           [event.target.id ]: event.target.value
        });
            this.setState(newState);
   }
   private setLogginState(isLoggedIn: boolean) {
    const newState = Object.assign(this.state, {
        isLoggedIn: isLoggedIn,
    });

    this.setState(newState);
}

    private setErrorMessage(message: string) {
    const newState = Object.assign(this.state, {
        errorMessage: message,
    });

    this.setState(newState);
}


   private doLogin(){
       api('/auth/korisnik/login', 'post',{
           username: this.state.username,
           password: this.state.password,    
       })
       .then((res: ApiResponse) => {
            if (res.status === 'error') {
                this.setErrorMessage('System error... Try again!');

                return;
            }
            if(res.status==='ok'){
                if(res.data.statusCode !== undefined) {
                    let message= '';
                    switch (res.data.statusCode){
                        case -3001: message = 'Nepostojeci username'; break;
                        case -3002: message = 'Pogresan username'; break;
                    }
                    this.setErrorMessage(message);
                    return;
                }
                
                saveToken('korisnik', res.data.token);
                saveRefreshToken('korisnik', res.data.refreshToken);

                this.setLogginState(true);

            }
       });
   }


    render(){
        if (this.state.isLoggedIn === true) {
            return (
                <Redirect to="/" />
            );
        }

        return(
        <Container>
            <Col md={ { span : 6, offset: 3 } }>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon = {faSignInAlt} /> Korsinicki Login
                    </Card.Title>
               
                        <Form>
                            <FormGroup>
                                <Form.Label htmlFor="username">Username:</Form.Label>
                                <Form.Control type="username" id="username"
                                                value={this.state.username}
                                                onChange={event => this.formInputChange(event as any)} />        

                            </FormGroup>
                            <FormGroup>
                                <Form.Label htmlFor="password">Password:</Form.Label>
                                <Form.Control type="password" id="password" 
                                                value={this.state.password}
                                                onChange={event => this.formInputChange(event as any)} />   
                                                                             
                            </FormGroup>
                            <FormGroup>
                                <Button variant="primary"
                                onClick={ () => this.doLogin() }> 
                                Prijava
                                </Button>
                            </FormGroup>
                        </Form>
                    <Alert variant="danger" 
                    className={this.state.errorMasage ? '' : 'd-none'}/>
                        {this.state.errorMasage} 
                </Card.Body>
            </Card>
                   
            </Col>
            </Container>
        );     
            
    }
}