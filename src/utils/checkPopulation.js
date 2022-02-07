

const checkPopulation = (population, index, answers) => {

  if (answers.length === 0) {
    return true;
  }
  else if (answers.length === 1) {
    if (index === 0) {
      if (population < answers[0].population) {
        return true;
      }
      else {
        return false;
      }
    }
    else {

      if (population < answers[0].population) {
        return false;
      }
      else {
        return true;
      }
    }
  }
  else {
    if (index === answers.length) {

      if (population < answers[index - 1].population) {
        return false
      } else {
        return true
      }
    }
    else {
      if (index !== 0) {
        if (population < answers[index].population && answers[index - 1].population < population) {
          return true;
        }
        else {
          return false;
        }
      }
      else{
        if(population < answers[index].population){
          return true;
        }
        else {
          return false;
        }
      }
    }
  }

}

export default checkPopulation;