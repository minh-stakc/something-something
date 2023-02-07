
  const getElementById = (id, elementList) => {
    return elementList.find((element) => {
      return element.id === Number(id);
    });
  };
  
  const getIndexById = (id, elementList) => {
    return elementList.findIndex((element) => {
      return element.id === Number(id);
    });
  };
  
  const createElement = (elementType, queryArguments) => {
    if (queryArguments.hasOwnProperty('emoji') &&
        queryArguments.hasOwnProperty('name')) {
      let currentId;
      if (elementType === 'expressions') {
        expressionIdCounter += 1;
        currentId = expressionIdCounter;
      } else {
        animalIdCounter += 1;
        currentId = animalIdCounter;
      }
      return {
        'id':    currentId,
        'emoji': queryArguments.emoji,
        'name':  queryArguments.name,
      };
    } else {
      return false;
    }
  };
  
  const updateElement = (id, queryArguments, elementList) => {
    const elementIndex = getIndexById(id, elementList);
    if (elementIndex === -1) {
      throw new Error('updateElement must be called with a valid id parameter');
    }
    if (queryArguments.id) {
      queryArguments.id = Number(queryArguments.id);
    }
    Object.assign(elementList[elementIndex], queryArguments);
    return elementList[elementIndex];
  };
  
  const randomSensorData = sensor => {
    switch(sensor){
      case "heart":
        return Math.floor(Math.random() * 70 + 50);
      case "spo2":
        return Math.floor(Math.random() * 10 + 90);
      case "temp":
        return Math.floor(Math.random() * 13 + 32);
      case "hum":
        return Math.floor(Math.random() * 70 + 30);
      case "co2":
        return Math.floor(Math.random() * 4 + 1)/100 ;
    }
  }


  const createErr = (message, statusInput)=>{
    let err = new Error(message);
    err.status = statusInput;
    return err;
  }

  module.exports = {
    createElement: createElement,
    getIndexById: getIndexById,
    getElementById: getElementById,
    updateElement: updateElement,
    createErr: createErr,
    randomSensorData: randomSensorData,
  };