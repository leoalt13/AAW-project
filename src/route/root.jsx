import { Outlet , Link, useLoaderData, Form, } from "react-router-dom";

export default function Root() {
    return (
        <>
            <div id="top">
                <ul>
                    <li>
                        <Link to={'listAnimal'}>Liste des animaux</Link>
                    </li>
                    <li>Map du zoo</li>
                    <li>Connexion</li>
                    <li>Inscription</li>
                </ul>
            </div>
            <div id="outlet">
                <Outlet>

                </Outlet>
            </div>
        </>
    );
}