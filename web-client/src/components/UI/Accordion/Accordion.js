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
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    paddingLeft: 5,
  },
  outerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  headingContainer: {
    display: "flex",
    alignSelf: "center",
  },
  contentContainer: {
    display: "flex",
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
        <div className={classes.outerContainer}>
          <div className={classes.headingContainer}>
            <TitleIcon />
            <Typography className={classes.heading}>{title}</Typography>
          </div>

          <div className={classes.contentContainer}>
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

AccordionComponent.propTypes = {
  title: PropTypes.string.isRequired,
  TitleIcon: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default AccordionComponent;
