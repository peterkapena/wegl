function getValues(numberOfSides) {
    if (!numberOfSides) throw new Error("Please specify the number of sides");
    
    const r = 0.5;
    let values = [0.0, 0.0, r, 0.0];
    
    for (let index = 1; index < numberOfSides + 1; index++) {
      values = [
        ...values,
        r * Math.cos((index * Math.PI) / 4),
        r * Math.sin((index * Math.PI) / 4),
      ];
    }
  
    return values;
  }