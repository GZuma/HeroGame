const RETURN_URL = "https://superheroapi.com/api.php/";
const KEY = "100820275193305";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameChoice: '',
      message: '' };




  }

  //HANDLERS FOR EACH GAME 
  handleGameOne() {
    fetch(RETURN_URL + '/' + KEY + '/' + pickCharacter()).
    then(response => {
      if (response.status != 200) {
        throw response.statusText;
      } else {
        return response.json();
      }
    }).
    then(mydata => {
      let message = `Hero or a villian?`;
      this.setState({
        gameChoice: /*#__PURE__*/React.createElement(HeroVillain, {
          pic: mydata.image.url,
          hero: mydata.biography.alignment,
          name: mydata.name,
          gameMsg: message }) });


    }).
    catch(err => {
      console.log("Error: " + err);
    });

  }
  handleGameTwo() {
    Promise.all([
    fetch(RETURN_URL + '/' + KEY + '/' + pickCharacter()),
    fetch(RETURN_URL + '/' + KEY + '/' + pickCharacter()),
    fetch(RETURN_URL + '/' + KEY + '/' + pickCharacter()),
    fetch(RETURN_URL + '/' + KEY + '/' + pickCharacter())]).


    then(([response1, response2, response3, response4]) =>
    Promise.all([response1.json(), response2.json(), response3.json(), response4.json()])).
    then(([mydata1, mydata2, mydata3, mydata4]) => {
      let message = `What is this charcter's name:`;
      this.setState({
        gameChoice: /*#__PURE__*/React.createElement(NameCharacter, {
          pic: mydata1.image.url,
          name: mydata1.name,
          fakeName1: mydata2.name,
          fakeName2: mydata3.name,
          fakeName3: mydata4.name,
          gameMsg: message }) });


    }).
    catch(err => {
      console.log("Error: " + err);
    });
  }
  handleGameThree() {
    Promise.all([
    fetch(RETURN_URL + '/' + KEY + '/' + pickCharacter()),
    fetch(RETURN_URL + '/' + KEY + '/' + pickCharacter())]).

    then(([res1, res2]) => Promise.all([res1.json(), res2.json()])).
    then(([mydata1, mydata2]) => {
      let totalStrength1 =
      Number(mydata1.powerstats.intelligence) +
      Number(mydata1.powerstats.strength) +
      Number(mydata1.powerstats.speed) +
      Number(mydata1.powerstats.durability) +
      Number(mydata1.powerstats.power) +
      Number(mydata1.powerstats.combat);

      if (isNaN(totalStrength1)) {
        totalStrength1 = 0;
      }
      let totalStrength2 =
      Number(mydata2.powerstats.intelligence) +
      Number(mydata2.powerstats.strength) +
      Number(mydata2.powerstats.speed) +
      Number(mydata2.powerstats.durability) +
      Number(mydata2.powerstats.power) +
      Number(mydata2.powerstats.combat);

      if (isNaN(totalStrength2)) {
        totalStrength2 = 0;
      }
      let message = `Who would win!`;
      this.setState({
        gameChoice: /*#__PURE__*/React.createElement(HowStrong, {
          pic1: mydata1.image.url,
          name1: mydata1.name,
          strength1: totalStrength1,
          pic2: mydata2.image.url,
          name2: mydata2.name,
          strength2: totalStrength2,
          gameMsg: message }) });

    }).
    catch(err => {
      console.log("Error: " + err);
    });
  }

  //RENDERS GAMEBOARD
  render() {


    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", { id: "title" }, " Heros and Villains "), /*#__PURE__*/
      React.createElement("h2", { id: "title2" }, "Choose a game"), /*#__PURE__*/

      React.createElement("div", { id: "game-choice-buttons" }, /*#__PURE__*/
      React.createElement("button", {
        id: "hv-game-button",
        onClick: () => {this.handleGameOne(),
          removeAnswer(),
          enableButton('hero'),
          enableButton('villain');} }, "Hero or Villains"), /*#__PURE__*/

      React.createElement("button", {
        id: "nc-game-button",
        onClick: () => {this.handleGameTwo(),
          removeAnswer(),
          enableButton('input');} }, "Name the Character"), /*#__PURE__*/

      React.createElement("button", {
        id: "hs-game-button",
        onClick: () => {this.handleGameThree(),
          removeAnswer(),
          enableButton('hero'),
          enableButton('villain');} }, "Who's Stronger")),


      this.state.gameChoice, /*#__PURE__*/
      React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null)));



  }}

//INDIVIDUAL GAME COMPONENTS
class HeroVillain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      points: '' };


  }


  handleHero() {

    if (this.props.hero === "good") {
      this.setState({
        message: `Your right ${this.props.name} is a Hero!`,
        points: Number(this.state.points + 1) });



    } else {
      this.setState({
        message: `Better luck next time ${this.props.name} is Villain.` });




    }
  }
  handleVillain() {

    if (this.props.hero === "bad") {
      this.setState({
        message: `Your right ${this.props.name} is Villain!`,
        points: Number(this.state.points + 1) });


    } else {
      this.setState({
        message: `Better luck next time ${this.props.name} is Hero.` });



    }
  }


  render()
  {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "game-bg" }, /*#__PURE__*/
      React.createElement("div", { id: "game-msg" }, this.props.gameMsg), /*#__PURE__*/

      React.createElement("div", { id: "player-name" }, "Number of correct answers: ",
      this.state.points, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null),
      this.props.name), /*#__PURE__*/

      React.createElement("div", { id: "picture-area" }, /*#__PURE__*/
      React.createElement(Character, {
        id: "picture",
        pic: this.props.pic })), /*#__PURE__*/
      React.createElement("br", null), /*#__PURE__*/
      React.createElement("div", { id: "game-choice-buttons" }, /*#__PURE__*/
      React.createElement("button", {
        id: "hero",
        onClick: () =>
        {this.handleHero(),
          replaceAnswer(),
          disableButton('villain'),
          disableButton('hero');} }, "Hero"), /*#__PURE__*/


      React.createElement("div", { id: "divider" }), /*#__PURE__*/
      React.createElement("button", {
        id: "villain",
        onClick: () =>
        {this.handleVillain(),
          replaceAnswer(),
          disableButton('hero'),
          disableButton('villain');} }, "Villain")), /*#__PURE__*/



      React.createElement("div", { id: "msg" }, this.state.message))));



  }}


class NameCharacter extends React.Component {
  constructor(props) {
    super(props);
    let fugazi = [this.props.name,
    this.props.fakeName1,
    this.props.fakeName2,
    this.props.fakeName3];
    shuffleArray(fugazi);
    this.state = {
      guess: '',
      name: '',
      message: '',
      points: '',
      answers: fugazi };


  }
  handleChange(event) {
    this.setState({
      guess: event.target.value });

  }

  handlePresss(event) {
    let guess = this.state.guess.toLowerCase();
    let answer = this.props.name.toLowerCase();
    let wrongs = [this.props.fakeName1.toLowerCase(),
    this.props.fakeName2.toLowerCase(),
    this.props.fakeName3.toLowerCase()];

    if (event.charCode === 13) {

      if (guess === answer || wrongs.includes(guess)) {

        if (this.state.guess === '') {
          replaceAnswer();
          disableButton('input');
          return;
        } else if (guess === answer) {
          replaceAnswer();
          disableButton('input');
          this.setState({
            name: event.target.value,
            message: `${this.props.name} is correct!`,
            guess: '',
            points: Number(this.state.points + 1) });

        } else {
          replaceAnswer();
          disableButton('input');
          this.setState({
            message: `Better luck next time this character\'s name is ${this.props.name}`,
            guess: '' });

        }


      } else {
        replaceAnswer();
        this.setState({
          message: `Please pick a name from the list.`,
          guess: '' });

      }
    }


  }

  render() {


    return /*#__PURE__*/(
      React.createElement("div", { id: "game-bg" }, /*#__PURE__*/
      React.createElement("div", { id: "game-msg" }, this.props.gameMsg), /*#__PURE__*/
      React.createElement("div", { id: "player-name" }, "Number of correct answers: ",
      this.state.points, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null),
      this.state.answers[0], ",", /*#__PURE__*/React.createElement("br", null),
      this.state.answers[1], ",", /*#__PURE__*/React.createElement("br", null),
      this.state.answers[2], ", ", /*#__PURE__*/React.createElement("br", null), " or", /*#__PURE__*/React.createElement("br", null),
      this.state.answers[3], "?"), /*#__PURE__*/


      React.createElement("div", { id: "picture-area" }, /*#__PURE__*/
      React.createElement(Character, {
        id: "picture",
        pic: this.props.pic })), /*#__PURE__*/

      React.createElement("input", {
        id: "input",
        type: "text",
        value: this.state.guess,
        onChange: e => this.handleChange(e),
        onKeyPress: e => this.handlePresss(e) }), /*#__PURE__*/
      React.createElement("div", { id: "msg" }, this.state.message)));



  }}

class HowStrong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      points: '' };

  }

  handleWinner1() {

    this.setState({
      message: '' });


    if (this.props.strength1 > this.props.strength2) {
      this.setState({
        message: `CORRECT ${this.props.name1} is stronger than ${this.props.name2}!`,
        points: Number(this.state.points + 1) });



    } else {
      this.setState({
        message: `WRONG! ${this.props.name1} lost to ${this.props.name2}!` });


    }
  }
  handleWinner2() {

    this.setState({
      message: '' });

    if (this.props.strength2 > this.props.strength1) {
      this.setState({
        message: `CORRECT ${this.props.name2} is stronger than ${this.props.name1}!`,
        points: Number(this.state.points + 1) });


    } else {
      this.setState({
        message: `WRONG! ${this.props.name2} lost to ${this.props.name1}!` });


    }

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "game-bg" }, /*#__PURE__*/
      React.createElement("div", { id: "game-msg" }, this.props.gameMsg), /*#__PURE__*/

      React.createElement("div", { id: "player-name" }, "Number of correct answers: ",
      this.state.points, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null),
      this.props.name1, "\xA0\xA0 \xA0\xA0 vs. \xA0\xA0 \xA0\xA0",

      this.props.name2), /*#__PURE__*/

      React.createElement("div", { id: "picture-area" }, /*#__PURE__*/
      React.createElement(Character, {
        pic: this.props.pic1 }), /*#__PURE__*/
      React.createElement(Character, {
        pic: this.props.pic2 })), /*#__PURE__*/

      React.createElement("div", { id: "game-choice-buttons" }, /*#__PURE__*/
      React.createElement("button", {
        id: "hero",
        onClick: () =>
        {this.handleWinner1(),
          replaceAnswer(),
          disableButton('hero'),
          disableButton('villain');} }, "Win"), /*#__PURE__*/


      React.createElement("div", { id: "divider" }), /*#__PURE__*/
      React.createElement("button", {
        id: "villain",
        onClick: () =>
        {this.handleWinner2(),
          replaceAnswer(),
          disableButton('hero'),
          disableButton('villain');} }, "Win")), /*#__PURE__*/



      React.createElement("div", { id: "msg" }, this.state.message)));





  }}


class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};


  }
  render() {
    return /*#__PURE__*/(
      React.createElement("img", {
        id: "picture",
        src: this.props.pic }));


  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(Game, null),
document.getElementById('main'));


//HELPER FUNCTIONS TO HIDE MESSAGES
function disableButton(id) {
  let hideButton = document.getElementById(id);
  if (hideButton.disabled === false) {
    hideButton.disabled = true;
  }
}
function enableButton(id) {
  let hideButton = document.getElementById(id);
  if (hideButton.disabled === true) {
    hideButton.disabled = false;
  }
}
function replaceAnswer() {
  let answer = document.getElementById('msg');
  answer.style.display = 'block';
}
function removeAnswer() {
  let answer = document.getElementById('msg');
  answer.style.display = 'none';
}
function pickCharacter() {
  let missingPictures = [7, 16, 22, 51, 54, 74, 84,
  101, 113, 117, 124, 127, 131, 133, 134, 143, 147, 153, 164, 176, 178, 183, 199,
  200, 202, 205, 207, 208, 210, 220, 239, 244, 245, 277, 283, 290, 291, 292, 297,
  307, 308, 310, 326, 331, 341, 349, 352, 353, 354, 355, 357, 362, 363, 364, 365, 369,
  377, 378, 380, 381, 389, 393, 417, 418, 434, 435, 437, 440, 447, 449, 453, 465, 469,
  486, 492, 493, 501, 510, 511, 512, 533, 539, 540, 552, 553, 554, 555, 593, 603, 627,
  629, 636, 639, 647, 649, 650, 651, 662, 673, 682, 694, 698, 710, 715, 721, 725, 729];

  var charNumber = null;

  while (charNumber === null || missingPictures.includes(charNumber)) {
    charNumber = Math.floor(Math.random() * 731) + 1;
  }
  return charNumber;

}
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number  
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

/* TO DO:

  -Create a points
        -personal high score (stored in the cache)
        -overall high score (stored in a server)


 */