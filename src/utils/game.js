export const playAudio = (file) => {
  console.log(file);

  let audio = new Audio(
    "https://audio.dict.cc/speak.audio.php?type=wav&lang=de&text=" + file
  );
  audio.oncanplaythrough = function () {
    this.play();
  };
};
