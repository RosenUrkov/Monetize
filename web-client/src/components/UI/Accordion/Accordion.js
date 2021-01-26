import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    paddingLeft: 5,
  },
}));

const AccordionComponent = (props) => {
  const { title, TitleIcon, expanded, onChange, update, remove } = props;

  const classes = useStyles();

  const startUpdate = (ev) => {
    ev.stopPropagation();
    update();
  };

  const startRemove = (ev) => {
    ev.stopPropagation();
    remove();
  };

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${title}-content`}
        id={`panel-${title}-header`}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignSelf: "center" }}>
            <TitleIcon />
            <Typography className={classes.heading}>{title}</Typography>
          </div>

          <div style={{ display: "flex" }}>
            <IconButton onClick={startUpdate}>
              <EditIcon color="primary" />
            </IconButton>

            <IconButton onClick={startRemove}>
              <DeleteIcon color="secondary" />
            </IconButton>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionComponent;
