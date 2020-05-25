let tweetArea = document.getElementById("tweetArea");
let MAX_LETTER = 140;
let num = 0;
let tweetList = [];

function countLetter() {
  let lengthOfSentence = tweetArea.value.length;
  let remain = MAX_LETTER - lengthOfSentence;
  if (remain < 0) {
    document.getElementById(
      "remain"
    ).innerHTML = `Remaining charaters: ${remain}`.fontcolor("red");
    document.getElementById("myBtn").disabled = true;
  } else {
    document.getElementById(
      "remain"
    ).innerHTML = `Remaining charaters: ${remain}`.fontcolor("black");
  }
}
tweetArea.addEventListener("input", countLetter);

let post = () => {
  //   if ((tweetArea.value !== '')) {
  //     alert("PLEASE INPUT SOMETHING TO TWEET!!!");
  //   }
  let tweet = {
    id: num,
    contents: document.getElementById("tweetArea").value,
    isRetweet: false,
    parents: null,
    isLike: false
  };

  tweetList.unshift(tweet);
  num++;
  render(tweetList);
  document.getElementById("tweetArea").value = "";
  remain.innerHTML = `Remaining characters: 140`;

};

// if (item.isRetweet == false) {
// }
// if (item.isRetweet == true) {
//   tweetList.filter((tweet) => tweet.parents != item.id);
// }

const reTweet = (id) => {
  const original = tweetList.find((item) => item.id == id);
  const retweetObj = {
    id: num,
    contents: original.contents,
    isRetweet: true,
    parents: original.id,
  };
  original.isRetweet = true;
  tweetList.unshift(retweetObj);
  num++;
  render(tweetList);

};

const deleteTweet = (idDelete) => {

  tweetList = tweetList.filter((item) => item.id !== idDelete && item.parents !== idDelete);
  render(tweetList);
  console.log("after deleting: ", tweetList);
};
//click user name and shows all posts from that user
const render = (list) => {
  let html = list
    .map(
      (item, index) => {

        if (item.isLike) {
          return `<div class="tweet-area">
          <picture>
                                <source srcset="thuongbieb.png" type="image/svg+xml">
                                <img style="width: 50px;" src="thuongbieb.png" class="img-fluid img-thumbnail"
                                    alt="...">
                            </picture>
          ${hastag(item.contents)}<br>

          <button style="color: orange; margin-left: 50px" type="button " class="btn btn-light " onclick="likeTweet(${index}) "><i  class="fa fa-thumbs-up "></i></button> 
           <button style="color: grey;" type="button " class="btn btn-light " onclick="reTweet(${item.id}) "><i  class="fa fa-share-square "></i></button>
          <button style="color: grey;" type="button " class="btn btn-light " onclick='deleteTweet(${item.id})' ><i  class="fa fa-trash "></i></button>
          </div>`
        } else {

          return `<div class="tweet-area">
          <picture>
                                <source srcset="thuongbieb.png" type="image/svg+xml">
                                <img style="width: 50px;" src="thuongbieb.png" class="img-fluid img-thumbnail"
                                    alt="...">
                            </picture>
          
         ${hastag(item.contents)} <br>
          <button style="color: grey; margin-left: 50px" type="button  " class="btn btn-light " onclick="likeTweet(${index}) "><i  class="fa fa-thumbs-up "></i></button>
           <button style="color: grey;" type="button " class="btn btn-light " onclick="reTweet(${item.id}) "><i  class="fa fa-share-square "></i></button>
          <button style="color: grey;" type="button " class="btn btn-light " onclick='deleteTweet(${item.id})' ><i  class="fa fa-trash "></i></button>
          </div>`
        }

      }).join("");
  document.getElementById("tweetListArea").innerHTML = html;
};




//like and unlike
let likeTweet = (index) => {
  console.log("index nao", index)
  //change the isLike value

  tweetList[index].isLike = !tweetList[index].isLike
  console.log("afterchange", tweetList)
  render(tweetList);

}

// Hastag 
// tweetList 
//all sentence with # => <a>
// 

function hastag(message) {
  console.log("check")
  return message.split(" ").map((elm, index) => {

    if (elm.startsWith("#")) {
      // hashTag.push(elm)
      return `<a href="#">${elm} </a>`

    } else if (elm.startsWith("@")) {
      //peopleTag.push(elm)
      return `<a href="#">${elm} </a>`
    } else {
      return elm;
    }

  }).join("");
}