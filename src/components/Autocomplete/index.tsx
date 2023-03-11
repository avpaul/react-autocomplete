import classnames from "utils/classnames";
import { CSSProperties, useEffect, useState } from "react";

import "./index.css";

/**
 * in a production environment there are multiple improvements I would like top mak eon this component as as today.
 * 1. When the component looses focus, the dropdown should close
 * 2. We might also need to implement debouncing on the input level in case we have to perform expensive filtering operations or on the network level by canceling previous network requests
 * 3. Allowing to customize the value prop type, i.e: some use cases might benefit from receiving the whole option object rather than the value key only
 * 4. optimize the component to pass web accessibility standards (since we are not use native elements)
 * 5. allow to specify which property should be used as the label once a value was selected and the original option label was a ReactNode
 * 6. Add tests
 * 7. Accept addon elements
 * 8. And more depending on the use cases
 */

export interface SelectOptionType {
  value: string;
  label: string | React.ReactNode;
  [key: string]: any;
}

export interface AutocompleteProps {
  id?: string;
  name?: string;
  label?: string;
  hasClear?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  options: SelectOptionType[];
  onSelect: (value: string) => void;
  onSearch: (searchKeyword: string) => void;
}

const Autocomplete = ({
  label,
  id,
  name,
  style,
  options,
  placeholder,
  hasClear = true,
  onSearch,
  onSelect,
}: AutocompleteProps) => {
  const [value, setValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [completions, setCompletions] = useState<SelectOptionType[]>([]);
  const dropdownVisible =
    Boolean(completions.length) && Boolean(searchText.length);

  const clearHandler = () => {
    setValue("");
    setSearchText("");
    setCompletions([]);
  };

  useEffect(() => {
    if (!Boolean(value.length)) {
      const matchedParts = options.map((option, optionIndex) => {
        const matchedParts = (option.label as string)
          .split(new RegExp(searchText.toLowerCase(), "i"))
          .map((str) => <span key={str}>{str}</span>);

        matchedParts.splice(
          1,
          0,
          <mark key={[searchText, optionIndex].join("")}>{searchText}</mark>
        );

        return {
          label: matchedParts,
          value: option.value,
          pureLabel: option.label,
        };
      });

      setCompletions(matchedParts);
    }
  }, [value, options, searchText]);

  return (
    <div className="select-wrapper">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type="text"
        name={name}
        style={style}
        value={searchText}
        placeholder={placeholder}
        className={classnames({
          "has-value": hasClear && Boolean(searchText.length),
        })}
        onChange={(event) => {
          setSearchText(event.target.value);
          onSearch(event.target.value);
          setValue("");
        }}
      />
      {hasClear && searchText && (
        <button className="clear-btn" onClick={clearHandler}>
          &#10005;
        </button>
      )}
      {dropdownVisible && (
        <div className="select-options">
          {completions.map((option) => (
            <div
              key={option.value}
              data-value={option.value}
              className={classnames("select-option", {
                "select-option-selected": value === option.value,
              })}
              onClick={() => {
                setCompletions([]);
                setValue(option.value);
                if (option.pureLabel || typeof option.label === "string") {
                  setSearchText(option.pureLabel || option.label);
                }
                if (typeof onSelect === "function") {
                  onSelect(option.value);
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
