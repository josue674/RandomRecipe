import { useState } from "react";
import "./App.css";
import { Recipe } from "./Consultas";
import { BsGithub, BsTwitter,TbLoader } from "./Icons";
import DarkMode from "./DarkMode/DarkMode";

function App() {
  const [data, setData] = useState({
    instructions: "",
    ingredients: "",
  });
  const [recipe, setRecipe] = useState("");
  const apiKey = import.meta.env.VITE_APP_OPENAI_API_KEY;
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const consulta = (e) => {
    e.preventDefault();
    setLoading(true);
    Recipe(data, apiKey).then((res) => {
      setRecipe(res);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="App">
        <div className="DivContentInformation">
          <DarkMode />
          <div className="DivContentInstru">
            <label htmlFor="instructions" className="Textos">Instructions :</label>
            <textarea
              type="text"
              placeholder="I don't want to use the oven"
              className="InputInstru"
              name="instructions"
              id="instructions"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>
          <div className="DivContentIngre">
            <label htmlFor="ingredients" className="Textos">Ingredients :</label>
            <textarea
              type="text"
              placeholder="Cucumber, Tomato, Salt and Lettuce"
              className="InputIngre"
              id="ingredients"
              name="ingredients"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>
          <button
          aria-label="Generate"
            {...(loading
              ? { disabled: true, className: "ButtonLoad" }
              : { className: "ButtonGenerate" })}
            onClick={(e) => {
              consulta(e);
            }}
          >
            {loading ? <TbLoader className="Load" /> : "Generate"}
          </button>
          <div className="DivContentCon">
            {/* <div className="DivContentDescri"> */}
            {/* <label className="LabelTitle">Recipe AI</label>
              <label className="LabelDescrip">
                It is an open source random recipe generator that uses AI
              </label> */}
            {/* </div> */}
            <div className="DivContentBut">
              <button
              aria-label="Github"
                className="BTNGit"
                onClick={() => {
                  window.open(
                    "https://github.com/josue674/RandomRecipe.git",
                    "_blank"
                  );
                }}
              >
                <BsGithub className="Github" />
              </button>
              <button
              aria-label="Twitter"
                className="BTNTwi"
                onClick={() => {
                  window.open("https://twitter.com/Feedbacks_dev", "_blank");
                }}
              >
                <BsTwitter className="Twitter" />
              </button>
            </div>
          </div>
        </div>
        <div className="DivContentRecipe">
          <label htmlFor="recipe" className="Textos">Recipe</label>
          <textarea type="text" name="recipe" id="recipe" className="TextRecipe" readOnly value={recipe} />
        </div>
      </div>
    </>
  );
}

export default App;
