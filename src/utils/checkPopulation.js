

const checkPopulation = (population, index , answers) => {
    if(answers.length === 0){
      return true;
    }
    else if(answers.length === 1 ){
       if(index === 0){
         if(population<answers[0].population){
           console.log(`CORRECT`)
           return true;
         }
         else{
           console.log(`INORRECT`)
           return false;
         }
       }
       else{
         console.log(index)
         if(population < answers[0].population){
           console.log("incorrect")
           return false;
         }
         else{
           console.log("correct")
           return true;
         }
       }
    }
    else {
      if(index === answers.length){
        population < answers[index-1].population ? console.log("inkorrekt") : console.log("korrekt")
      }
      else{
        population < answers[index].population ? console.log("KORREKT") : console.log("INKORREKT")
      }
    }
    
}

export default checkPopulation;