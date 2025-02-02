"use client";
import React from "react";
import Select, { Props } from "react-select";
import { FC } from "react";
import { styles } from "../ReactSelect.styles";


interface SelectSingleProps extends Props {
  name: string;
}

const SelectSingle: FC<SelectSingleProps> = ({ name, ...rest }) => {
  return (
    <Select

      classNamePrefix="sima-select"
      styles={styles}
      name={name}
      {...rest}
    />
  );
};

export default SelectSingle;
