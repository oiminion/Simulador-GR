var matrix = [[], [], [], [], [] ,[], [], [], [], [], [], [], [] ,[], [], [], [], [], [], [], [], [] ,[], [], [], []];
function isCapital(char)
{
  return (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <=90)
}

function insertGrammar() 
{
  var font = document.getElementById("font");
  var dest = document.getElementById("dest");
  
  var font_value = String(font.value);
  var dest_value = String(dest.value);

  if(font_value.length > 0)
  {
    var table = document.getElementById("myTable");
  
    var row = table.insertRow(-1);
      
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    if(dest_value != "")
    {
      matrix[font_value.charCodeAt(0) - 65].push(dest_value);
    }
    else
    {
      matrix[font_value.charCodeAt(0) - 65].push(null);
      dest_value = "ε";
    }
    console.log(matrix);

    cell1.innerHTML = font_value;
    cell2.innerHTML = "=>";
    cell3.innerHTML = dest_value;
  }
  else
  {
    alert("Error");
  }
}

function validate(font_value, test_string, position)
{
  if(test_string.length < position)
  {
    console.log("fim1");
    return false;
  }

  var array = matrix[font_value.charCodeAt(0) - 65]
  var result = false;
  console.log(array);
  if(test_string.length == position)
  {
    for(var i = 0; i < array.length; i++)
    {
      if(array[i] == null)
      {
        console.log("fim2");
        return true;   
      }
    }
    console.log("fim3");
    return false;
  }

  for(var i = 0; i < array.length; i++)
  {
    if(array[i] != null && array[i][0] === test_string[position])
    {
      if(array[i].length == 1)
      {
        if(test_string.length-1 == position)
        {
          console.log("fim4");
          return true;
        }
      }
      else
      {
        console.log("cont1");
        result = validate(array[i][1], test_string, position+1);
        if(result == true)
        {
          return result;
        }
      }   
    }
    else if(array[i] != null && isCapital(array[i][0]))
    {
      console.log("cont2");
      return validate(array[i][0], test_string, position);
    }
  }
  console.log("fim5");
  return false;
}

function validateString()
{
  var test = document.getElementById("test");
  
  var test_string = String(test.value);

  if(validate("S", test_string, 0))
  {
    alert("A palavra inserida é válida");
  }
  else
  {
    alert("A palavra inserida é inválida");
  }
}