import React from "react";
import ReactDOM from "react-dom";
import Application from "./app";

//import ListAnimal from "../route/root";  //lien des dossier pour l'app
import ListAnimal, {
    loader as listLoader,
    action as listAction,
} from "../route/listAnimal";
import Animal, {
    loader as animalLoader,
} from "../route/animal";
import ErrorPage from "../error-page";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import EditAnimal from "../route/editAnimal";
import Root from "../route/root";



const router = createBrowserRouter([
    {
        path: "/app",
        element: <Application />
    },
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />, // page d'erreur personnalisee
        children: [
            {
              path: "listAnimal" ,
              element: <ListAnimal />,
              errorElement: <ErrorPage />, // page d'erreur personnalisee
              loader: listLoader, //loader pour les datas sur les animaux
              action: listAction,
              children: [
                  {
                      path: "animals/:animalsId",
                      element: <Animal />,
                      loader: animalLoader,
                  },
                  {
                      path: "animals/:animalsId/edit",
                      element: <EditAnimal />,
                      loader: animalLoader,
                  },
              ]
            },
        ],
    },

]); // ajout de different path

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
); // chercher les outlets