import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  select: {
    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent",
    },
  },
}));

const SelectComponent = (props) => {
  const { name, value, onChange, options } = props;

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={`select-${name}-label`}>{name}</InputLabel>
      <Select
        labelId={`select-${name}-label`}
        id={`select-${name}`}
        name={name}
        className={classes.select}
        value={value}
        onChange={onChange}
        fullWidth
      >
        {options.map((value) => (
          <MenuItem value={value} key={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectComponent.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectComponent;
