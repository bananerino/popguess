

const checkPopulation = (population, index, answers) => {

  if (answers.length === 0) {
    return true;
  }
  else if (answers.length === 1) {
    if (index === 0) {
      if (population < answers[0].population) {
        console.log(`CORRECT`)
        return true;
      }
      else {
        console.log(`INORRECT`)
        return false;
      }
    }
    else {

      if (population < answers[0].population) {
        console.log("incorrect")
        return false;
      }
      else {
        console.log("correct")
        return true;
      }
    }
  }
  else {
    if (index === answers.length) {

      if (population < answers[index - 1].population) {
        console.log("inkorrekt")
        return false
      } else {
        console.log("korrekt")
        return true
      }
    }
    else {
      if (index !== 0) {
        if (population < answers[index].population && answers[index - 1].population < population) {
          console.log("KORREKT")
          return true;
        }
        else {
          console.log("INKORREKT")
          return false;
        }
      }
      else{
        if(population < answers[index].population){
          console.log("KORREKT")
          return true;
        }
        else {
          console.log("INKORREKT")
          return false;
        }
      }
    }
  }

}

export default checkPopulation;