class AngajatIT {
  constructor(CNP, nume, prenume, vechime, departament) {
    this.CNP = CNP;
    this.nume = nume;
    this.prenume = prenume;
    this.vechime = vechime;
    this.departament = departament;
  }

  afiseazaVarsta() {
    if (this.CNP.length !== 13) {
      console.log("CNP Invalid!");
      return;
    }
    let bornAt = this.CNP.substring(1, 7).match(/.{1,2}/g);
    // 1, 2 - intre 1900 si 1999 | 5,6 - intre 2000 si 2099
    let genX = this.CNP.substring(0, 1) < 3;

    switch (genX) {
      case true:
        bornAt[0] = "19" + bornAt[0];
        break;
      case false:
        bornAt[0] = "20" + bornAt[0];
        break;
      default:
        break;
    }

    const currentDate = new Date();
    let data = new Date(bornAt.join("-"));

    let age = currentDate.getFullYear() - data.getFullYear();
    if (data.getMonth() > currentDate.getMonth()) age--;

    console.log(
      `Angajatul ${this.nume} ${this.prenume} are varsta de ${age} ani.`
    );
  }

  afiseazaAnulAngajarii() {
    let regex = new RegExp(/\d+\s+(ani|luni)/g);
    let splitedTime = this.vechime.match(regex);

    let currentDate = new Date();
    splitedTime.forEach((item) => {
      let value = item.split(" ");
      if (value[1] === "ani") {
        currentDate.setFullYear(currentDate.getFullYear() - value[0]);
      } else if (value[1] === "luni") {
        if (currentDate.getMonth() < value[0]) {
          currentDate.setFullYear(currentDate.getFullYear() - 1);
        }
      }
    });

    console.log(
      `${this.nume} ${
        this.prenume
      } a fost angajat in anul ${currentDate.getFullYear()} `
    );
  }

  lucreaza() {
    console.log("Neimplementat!");
  }
}

class QA extends AngajatIT {
  constructor(CNP, nume, prenume, vechime, departament) {
    super(CNP, nume, prenume, vechime, departament);
  }

  lucreaza() {
    console.log(`${this.nume} ${this.prenume} testeaza cod.`);
  }
}

class Developer extends AngajatIT {
  constructor(CNP, nume, prenume, vechime, departament) {
    super(CNP, nume, prenume, vechime, departament);
  }

  lucreaza() {
    console.log(`${this.nume} ${this.prenume} scrie cod.`);
  }
}

const Alex = new Developer(
  "1960717111111",
  "Alex",
  "Pop",
  "4 ani si 2 luni",
  "IT"
);
Alex.lucreaza();
Alex.afiseazaVarsta();
Alex.afiseazaAnulAngajarii();

const Raul = new QA("5010510222222", "Raul", "Pop", "1 ani si 7 luni", "IT");
Raul.lucreaza();
Raul.afiseazaVarsta();
Raul.afiseazaAnulAngajarii();
