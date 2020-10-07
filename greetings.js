const { lang } = require("moment");

module.exports = function greet(pool) {

  var greetedNames = [];

  function setName(name) {

    if (greetedNames.some(person => person.user === name)) {
      for (let key of greetedNames) {
        // console.log(key.counter + 1);

        if (key.user === name) {
          key.counter++;
        }
      }



    } else {
      greetedNames.push({
        user: name,
        counter: 1
      })
    }
  };

  async function enterName(name) {
    const isAdded = await getCountForUser(name) > 0;
    if (isAdded) {
      await pool.query('UPDATE greetings SET count = count + 1 WHERE name = $1', [name]);
      
    }

    await pool.query('INSERT INTO greetings (name, count) values($1,$2)', [name, 1])
  };
// if  (name)

  async function existDbAndCount(name) {
    try {

      const updateQuery = await pool.query('SELECT name FROM greetings WHERE name = $1', [name]);
      return updateQuery;
    } catch (error) {
      console.log(error.name)
      console.log(error.message)
      console.log(error.stack)
    }
  
  }

  async function language(lang, name) {
    //var rowCount = table.rows.length;

    let check = await existDbAndCount(name);
    console.log(check);
    if (name !== "") {


  await overallCounter()
  
    if (check.rows === 0) {

      await enterName(name)
    }
    // await updateCount(name)
    if (lang === "Isixhosa") {
      return "Molo, " + name + " !"
    }
    else if (lang === "English") {
      return "Hello, " + name + " !"
    }
    else if (lang === "Afrikaans") {
      return "Hallo, " + name + " !"
    }
  }
  }

  async function getName() {
    let names = await pool.query('SELECT name FROM greetings')
    console.log(names);
    return names.rows;
  }

  //must used what we have in local storage(key value pairs in storage) object in storage .

  async function overallCounter() {
    let count = await pool.query('SELECT id FROM greetings');
    
      return count.rowCount;
  }

  function hasNumbers(name) {

  };
  function clear() {
    greetedNames = {};
  }


  const getCountForUser = async (name) => {
    let selectQuery = await pool.query('SELECT count FROM greetings WHERE name = $1 ', [name]);
    if (selectQuery.rows[0] && selectQuery.rows[0].count) {
      return selectQuery.rows[0].count;
    }

    //return 0;
  }

  async function resetFtn() {

    let restart = await pool.query('DELETE FROM greetings ');
    return restart;
  };


  return {
    clear,
    setName,
    getName,
    language,
    overallCounter,
    hasNumbers,
    enterName,
    existDbAndCount,
    getCountForUser,
    resetFtn,


  };

};


// function errorFlash(name) {

  //   try {
  //     if (name = "") {

  //       if (lang === "Isixhosa") {
  //         req.flash = "faka igama lakho," + name + " !"
  //       }
  //       else if (lang === "English") {
  //         req.flash = "do enter your name, " + name + " !"
  //       }
  //       else if (lang === "Afrikaans") {
  //         req.flash = "sleutel, jou naam asseblief" + name + " !"
  //       }
  //     }

  //   }
  //   catch (error) {
  //     console.log(error.name)
  //     console.log(error.message)
  //     console.log(error.stack)
  //   };

  // }

   //const EVERY_QUERY  = await pool.query ('SELECT * from greetings')
  // if (!greetedNames.includes(name)) {
  //   greetedNames.push(name)
  // }


  //  function presentName() {


//   if (!name ) {
//     await enterName(name)
//   }
// else if (lang) {

//   await language(name)
// }


//  

  // async function resetAndClear() {

  //   let allQuery = await pool.query('SELECT * FROM greeting');

  //   //instance.counter();
  //   await getCountForUser()
  //   // var a = 0;

  //   var buttonpressed = false;

  //   if (!buttonpressed && allQuery) { // Check if the localStorage object exists
  //     await resetFtn();
  //     //   window.localStorage.clear()  //clears the localstorage
  //     // instance.clear();
  //     await location.reload();

  //   }

//  };
  // resetAndClear