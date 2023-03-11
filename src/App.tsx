import { useState } from "react";
import PlaceholderBlock from "./components/PlaceholderBlock";
import Autocomplete, { SelectOptionType } from "components/Autocomplete";

import "./App.css";

function App() {
  const [options, setOptions] = useState<SelectOptionType[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  const autocompleteHandler = async (keyWord: string) => {
    const options = {
      method: "GET",
    };

    fetch(
      "https://raw.githubusercontent.com/Stupidism/goat-sneakers/master/api.json",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response?.sneakers?.length) {
          const matches: SelectOptionType[] = [];
          for (let i = 0; i < response.sneakers.length; i++) {
            const sneaker = response.sneakers[i];
            if (new RegExp(keyWord, "i").test(sneaker.name as string)) {
              matches.push({
                value: sneaker.id.toString(),
                label: sneaker.name as string,
              });
            }
          }
          setOptions(matches);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <img src="/logo.png" alt="logo" />
          <span>SC.</span>
        </div>

        <Autocomplete
          options={options}
          style={{ width: 328 }}
          placeholder="Nike, Puma, Common Projects, ..."
          onSelect={(value) => {
            setSelectedValue(value);
          }}
          onSearch={autocompleteHandler}
        />

        <PlaceholderBlock size={32} shape="circle" />
      </header>

      <section style={{ padding: 32 }}>
        <h3>Content goes here</h3>
        {selectedValue && (
          <p>
            <span>Selection:</span>&nbsp;
            <span>{selectedValue}</span>
          </p>
        )}
      </section>
    </div>
  );
}

export default App;
