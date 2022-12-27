import React from "react";

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        // initialisation de l'état du composant
        // ici un tableau d'événements vide
        this.state = {
            events: [],
            name : ""
        }
    }

    // Méthode d'initialisation de notre composant
    // cette méthode est appelé par React suite au premier rendu
    componentDidMount() {
        // Appel vers notre serveur
        fetch('/api/events')
            .then((res) => res.json())
            .then((eventsReponse) => {
                // on met à jour l'état de notre composant
                // ce qui forcera son rendu, donc l'appel à la méthode render
                this.setState({events: eventsReponse})
            })
    }

    valider=(e)=>{
        // necessaire pour éviter le comportement par defaut de soumission de formulaire
        e.preventDefault(); //empeche la soumission de la page (ie reste sur la meme page )

        // On crée notre event
        let event = {name:this.state.name};
        // On le transforme en chaine de caractère afin d'etre transmissible dans la requête
        // "{\"name\":\"Nuit Sombre"\}"
        let body = JSON.stringify(event);

        // On appel ensuite notre serveur
        fetch('/api/events', {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then((res) => res.json())
            .then((eventsReponse) => {
                // Il faudra ici rappeler le service de lecture d'événements
                // afin de permettre le rafraichissement de notre liste d'événements
                this.setState({events: eventsReponse})
            })
    }

    render(){
        return(
            <div>
                <h2>Events :</h2>
                <ul>
                    {
                        this.state.events.map(event =>{
                            return (
                                <li> Id : {event.id} - Nom : {event.name}</li>
                            )
                        })
                    }
                </ul>
                <form onSubmit={this.valider}>
                    <input type={"text"} value={this.state.name} onChange={(e) => this.setState({name : e.currentTarget.value})} />
                    <button>Valider</button>
                </form>
            </div>
        )
    }
}