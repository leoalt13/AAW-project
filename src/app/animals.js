import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

//animalTab.forEach(animal => getAnimal(animal))

export async function getAnimals(query) {
    /*
    await fakeNetwork(`getAnimals:${query}`);
    let animals = await localforage.getItem("animals");
    */

    const res = await fetch("/api/animals");
    let animals = await res.json() || [];
    if (query) {
        animals = matchSorter(animals, query, { key: "name" });
    }
    return animals.sort(sortBy("name", "createdAt"));
}

export async function createAnimal() {
    /*
    await fakeNetwork();
    */
    let id = Math.random().toString(36).substring(2, 9);
    let animal = { id, createdAt: Date.now() };
    let animals = await getAnimals();
    animals.unshift(animal);
    await set(animals);
    return animal;
}

export async function getAnimal(id) {
    //await fakeNetwork(`animal:${id}`);
    //let animals = await localforage.getItem("animals");

    const res = await fetch("/api/animals");
    let animals = await res.json() || [];
    console.log("animals", animals);
    let animal = animals.find(animal => animal.id+"" === id);
    console.log("animal", animal);
    return animal ?? null;
}

export async function updateAnimal(id, updates) {
    //await fakeNetwork();
    //let animals = await localforage.getItem("animals");

    const res = await fetch("/api/animals");
    let animals = await res.json() || [];
    let animal = animals.find(animal => animal.id === id);
    if (!animal) throw new Error("No contact found for", id);
    Object.assign(animal, updates);
    await set(animals);
    return animal;
}

export async function deleteAnimal(id) {
   // let animals = await localforage.getItem("animals");

    const res = await fetch("/api/animals");
    let animals = await res.json() || [];
    let index = animals.findIndex(animal => animal.id === id);
    if (index > -1) {
        animals.splice(index, 1);
        await set(animals);
        return true;
    }
    return false;
}

function set(animals) {
    return localforage.setItem("animals", animals);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    });
}

