// // const pressenter = document.getElementById("textarea");
// pressenter.addEventListener("keypress", (e) => {
//     if(e.key === "Enter"){
//         var text = 
//         document.getElementById("textarea").value;
//          console.log(text);
//          let parsed_text = text.split(" "); 
//          let mystring = ""; 
//          for(let i in parsed_text){
//            mystring = parsed_text[i] + " " + mystring; }
//          // insertChild('#output', mystring);
//          displayoutput('output', mystring); 
//          console.log(mystring); 
//          return mystring; 
//     }
// }); 
   
   

function grabtext(){
    var text = 
   document.getElementById("textarea").value;
    console.log(text);
    let parsed_text = text.split(" "); 
    let mystring = ""; 
    for(let i in parsed_text){
      mystring = parsed_text[i] + " " + mystring; }
    // insertChild('#output', mystring);
    // displayoutput('output', mystring); 
    // let myy = marshallese_translatee(mystring); 
    let my = my_dictionary_phrase[text]; 
    displayoutput('output', my);
    // console.log(mystring); 
    // return mystring;
  }
  
  function marshallese_translatee(phrase){
    var text = 
   document.getElementById("textarea").value;
   let my = my_dictionary_phrase[text]; 
   displayoutput('output', my);
    // displayoutput('output', phrase); 
  }
  function insertChild(parentSelector, text) {
    const newChild = document.createElement('div');
    newChild.textContent = text;
  
    const parentElement = document.querySelector(parentSelector);
    parentElement.appendChild(newChild);
  }

  function displayoutput(textarea_box_id, output_text){
    document.getElementById(textarea_box_id).value = output_text; 
  }

  function translate_word(word){
    let marshallese_word = "";  
    if(word in my_dictionary_word){
        marshallese_word = my_dictionary_word[word]; }
    else marshallese_word = word;
    return marshallese_word;}

function translate_phrase(phrase){
    let marshallese_phrase = my_dictionary_phrase[phrase];
    // #print(marshallese_phrase)
    return marshallese_phrase;}

function form_sentence(english_sentence){
  let output_sentence = ""; 
    let word = ""; 
    let marsh_sentence = english_sentence; 
    for (const i of marsh_sentence){
        word = translate_word(i); 
        output_sentence = output_sentence + " " + word;}
    // #print(output_sentence);
    return output_sentence;}
    


    // function test_form_sentence(){
    //   var phrase = 
    //   document.getElementById("textarea").value;
    //   let another_splitted_phrase = phrase.trim().split(" "); 
    // let real_partial_phrase = ""; 
    // const i = 0;  
    // let leng = another_splitted_phrase.length;
    //   let output_sentence = ""; 
    //     let word = ""; 
    //     let marsh_sentence = another_splitted_phrase; 
    //     for (const i of marsh_sentence){
    //         word = translate_word(i); 
    //         output_sentence = output_sentence + " " + word;}
    //     displayoutput('output', output_sentence); 
    //     // #print(output_sentence);
    //     return output_sentence;}

   
  


// // function seek_known_phrase(phrase): 
//     // splitted_phrase = phrase.split()
//     def helperr(phrase, index_counter):
//         if len(phrase) <= 1:
//             return False 
//         isit_known_phrase = ""
//         for i in splitted_phrase:
//             isit_known_phrase = isit_known_phrase + i 
//             if isit_known_phrase in my_dictionary_phrase:
//                 mu = {}
//                 mu[index_counter] = isit_known_phrase
//                 return mu
//         return helperr(phrase[1:], (index_counter+1))
//     helperr(splitted_phrase, 0)

// function seek_known_phrase_real(phrase, counter){
//         if (len(phrase) <= 1){
//             return False; }
//         let isit_known_phrase = "";
//         for (const i in phrase){
//             isit_known_phrase = isit_known_phrase + i; 
//             if (isit_known_phrase in my_dictionary_phrase){
//                 return isit_known_phrase;}}
//         return seek_known_phrase_real;}
    
function marshallese_translate(){
  var phrase = 
  document.getElementById("textarea").value;
  
  if (phrase in my_dictionary_phrase){
        console.log(translate_phrase(phrase));
        let output_phrase = translate_phrase(phrase); 
        displayoutput('output', output_phrase); 
        return translate_phrase(phrase); }
    else {
    let another_splitted_phrase = phrase.trim().toLowerCase().split(" "); 
    let real_partial_phrase = ""; 
    let i = 0;  
    let leng = another_splitted_phrase.length;
    // displayoutput('output', another_splitted_phrase); 
    // return leng; 
                                    
      while (i < (leng)){
        let j = leng;
        // displayoutput('output', leng);  
        while (j >= i){
            let back_into_string = ""; 
            // displayoutput('output', leng);
            let copy_another_splitted_phrase = another_splitted_phrase.slice(i,j);  
            for (const werd of copy_another_splitted_phrase){
                back_into_string = back_into_string + werd;}
                // displayoutput('output', werd);
              // return back_into_string;  }
                // displayoutput('output', back_into_string); 
                // return back_into_string; }}}}
            if (back_into_string in my_dictionary_phrase){
              // displayoutput('output', back_into_string); 
                // return real_partial_phrase;
               
                let transl_phr_back_str = translate_phrase(back_into_string); 
                real_partial_phrase += (' ' + transl_phr_back_str);
                // displayoutput('output', "hoioi"); 
                // return real_partial_phrase; 
                let temp = another_splitted_phrase.slice(j); 
                another_splitted_phrase = temp; 
                real_partial_phrase +=  form_sentence(another_splitted_phrase);
                console.log(real_partial_phrase);
                displayoutput('output', real_partial_phrase); 
                return real_partial_phrase; 
              }
              else {
                j = j - 1; 
                // displayoutput('output', "hooiiiiioi"); 
              // return "hoi";
            }}
        
        real_partial_phrase += " " + translate_word(String(another_splitted_phrase[i]));
        i += 1; }
    console.log(real_partial_phrase);
    displayoutput('output', real_partial_phrase); 
      return real_partial_phrase;} 
            }


function show_conversation () {
  show_accepted_friends(); 
  let conversation = document.getElementById('conversation_page'); 
  if (conversation.style.display === "none"){
    conversation.style.display = "block"; 
    let x = document.getElementById('translate_boxes'); 
    
    // main.style.align = "center";
    // main.style.justifyContent ="space-around"; 
    // x.style.paddingRight="40%"; 
  }
  else{
    conversation.style.display = 'none';
    let x = document.getElementById('translate_boxes'); 
    // main.style.align = "center";
    // main.style.justifyContent ="space-around"; 
    x.style.paddingLeft="30%"; 
  
          }
}

async function show_accepted_friends(){
  let username = get_current_user(); 
  let x = await getUser(username); 
  console.log(x); 
  const tableBodyEl = document.querySelector('#friends_listtt'); 
      tableBodyEl.innerHTML = ""; 
  for (const [index, [key, value]] of Object.entries(Object.entries(x))) {
      if(index > 10){
      console.log(`${index}: ${key} = ${value}`); 
      
      // if (scores.length) {
        //update the dom with the scores
      //   for (const [index, [key, value]] of Object.entries(Object.entries(x))) {
         
          // if(index > 4){
          // console.log(`${index}: ${key} = ${value}`); 
      //   for (const [i, score] of scores.entries()) {
          if(value === 3){
          const nameTdEl = document.createElement('td'); 
          
              // const scoreTdEl = document.createElement('td'); 
              // let y = await getUser(key); 
              // scoreTdEl.textContent = y.score; 
              nameTdEl.textContent = key; 
              const rowEl = document.createElement('tr'); 
          rowEl.appendChild(nameTdEl); 
          // rowEl.appendChild(scoreTdEl); 
          tableBodyEl.appendChild(rowEl); 
}}}}

function get_current_user() {
  return localStorage.getItem('userName') ?? 'Random Friend'; 
}

async function getUser(email){
  const response = await fetch(`/api/user/${email}`); 
  if (response.status === 200){
      return response.json(); 
  }
  console.log('didnt worrrrrk'); 
  return null; 
}
