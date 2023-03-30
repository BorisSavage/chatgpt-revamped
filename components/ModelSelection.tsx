/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import fetchModels from "@/utils/fetchModels";
import Select from "react-select";
import useSWR from "swr";

export default function ModelSelection() {
    const { data: models, isLoading } = useSWR("models", fetchModels);
    const { data: model, mutate: setModel } = useSWR("model", {
        fallbackData: "text-davinci-003",
    });

    const customStyles = {
        control: (baseStyles: any, state: { isFocused: any }) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#126639" : "#280023",
            backgroundColor: "#280023",
            boxShadow: `0 0 0 ${state.isFocused ? "1px #177f4c" : "0"}`,
            "&:hover": {
                borderColor: state.isFocused ? "#177f4c" : "#126639",
            },
        }),
        option: (baseStyles: any, state: { isSelected: any }) => ({
            ...baseStyles,
            color: "#1fa15d",

            backgroundColor: state.isSelected ? "#0e2540" : "#3a0037",
            "&:hover": {
                backgroundColor: state.isSelected ? "#0e2540" : "#4c004b",
            },
            fontWeight: 500,
        }),
        menu: (baseStyles: any) => ({
            ...baseStyles,
            backgroundColor: "#3a0037",
        }),
        input: (baseStyles: any) => ({
            ...baseStyles,
            color: "#1fa15d",
            fontWeight: 700,
        }),
        singleValue: (baseStyles: any) => ({
            ...baseStyles,
            color: "#1fa15d",

            fontWeight: 700,
        }),
    };

    return (
        <div>
            <div className="text-center font-medium text-danviolet-500">
                Model change
            </div>
            <Select
                styles={customStyles}
                options={models?.modelOptions}
                defaultValue={model}
                placeholder={model}
                isSearchable
                isLoading={isLoading}
                menuPosition="fixed"
                onChange={(e) => setModel(e.value)}
            />
        </div>
    );
}
