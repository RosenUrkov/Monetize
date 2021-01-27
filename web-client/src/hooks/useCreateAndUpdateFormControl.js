import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useCreateAndUpdateFormControl = (createAction, updateAction) => {
  const dispatch = useDispatch();

  const [entityToUpdate, setEntityToUpdate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const startCreate = () => {
    setEntityToUpdate(null);
    setOpenForm(true);
    setShowForm(true);
  };

  const finishCreate = (entity) => {
    dispatch(createAction(entity));
    setOpenForm(false);
    setTimeout(() => setShowForm(false), 500);
  };

  const startUpdate = (entity) => {
    setEntityToUpdate(entity);
    setOpenForm(true);
    setShowForm(true);
  };

  const finishUpdate = (entity) => {
    dispatch(updateAction(entityToUpdate.id, entity));
    setEntityToUpdate(null);
    setOpenForm(false);
    setTimeout(() => setShowForm(false), 500);
  };

  const cancelForm = () => {
    setEntityToUpdate(null);
    setOpenForm(false);
    setTimeout(() => setShowForm(false), 500);
  };

  return {
    entityToUpdate,
    showForm,
    openForm,
    startCreate,
    startUpdate,
    finishCreate,
    finishUpdate,
    cancelForm,
  };
};

export default useCreateAndUpdateFormControl;
