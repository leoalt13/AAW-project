import { Form, useLoaderData } from "react-router-dom";

export default function EditAnimal() {
    const animal = useLoaderData();

    return (
        <Form method="post" id="animal-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="Name"
                    aria-label="name"
                    type="text"
                    name="name"
                    defaultValue={animal.name}
                />
            </p>
            <label>
                <span>Animal Image URL</span>
                <input
                    placeholder="/images/Placeholder.png"
                    aria-label="Animal Image URL"
                    type="text"
                    name="animal-image"
                    defaultValue={animal.image}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={animal.notes}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button">Cancel</button>
            </p>
        </Form>
    );
}