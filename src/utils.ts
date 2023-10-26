function checkValue(value, requirementObject) {
  console.log({ value, requirementObject });
  //return true if ok
  if (!requirementObject) return true;
  if (value === undefined) return false;
  if (
    requirementObject.equalTo !== undefined &&
    requirementObject.equalTo != value
  )
    return false;
  if (
    requirementObject.lessThanOrEqualTo !== undefined &&
    requirementObject.lessThanOrEqualTo < value
  )
    return false;
  if (
    requirementObject.greaterThanOrEqualTo !== undefined &&
    requirementObject.greaterThanOrEqualTo > value
  )
    return false;
  if (
    requirementObject.in !== undefined &&
    !requirementObject.in.includes(Number(value))
  )
    return false;
  return true;
}
export { checkValue };

// LAV TEST
