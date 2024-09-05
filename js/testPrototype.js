/* function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function () {
  console.log(`wouaf`);
}
Dog.prototype.toto = "toto"; */

class Dog {
    constructor(name) {
      this.name = name;
    }
    bark() {
      console.log(`wouaf`);
    }
  }
  class Caniche extends Dog {
    static breed = "Caniche"
    bark() {
      //super.bark();
      console.log(`...du caniche`);
    }
  }
  
  const filou = new Dog("filou");
  const zazie = new Dog("zazie");
  const caniche = new Caniche("crepe");
  
  filou.bark();
  zazie.bark();
  caniche.bark();
  //filou.bark est la référence à la méthode bark
  if (filou.bark == zazie.bark) {
    console.log(`même référence`);
  } else {
    console.log(`référence différente`);
  }
  