export const Manipulation = {
  getCharAtIndex: charIndex
};

function charIndex(index) {
  // tslint:disable-next-line:max-line-length
  const arr = new Array(
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  );

  if (index < 26) {
    return arr[index];
  }
  if (index >= 26 && index < 676) {
    const ind = Math.floor(index / 26);
    const ex = index % 26;
    return arr[ind - 1] + arr[ex];
  }
}
