
import { Form, useLoaderData } from "react-router-dom";
import { getAnimal } from "../app/animals";
import "../style.scss"

export async function loader({ params }) {
    return await getAnimal(params.animalsId);
}

export default function Animal() {
    const animal = useLoaderData();
    /*
    const animal = {
        name: "Lion",
        image: "/images/lion.jfif",
        notes: "Big cat",
        favorite: true,
    };
    */
    return (
         animal ?
        <div id="animal">
            <div>
                <img
                    key={animal.image}
                    src={animal.image || null}
                />
            </div>

            <div>
                <h1>
                    {animal.name ? (
                        <>
                            {animal.name}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite animal={animal} />
                </h1>

                {animal.notes && <p>Some useful note about the animal : {animal.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
                :
                <div>loading</div>
    );
}

function Favorite({ animal }) {
    // yes, this is a `let` for later
    let favorite = animal.favorite;
    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}