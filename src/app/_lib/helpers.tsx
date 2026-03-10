

export function getDate(date?: Date) {
  const output = `${date?.toLocaleDateString()}`;

  return padZero(output, ".");
}

export function getTime(date?: Date) {
  const hour = date?.getHours();
  const minutes = date?.getMinutes();
  const output = `${hour}:${minutes}`

  return padZero(output, ":");
}

function padZero(input: string, delimiter: string) {
  let output = input.split(delimiter).map(function (e) {
    if (e.length == 1)
      e = "0" + e;
    return e;
  }).join(delimiter);

  return output;
}
