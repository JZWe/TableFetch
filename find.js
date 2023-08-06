// sp, dp array: [beginner, basic, difficult, expert, challenge]
const songInfo = {
  sp: [],
  dp: [],
  name: '',
};

function getSongDifficultiesByPlayMode(mode = 'sp') {
  var stepQuery = mode === 'sp' ? `#single .step` : `#double .step`;
  Array.from(document.querySelectorAll(stepQuery)).forEach((stepDom, index) => {
    if (stepDom.childNodes.length == 0) {
      songInfo[mode][index] = null;
      return;
    }

    // if has level: 'https://p.eagate.573.jp/game/ddr/ddra3/p/images/play_data/songdetails_level_2.png'
    // else        : 'https://p.eagate.573.jp/game/ddr/ddra3/p/images/play_data/songdetails_level_.png'

    // (1) get fileName, ex: songdetails_level_2.png
    const fileName = stepDom.querySelector('img').currentSrc.split('/').at(-1);

    // (2) parse level from fileName
    const levelDotPng = fileName.split('level_').at(-1);
    const results = levelDotPng.split('.');

    // (3) if first item is empty string, means there is no level
    songInfo[mode][index] = results[0] !== '' ? results[0] : null;
  });
}

function getSongName() {
  songInfo.name = document.querySelectorAll('#music_info td')[1].innerText;
}

getSongDifficultiesByPlayMode('sp');
getSongDifficultiesByPlayMode('dp');
getSongName();

console.log(songInfo);
