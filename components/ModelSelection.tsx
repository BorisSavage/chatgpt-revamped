"use client";

import fetchModels from "@/utils/fetchModels";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Select, { StylesConfig } from "react-select";
import useSWR from "swr";
import { useEffect, useState } from "react";

export default function ModelSelection() {
  const { data: models, isLoading, error } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo",
  });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error) setIsError(true);
  }, [error]);

  const danviolet700 = "#3a0037";
  const danviolet800 = "#280023";

  const danblue300 = "#7eb8ef";
  const danblue900 = "#0e2540";

  const dangreen600 = "#177f4c";
  const dangreen700 = "#126639";

  const customStyles: StylesConfig<any, false> = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? dangreen700 : danviolet800,
      backgroundColor: danviolet800,
      boxShadow: `0 0 0 ${state.isFocused ? `1px ${dangreen600}` : "0"}`,
      "&:hover": {
        borderColor: state.isFocused ? dangreen600 : dangreen700,
      },
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      color: danblue300,

      backgroundColor: state.isSelected ? danblue900 : danviolet800,
      "&:hover": {
        backgroundColor: state.isSelected ? danblue900 : danviolet700,
      },
      fontWeight: 500,
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: danviolet700,
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      color: danblue300,
      fontWeight: 600,
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: danblue300,

      fontWeight: 600,
    }),
  };

  const LoadingIndicator = () => {
    return (
      <div className="transition-all duration-100">
        <Cog6ToothIcon className="mr-1.5 h-7 w-7 animate-roundhouse text-danblue-300" />
      </div>
    );
  };

  return (
    <div>
      <div className="text-center font-medium text-danviolet-400/80">
        Model selection
      </div>
      <Select
        id="selectbox"
        instanceId="selectbox"
        styles={customStyles}
        options={models?.modelOptions}
        defaultValue={!isError ? model : null}
        placeholder={
          !isError ? (
            model
          ) : (
            <div className="font-medium text-red-500">
              <p>Error loading models.</p>
              <p>Please try again.</p>
            </div>
          )
        }
        isSearchable
        isLoading={isLoading}
        components={{ LoadingIndicator: LoadingIndicator }}
        menuPosition="fixed"
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}
