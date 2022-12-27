
import { Outlet , Link, useLoaderData, Form, } from "react-router-dom";
import { getAnimals, createAnimal } from "../app/animals"; // fichier animal

export async function loader() {
    const animals = await getAnimals();
    return { animals };
}

export async function action() {
    await createAnimal();
}

export default function ListAnimal() {
    const { animals } = useLoaderData();
    return (
        <>
            <div id="sidebar">
                <h1>Liste des Animaux :</h1>
                <nav>
                    {animals.length ? (
                        <ul>
                            {animals.map((animal) => (
                                <li key={animal.id}>
                                    <Link to={`animals/${animal.id}`}>
                                        {animal.name ? (
                                            <>
                                                {animal.name}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {animal.favorite && <span>★</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No Animals</i>
                        </p>
                    )}
                </nav>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search animals"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>



            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
