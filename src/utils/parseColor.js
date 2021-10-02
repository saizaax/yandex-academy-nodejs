module.exports = (str) => {
  const rgbRegex =
    /^(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)$/
  const color = rgbRegex.exec(str)
    ? str.split(",").map((num) => Number(num))
    : [0, 0, 0]

  return color
}
