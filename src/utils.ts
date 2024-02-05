function checkValue(value, requirementObject) {
  if (!requirementObject) return true;
  if (requirementObject.notAnswered) {
    if (value !== undefined) return false;
  } else if (value === undefined) return false;
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
