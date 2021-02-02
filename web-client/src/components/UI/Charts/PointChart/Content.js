const Content = (data) => (props) => {
  const { targetItem } = props;
  const dataPoint = data[targetItem.point];

  return (
    <div>
      <div>Value: {dataPoint.value}</div>
      <div>Type: {dataPoint.type}</div>
      <div>Category: {dataPoint.category}</div>
      <div>Account: {dataPoint.account}</div>
    </div>
  );
};

export default Content;
