import React from 'react';
import {faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Container, Col, Card, Form, Button, Alert, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';

interface KorisnikRegistrationPageState{
    formData:{
        email:string;
        password:string;
        username:string;
        ime:string;
        prezime:string;
        adresa:string;
        
    };

    message?: string;

    isRegistrationComplete:boolean;
}

export class KorisnikRegistrationPage extends React.Component{
    state: KorisnikRegistrationPageState;    
    
    constructor(props: Readonly<{}>){
        super(props);

    this.state={
        isRegistrationComplete: false,
        formData:{
            email:"",
            password:"",
            username:"",
            ime:"",
            prezime:"",
            adresa:"",
            
        }
    };
}

private formInputChange(event:React.ChangeEvent<HTMLInputElement>){
    const newFormData = Object.assign(this.state.formData,{
        [event.target.id ]: event.target.value
    });
    const newState = Object.assign(this.state,{
        formData:newFormData,
    });
        this.setState(newState);
}

render() {
    return (
        <Container>
            <Col md={ { span: 8, offset: 2 } }>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faUserPlus } /> Korisnicka Registracija
                        </Card.Title>
                        {
                            (this.state.isRegistrationComplete === false) ?
                            this.renderForm() : 
                            this.renderRegistrationCompleteMessage()
                        }
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    );
}
private renderForm() {
    return (
        <>
            <Form>
                <Row>
                    <Col md="6">
                        <Form.Group>
                            <Form.Label htmlFor="username">Username:</Form.Label>
                            <Form.Control type="username" id="username"
                                        value={ this.state.formData.username}
                                        onChange={ event => this.formInputChange(event as any) } />
                        </Form.Group>
                    </Col>

                    <Col md="6">
                        <Form.Group>
                            <Form.Label htmlFor="password">Password:</Form.Label>
                            <Form.Control type="password" id="password"
                                            value={ this.state.formData.password }
                                            onChange={ event => this.formInputChange(event as any) } />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md="6">
                        <Form.Group>
                            <Form.Label htmlFor="ime">Ime:</Form.Label>
                            <Form.Control type="text" id="ime"
                                        value={ this.state.formData.ime }
                                        onChange={ event => this.formInputChange(event as any) } />
                        </Form.Group>
                    </Col>

                    <Col md="6">
                        <Form.Group>
                            <Form.Label htmlFor="prezime">Prezime:</Form.Label>
                            <Form.Control type="text" id="prezime"
                                        value={ this.state.formData.prezime }
                                        onChange={ event => this.formInputChange(event as any) } />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group>
                    <Form.Label htmlFor="email">E-mail:</Form.Label>
                    <Form.Control type="email" id="email"
                                  value={ this.state.formData.email }
                                  onChange={ event => this.formInputChange(event as any) } />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="adresa">Adresa:</Form.Label>
                    <Form.Control id="adresa"
                                  as="textarea" rows={ 4 }
                                  value={ this.state.formData.adresa }
                                  onChange={ event => this.formInputChange(event as any) } />
                </Form.Group>

                <Form.Group>
                    <Button variant="primary"
                            onClick={ () => this.doRegister() }>
                        Register
                    </Button>
                </Form.Group>
            </Form>
            <Alert variant="danger"
                    className={ this.state.message ? '' : 'd-none' }>
                { this.state.message }
            </Alert>
        </>
    );
}

   
   
    private renderRegistrationCompleteMessage(){
        return( 
            <p>
                Nalog ce biti registrovan <br />
                <Link to = "/korisnik/login">Kliknite ovde</Link> za login
            </p>
        );
    }
    
    private doRegister() {
        const data = {
            username: this.state.formData?.username,
            password: this.state.formData?.password,
            ime: this.state.formData?.ime,
            prezime: this.state.formData?.prezime,
            email: this.state.formData?.email,
            adresa: this.state.formData?.adresa,
        };

        api('auth/user/register/', 'post', data)
        .then((res: ApiResponse) => {
           
            if (res.status === 'error') {
                console.log(res.status)
                this.setErrorMessage('System error... Try again!');
                return;
            }

            if ( res.data.statusCode !== undefined ) {
                this.handleErrors(res.data);
                return;
            }

            this.registrationComplete();
        })
    }

    private setErrorMessage(message: string) {
        const newState = Object.assign(this.state, {
            message: message,
        });

        this.setState(newState);
    }

    private handleErrors(data: any) {
        let message = '';

        switch (data.statusCode) {
            case -6001: message = 'Nalog postoji'; break;
        }

        this.setErrorMessage(message);
    }

    private registrationComplete() {
        const newState = Object.assign(this.state, {
            isRegistrationComplete: true,
        });

        this.setState(newState);
    }
}
